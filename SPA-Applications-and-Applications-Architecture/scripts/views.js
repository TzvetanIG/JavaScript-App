var app = app || {};

app.views = (function () {
    var $booksContainer = $('#books');

    function showBooks(data) {
        $('main > *').hide();
        $('main #books').show();
        $.get('templates/books.html', function (template) {
            var output = Mustache.render(template, data);
            $booksContainer.html(output);
        });

        return data;
    }

    function showEditForm(data) {
        var books = data.results;
        $('main > *').hide();
        $('main #form').show();
        $('#title').val(books[0].title);
        $('#author').val(books[0].author);
        $('#isbn').val(books[0].isbn);
        $('#saveButton').attr('data-command', 'edit');
        $('#saveButton').attr('data-objectId', books[0].objectId);
    }

    function showAddForm() {
        $('#title').val('');
        $('#author').val('');
        $('#isbn').val('');
        $('#saveButton').attr('data-command', 'add');
        $('main > *').hide();
        $('main #form').show();
    }

    function getBooksContainer() {
        return $booksContainer;
    }

    return {
        showBooks: showBooks,
        showEditForm: showEditForm,
        showAddForm: showAddForm,
        getBooksContainer: getBooksContainer
    };
})();
