// alert('hi')
var 
addComment = document.querySelector('.contact-form__btn'),
content = document.querySelector('#content_quotes'),
input = document.querySelectorAll('.contact-form-input'),

//Проверка полей на заполненность
checkData = function(){
    var 
    result = true;
    input.forEach(function(elem,i){
        if (elem.value === ''|| !elem.value) {
            result = false;
            document.getElementById(`error_${i+1}`).textContent = '*Заполните поле!'; 
        }
    })
    return result
}

function assignEvents(elem){
    let windowOpen = document.createElement('div');
    elem.addEventListener('click',()=>{
        tagReverse(elem, 'edit-comment', 'textarea')
        //Остановить распространение события дальше 
        //в иерархии предков
        event.stopPropagation();
        windowOpen.remove();
    })
    
    //Появление всплывающего окна при наведении
    elem.addEventListener('mouseover', ()=>{
        //Парсим значения из JSON по ключу, который равен Id элемента
        var item = JSON.parse(localStorage.getItem(elem.id));
        moment.lang('ru');
        windowOpen.className = 'window';
        //Беру координаты элемента
        var coords = elem.getBoundingClientRect();
        //Рассчитываю координаты всплывающего таким образом, чтобы оно находилось правее и ниже комментария
        windowOpen.style.left = coords.left + coords.width + 'px';
        windowOpen.style.top = coords.top + coords.height + 'px';
        content.appendChild(windowOpen);
        //В окно передаю контент, который отображает, сколько времени прошло с момента создания комментария
        windowOpen.textContent = moment(item.date).fromNow();
    })
    //Убрать окно при смещении мышки с комментария
    elem.addEventListener('mouseout', ()=>{
        windowOpen.remove();
    })
}

//Создание комментария
function createComment(id,val){
    var
        block = document.createElement('div'),
        text = document.createElement('p'),
        comment = document.createElement('span'),
        del = document.createElement('button');
        del.textContent = 'X';
        del.className = 'quotes__del';
        block.className = 'quotes';
        content.appendChild(block);
        comment.className = "quotes-mark";
        block.appendChild(comment);
        block.appendChild(del);
        text.className = 'quotes-mark__text font__subheader';
        text.textContent = val;
        text.id = id;
        comment.appendChild(text);

        //Удаление комментария (добавила от себя, потому что надоедало их постоянно чистить)
        del.addEventListener('click', ()=>
        {
            //Узнаю общего родителя данных кнопки и комментария, для того чтобы определить Id комментария
            var comment = del.parentNode;
            var delFromLocal = del.previousSibling.firstChild;
            //Удаляю из localStorage комментарий по Id комментария
            localStorage.removeItem(delFromLocal.id);
            //Удаляю его со страницы
            comment.remove();
        })

        assignEvents(text);
        
}

//Запись комментария по кнопке
addComment.addEventListener('click', ()=>{
    var error = document.querySelectorAll('.contact-form__error');
    error.forEach((e)=>{
                e.textContent = '';
            })
    var res = checkData();
    
    if (res){
        var 
        d = new Date(),
        val = document.getElementById("Full_name").value,
        id = `f${(~~(Math.random()*1e8)).toString(16)}`;
        var arr = {value : val, date : d};
        createComment(id,val);
        localStorage.setItem(id, JSON.stringify(arr));

        input.forEach(elem=>elem.value = '');
        
    }

}
)

//Перезагрузка с сохранением данных на странице
function load(){
    if (localStorage){
        for (var i=0; i<localStorage.length; i++){
            var key = localStorage.key(i),
            item = JSON.parse(localStorage.getItem(key));
            createComment(key, item.value);
        }
    }
}
load();

//Функция замены тегов (Вынесла, т.к. она мне понадобилась дважды)
function tagReverse(elem,nameClass,tag){
    //Создаю новый элемент и в него передаю все характеристики старого элемента
    //Замена используетя для превращения блока в текстовое поле и наоборот
    var
    newElem = document.createElement(tag);
    newElem.className = nameClass;
    newElem.id = elem.id;
    if(nameClass === 'edit-comment'){
        newElem.textContent = elem.textContent;
    }
    //Здесь сделано так, потому что из textarea сам текст берется как value
    else{
        newElem.textContent = elem.value;
        assignEvents(newElem);
    }
    elem.replaceWith(newElem);

}

//Клик мимо поля редактирования
document.body.addEventListener('click',function(e){
    //Обрабатываем щелчок по элементу с любым классом кроме элементов с указанным(для textarea)
    if (e.target.className != 'edit-comment'){
        var editClose = document.querySelectorAll('.edit-comment');
        editClose.forEach((elem) =>{
            tagReverse(elem, 'quotes-mark__text font__subheader', 'p')
            var 
            item = JSON.parse(localStorage.getItem(elem.id)),
            arr = {value : elem.value, date : item.date};
            localStorage.setItem(elem.id, JSON.stringify(arr));
        })
}
}, true)

