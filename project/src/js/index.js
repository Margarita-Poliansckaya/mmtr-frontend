import Comment from './comment.js'
import '../scss/style.scss'

document.addEventListener('DOMContentLoaded', function () {
    let elements = {
        addComment: document.querySelector('.contact-form__btn'),
        content: document.querySelector('#content_quotes'),
        input: document.querySelectorAll('.contact-form-input'),
        windowOpen: document.querySelector('.window')
    };

    let listComments = [];

    //При запуске страницы комментарии сохраняются из localStorage
    if (localStorage.key('comments')) {
        let items = JSON.parse(localStorage.getItem('comments'));
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let comment = new Comment(item.id, item.value, item.date);
            comment.create();
            listComments.push(comment);
        }
    }

    //Проверка полей на заполненность
    function checkData() {
        let result = true;
        elements.input.forEach(function (elem, i) {
            let str = elem.value.replace(/^\s+|\s+$/g, '')
            if (!str) {
                result = false;
                document.getElementById(`error_${i + 1}`).textContent = '*Заполните поле!';
            }
        })
        return result
    }

    //Запись комментария по кнопке
    elements.addComment.addEventListener('click', () => {
        let error = document.querySelectorAll('.contact-form__error');
        error.forEach((e) => {
            e.textContent = '';
        })

        let res = checkData();

        if (res) {
            let
                val = document.getElementById("Full_name").value,
                id = `f${(~~(Math.random() * 1e8)).toString(16)}`,
                comment = new Comment(id, val, new Date());
            listComments.push(comment);
            comment.create();
            localStorage.setItem('comments', JSON.stringify(listComments));
            elements.input.forEach(elem => elem.value = '');
        }
    })

    //Функция замены тегов (Вынесла, т.к. она мне понадобилась дважды)
    function tagReverse(elem, nameClass, tag) {
        //Создаю новый элемент и в него передаю все характеристики старого элемента
        //Замена используетя для превращения блока в текстовое поле и наоборот
        let newElem = document.createElement(tag);
        newElem.className = nameClass;
        newElem.id = elem.id;
        if (nameClass === 'edit-comment') {
            newElem.textContent = elem.textContent;
        }
        //Здесь сделано так, потому что из textarea сам текст берется как value
        else {
            newElem.textContent = elem.value;
        }
        elem.replaceWith(newElem);

    }

    //Клик мимо поля редактирования
    document.body.addEventListener('click', (e) => {
        //Обрабатываем щелчок по элементу с любым классом кроме элементов с указанным(для textarea)
        if (e.target.className != 'edit-comment') {
            let editClose = document.querySelectorAll('.edit-comment');
            editClose.forEach((elem) => {
                let item = JSON.parse(localStorage.getItem(elem.id));
                let comment = new Comment(item.value, item.date);
                comment.setValue(elem.value)
                elem.value = comment.value;
                tagReverse(elem, 'quotes-mark__text font__subheader', 'p');
                localStorage.setItem(elem.id, JSON.stringify(comment));
            })
        }
    }, true)

    // let comment = document.querySelectorAll('.quotes');
    elements.content.addEventListener('click', (elem) => {
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
        if (e.className === 'quotes-mark__text font__subheader') {
            tagReverse(e, 'edit-comment', 'textarea')
            //Остановить распространение события дальше 
            //в иерархии предков
            event.stopPropagation();
            elements.windowOpen.style.display = 'none';
        }
    })

    elements.content.addEventListener('mouseover', (elem) => {
        let e = elem.target;
        if (e.className === 'quotes-mark__text font__subheader') {
            elements.windowOpen.style.display = 'flex';
            let obj = listComments.find(function(elem) {
                return elem.id === e.id;
            });
            moment.lang('ru');
            //Беру координаты элемента
            let coords = e.getBoundingClientRect();
            //Рассчитываю координаты всплывающего таким образом, чтобы оно находилось правее и ниже комментария
            elements.windowOpen.style.left = coords.left + coords.width + 'px';
            elements.windowOpen.style.top = coords.top + coords.height + 'px';
            //В окно передаю контент, который отображает, сколько времени прошло с момента создания комментария
            elements.windowOpen.textContent = moment(obj.getDate()).fromNow();
        }
    })

    elements.content.addEventListener('mouseout', (elem) => {
        let e = elem.target;
        if (e.className === 'quotes-mark__text font__subheader') {
            elements.windowOpen.style.display = 'none';
        }
    })
})