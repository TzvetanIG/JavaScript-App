var app = app || {};

app.controller = (function(){
    function Controller(data, views) {
        this._data = data;
        this._views = views;
    }

    Controller.prototype.loadBooks = function () {
        this._data.books.readAllRows()
            .then(this._views.showBooks)
            .then() //todo
            .done();
    };

    Controller.prototype.loadEditForm = function (ev) {
        var _this = this;
        var objectId = $(ev.target).parent().attr('id');
        this._data.books.readAllRowsWhere('objectId', objectId)
            .then(this._views.showEditForm)
            .then() //todo
            .done();
    };

    Controller.prototype.loadAddForm = function (ev) {
        this._views.showAddForm();
    };

    function getUserBook() {
        var book = {
            title: $('#title').val(),
            author: $('#author').val(),
            isbn: $('#isbn').val()
        };

        return book;
    }

    function editBook(ev){
        var _this = this;
        var book = getUserBook();
        var id = $(ev.target).attr('data-objectId');
        _this._data.books.editRow(id, book)
            .then(function () {
                _this.loadBooks();
            })
            .then() //todo
            .done();
    }

    function addBook(){
        var _this = this;
        var book = getUserBook();
        _this._data.books.addRow(book)
            .then(function () {
                _this.loadBooks();
            })
            .then() //todo
            .done();
    }

    function deleteBook(ev){
        var _this = this;
        var objectId = $(ev.target).parent().attr('id');
        this._data.books.deleteRow(objectId)
            .then(function () {
                _this.loadBooks();
            })
            .then() //todo
            .done();
    }

    Controller.prototype.attachEvents = function () {
        var _this = this;
        $('#books').on('click', '.editButton', function (ev) {
            _this.loadEditForm(ev);
        });

        $('#form').on('click', '#saveButton[data-command=edit]', function (ev) {
            editBook.call(_this, ev);
        });

        $('#form').on('click', '#saveButton[data-command=add]', function (ev) {
            addBook.call(_this);
        });

        $('#books').on('click', '.deleteButton', function (ev) {
            deleteBook.call(_this, ev);
        });
    };

    return {
        get: function(data, views){
            return new Controller(data, views);
        }
    }
})();