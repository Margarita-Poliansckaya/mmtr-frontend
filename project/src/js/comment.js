let content = document.querySelector('#content_quotes');

export default function Comment(id, value, date) {
    this.id = id,
    this.value = value,
    this.date = date;
}

//Создание комментария
Comment.prototype.create = function () {
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
    text.id = this.id;
    comment.appendChild(text);
}



Comment.prototype.setValue = function (newValue) {
    let str = newValue.replace(/^\s+|\s+$/g, '')
    if (str) {
        this.value = newValue
    }
}

Comment.prototype.getDate = function () {
    return this.date;
}