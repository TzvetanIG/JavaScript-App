(function ($) {
    $.fn.treeView = function (selector) {
        var $this = $(this);
        var CLOSE_SYMBOL = '▸ ',
            OPEN_SYMBOL = '▾ ';

        $('<style>.close:before{content:"' + CLOSE_SYMBOL + '"}</style>').appendTo('head');
        $('<style>.open:before{content:"' + OPEN_SYMBOL + '"}</style>').appendTo('head');

        function hideAllChildren(selector) {
            $(selector + ' li')
                .addClass('close')
                .css('list-style-type', 'none');

            $(selector + ' li')
                .click(toggleDerectChildren)
                .addClass('close')
                .css('list-style-type', 'none')
                .children()
                .hide();
        }

        function toggleDerectChildren() {
            event.stopPropagation();
            var className = $(this)
                .attr('class');

            if (className.indexOf('close') >= 0) {
                $(this)
                    .removeClass('close')
                    .addClass('open')
                    .children('ul')
                    .first()
                    .show(500);
            } else {
                $(this)
                    .removeClass('open')
                    .addClass('close')
                    .children('ul')
                    .first()
                    .hide(500);
            }

        }

        hideAllChildren(selector);
        return $this;
    }
})(jQuery)

$.fn.treeView('#tree');