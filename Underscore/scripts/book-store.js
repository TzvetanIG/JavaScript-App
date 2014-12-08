(function () {
    var books = [
        {"book": "The Grapes of Wrath", "author": "John Steinbeck", "price": "34.24", "language": "French"},
        {"book": "The Great Gatsby", "author": "F. Scott Fitzgerald", "price": "39.26", "language": "English"},
        {"book": "Nineteen Eighty-Four", "author": "George Orwell", "price": "15.39", "language": "English"},
        {"book": "Ulysses", "author": "James Joyce", "price": "23.26", "language": "German"},
        {"book": "Lolita", "author": "Vladimir Nabokov", "price": "14.19", "language": "German"},
        {"book": "Catch-22", "author": "Joseph Heller", "price": "47.89", "language": "German"},
        {"book": "The Catcher in the Rye", "author": "J. D. Salinger", "price": "25.16", "language": "English"},
        {"book": "Beloved", "author": "Toni Morrison", "price": "48.61", "language": "French"},
        {"book": "Of Mice and Men", "author": "John Steinbeck", "price": "29.81", "language": "Bulgarian"},
        {"book": "Animal Farm", "author": "George Orwell", "price": "38.42", "language": "English"},
        {"book": "Finnegans Wake", "author": "James Joyce", "price": "29.59", "language": "English"},
        {"book": "The Grapes of Wrath", "author": "John Steinbeck", "price": "42.94", "language": "English"}
    ];

    // Group all books by language and sort them by author (if two books have the same author, sort by price)
    var groupedBook = _.chain(books)
        .sortBy(function (book) {
            return book.author + ' ' + book.price;
        })
        .groupBy('language')
        .value();

    var key,
        tempate,
        result,
        output = '';

    for(key in groupedBook){
        output += '<div>' + key + ':</div>';
        result = {
            groupedBook: groupedBook[key]
        };

        template = '{{#groupedBook}}<div>{{author}} - <strong>{{book}}</strong> - price: {{price}} - language: {{language}}</div>{{/groupedBook}}'
        output += Mustache.render(template, result) + '<br/>';
    }

    output += '<br/>';


    // 	Get the average book price for each author
    var groupedBook = _.chain(books)
        .groupBy('author')
        .value();

    var author;

    for(author in groupedBook){
        result = {
            author: author,
            averagePrice:  ( _.chain(groupedBook[author])
                .reduce(function (sum, book) {
                   return sum + Number(book.price);
                }, 0)
                .value()) /  groupedBook[author].length
        };

        template = '<div>{{author}} - average price: {{averagePrice}}</div>'
        output += Mustache.render(template, result);
    }

    output += '<br/><br/>';


    //	Get all books in English or German, with price below 30.00, and group them by author
    var groupedBook = _.chain(books)
        .filter(function (book) {
            return (book.language === 'English' ||
                book.language === 'German') &&
                Number(book.price) < 30;
        })
        .groupBy('author')
        .value();

    for(author in groupedBook){
        result = {
            groupedBook: groupedBook[author]
        };

        template = '{{#groupedBook}}<div>{{author}} - <strong>{{book}}</strong> - price: {{price}} - language: {{language}}</div>{{/groupedBook}}'
        output += Mustache.render(template, result) + '<br/>';
    }

    output += '<br/>';

    $('body').html(output);
})();