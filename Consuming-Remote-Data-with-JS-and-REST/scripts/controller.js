var app = app || {};

app.controller = (function () {
    function Controller(data, views) {
        this._data = data;
        this._views = views;
    }

    Controller.prototype.load = function () {
        loadBooks.call(this);
        attachEvents.call(this);
    };

    function loadBooks() {
        var _this = this;
        this._views.getBooksContainer().html('');
        this._data.books.readAllRows(function (books) {
                books.forEach(_this._views.book);
            },
            function () {
                console.log('Can not read books.');
            })
    }

    function attachEvents() {
        var _this = this;
        $('#addBookButton').on('click', function (e) {
            _this._views.getBooksContainer().html('');

            _this._views.form(undefined, function (e) {
                $form = $(e.target).parent();
                var book = {
                    title: $form.find('#title').val(),
                    author: $form.find('#author').val(),
                    isbn: $form.find('#isbn').val()
                };
                _this._data.books.addRow(book, function () {
                        console.log('Success add book.');
                    },
                    function () {
                        console.log('Cannot add book.');
                    });
                _this._views.getBooksContainer().html('');
                loadBooks.call(_this);
            });
        });

        $('#books').on('click', '.deleteButton', function (e) {
            var $bookId = $(e.target).parent().attr('id');
            _this._data.books.deleteRow($bookId, function () {
                    console.log('Success delete book.');
                    loadBooks.call(_this);
                },
                function () {
                    console.log('Cannot delete book.');
                });
        });

        $('#books').on('click', '.editButton', function (e) {
            _this._views.getBooksContainer().html('');

            var $book = $(e.target).parent();
            var book = {
                title: $book.find('.title').text(),
                author: $book.find('.author').text(),
                isbn: $book.find('.isbn').text(),
                objectId: $book.attr('id')
            };

            _this._views.form(book, function (e) {
                var $book = $(e.target).parent();
                var book = {
                    title: $book.find('#title').val(),
                    author: $book.find('#author').val(),
                    isbn: $book.find('#isbn').val(),
                    objectId: $book.attr('id')
                };

                _this._data.books.editRow(book.objectId, book, function () {
                        console.log('Success edit book.');
                    },
                    function () {
                        console.log('Cannot edit book.');
                    });

                loadBooks.call(_this);
            });
        });
    }

    return {
        get: function (data, views) {
            return new Controller(data, views);
        }
    }
})();