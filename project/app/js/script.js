document.addEventListener('DOMContentLoaded', function(){

    let elements = { 
    addComment : document.querySelector('.contact-form__btn'),
    content : document.querySelector('#content_quotes'),
    input : document.querySelectorAll('.contact-form-input'),
    windowOpen : document.querySelector('.window')
    }
    
    //При запуске страницы комментарии сохраняются из localStorage
    if (localStorage.length != 0){
        for (let i=0; i<localStorage.length; i++){
            let key = localStorage.key(i),
            item = JSON.parse(localStorage.getItem(key));
            createComment(key, item.value);
        }
    }
    
    //Проверка полей на заполненность
    function checkData(){
        let result = true;
        elements.input.forEach(function(elem,i){
            if (elem.value === ''|| !elem.value) {
                result = false;
                document.getElementById(`error_${i+1}`).textContent = '*Заполните поле!'; 
            }
        })
        return result
    }

    //Создание комментария
    function createComment(id,val){
        let
            block = document.createElement('div'),
            text = document.createElement('p'),
            comment = document.createElement('span'),
            del = document.createElement('button');
            del.textContent = 'X';
            del.className = 'quotes__del';
            block.className = 'quotes';
            elements.content.appendChild(block);
            comment.className = "quotes-mark";
            block.appendChild(comment);
            block.appendChild(del);
            text.className = 'quotes-mark__text font__subheader';
            text.textContent = val;
            text.id = id;
            comment.appendChild(text);
    }

    //Запись комментария по кнопке
    elements.addComment.addEventListener('click', ()=>{
        let error = document.querySelectorAll('.contact-form__error');
        error.forEach((e)=>{
                    e.textContent = '';
                })
        let res = checkData();
        
        if (res){
            let 
            d = new Date(),
            val = document.getElementById("Full_name").value,
            id = `f${(~~(Math.random()*1e8)).toString(16)}`;
            let arr = {value : val, date : d};
            createComment(id,val);
            localStorage.setItem(id, JSON.stringify(arr));
            elements.input.forEach(elem=>elem.value = '');
        }
    })


    //Функция замены тегов (Вынесла, т.к. она мне понадобилась дважды)
    function tagReverse(elem,nameClass,tag){
        //Создаю новый элемент и в него передаю все характеристики старого элемента
        //Замена используетя для превращения блока в текстовое поле и наоборот
        let
        newElem = document.createElement(tag);
        newElem.className = nameClass;
        newElem.id = elem.id;
        if(nameClass === 'edit-comment'){
            newElem.textContent = elem.textContent;
        }
        //Здесь сделано так, потому что из textarea сам текст берется как value
        else{
            newElem.textContent = elem.value;
        }
        elem.replaceWith(newElem);

    }

    //Клик мимо поля редактирования
    document.body.addEventListener('click',(e)=>{
        //Обрабатываем щелчок по элементу с любым классом кроме элементов с указанным(для textarea)
        if (e.target.className != 'edit-comment'){
            let editClose = document.querySelectorAll('.edit-comment');
            editClose.forEach((elem) =>{
                tagReverse(elem, 'quotes-mark__text font__subheader', 'p')
                let 
                item = JSON.parse(localStorage.getItem(elem.id)),
                arr = {value : elem.value, date : item.date};
                localStorage.setItem(elem.id, JSON.stringify(arr));
            })
    }
    }, true)

    // let comment = document.querySelectorAll('.quotes');
    elements.content.addEventListener('click', (elem)=>{
        let e = elem.target;
        if (e.className === 'quotes__del') {
            //Узнаю общего родителя данных кнопки и комментария, для того чтобы определить Id комментария
            let comment = e.parentNode;
            let delFromLocal = e.previousSibling.firstChild;
            //Удаляю из localStorage комментарий по Id комментария
            localStorage.removeItem(delFromLocal.id);
            //Удаляю его со страницы
            comment.remove();
        }
        if (e.className === 'quotes-mark__text font__subheader'){
            tagReverse(e, 'edit-comment', 'textarea')
            //Остановить распространение события дальше 
            //в иерархии предков
            event.stopPropagation();
            elements.windowOpen.style.display = 'none';
        }
    })

    elements.content.addEventListener('mouseover', (elem)=>{
        let e = elem.target;
        if (e.className === 'quotes-mark__text font__subheader'){
            elements.windowOpen.style.display = 'flex';
            //Парсим значения из JSON по ключу, который равен Id элемента
            let item = JSON.parse(localStorage.getItem(e.id));
            moment.lang('ru');
            //Беру координаты элемента
            let coords = e.getBoundingClientRect();
            //Рассчитываю координаты всплывающего таким образом, чтобы оно находилось правее и ниже комментария
            elements.windowOpen.style.left = coords.left + coords.width + 'px';
            elements.windowOpen.style.top = coords.top + coords.height + 'px';
            //В окно передаю контент, который отображает, сколько времени прошло с момента создания комментария
            elements.windowOpen.textContent = moment(item.date).fromNow();
        }
    })

    elements.content.addEventListener('mouseout', (elem)=>{
        let e = elem.target;
        if (e.className === 'quotes-mark__text font__subheader'){
            elements.windowOpen.style.display = 'none';
        }
    })
})