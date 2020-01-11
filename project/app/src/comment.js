let content = document.querySelector('#content_quotes');

export default function Comment(value, date) {
    this.value = value,
    this.date = date;
}

//Создание комментария
Comment.prototype.create = function (id) {
    let
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
    text.textContent = this.value;
    text.id = id;
    comment.appendChild(text);
}

Comment.prototype.setValue = function (newValue) {
    let str = newValue.replace(/^\s+|\s+$/g, '')
    if (str) {
        this.value = newValue
    }
}

// export {Comment, create, setValue}