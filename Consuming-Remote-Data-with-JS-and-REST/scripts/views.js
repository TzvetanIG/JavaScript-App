var app = app || {};

app.views = (function () {
    var $booksContainer = $('#books');

    function book(book) {
        var $book = $('<article class="book" id="' + book.objectId + '">').load('htmlElements/book.html', function () {
            $book.find('.title').text(book.title);
            $book.find('.author').text(book.author);
            $book.find('.isbn').text(book.isbn);
        });

        $booksContainer.append($book);
    }

    function form(book, callback) {
        var selector;
        if(book){
            selector = '<div id="'+ book.objectId +'">'
        } else {
            selector = '<div>';
        }

        var $form = $(selector).load('htmlElements/form.html', function () {
            if (book) {
                $form.find('#title').val(book.title);
                $form.find('#author').val(book.author);
                $form.find('#isbn').val(book.isbn);
            }

            $booksContainer.append($form);
            $('#saveButton').on('click', callback);
        });
    }

    function getBooksContainer() {
        return $booksContainer;
    }

    return {
        book: book,
        form: form,
        getBooksContainer: getBooksContainer
    };
})();
