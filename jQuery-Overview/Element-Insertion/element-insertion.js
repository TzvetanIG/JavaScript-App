(function () {
    var $div = $('<div>').text('Hello jQuery'),
        $body = $('body');

    $div.appendTo('body');
    $body.append($('<div>').text('Hello for second time'));
    $('div').append('<p>paragraph</p>');

    var newDiv = document.createElement('div');
    newDiv.textContent = 'I am new div.';

    $body.append(newDiv);
    $body.prepend(newDiv);
})();