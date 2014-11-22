(function () {
    var NUMBER_OF_LI = 10;
    var $body = $('body'),
        $ul = $('<ul>'),
        $button,
        i;

    for (i = 1; i < NUMBER_OF_LI; i++) {
        if (i % 2) {
            $ul.append('<li class="even">Item ' + i + '</li>');
        } else {
            $ul.append('<li class="odd">Item ' + i + '</li>');
        }
    }

    $ul.css('width', '30%');
    $ul.appendTo($body);

    $body.append($('<div>').append('<label>Class: </label>').append('<input type="text" id="class" placeholder="write odd or even...">'));
    $body.append($('<div>').append('<label>Color: </label>').append('<input type="color" id="color">'));

    $button = $('<input type="button" id="paintButton" value="Paint">')
    $body.append($('<div>').append($button));

    $button.on('click', function (){
        $('.' + $('#class').val()).css('background', $('#color').val());
        $('#class').val('');
    });
})();
