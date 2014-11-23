(function ($) {
    var SHOWING_INTERVAL = 1000,
        TIME_LIVE = 3000;

    function box(className, parentId) {
        var $box = $('<div class="messageBox ' + className + '">')
            .css('opacity', '0')
            .appendTo('#' + parentId)
            .animate({
                opacity: '+=1'
            }, SHOWING_INTERVAL);

        setTimeout(
            function () {
                $box.remove();
            },
            TIME_LIVE
        );

        return $box;
    }


    $.prototype.messageBox = function (id) {
        $this = $(this);
        if ($('#' + id).length === 0) {
            $('<div id="' + id + '">').appendTo('body');
        }

        $('<style>' +
            '.messageBox {padding: 10px; width: 300px} ' +
            '.success {background: #7cfc00;} ' +
            '.error {background: #f00}' +
            '</style>'
        ).appendTo('head');

        function success(message) {
            return box('success', id).text(message);
        }

        function error(message) {
            return box('error', id).text(message);
        }

        return {
            success: success,
            error: error
        }
    }
})(jQuery)

$('<button>Success</button>')
    .appendTo('body')
    .click(function(){
        $().messageBox('message').success('success message').css('border-radius', '10px');
    });

$('<button>Error</button>')
    .appendTo('body')
    .click(function(){
        $().messageBox('message').error('error message');
    });

