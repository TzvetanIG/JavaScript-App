var boxMessage = (function(){
    var layout = 'topCenter';
    var timeout = 5000;

    function notyBox(text, type, buttons){
        noty({
                text: text,
                type: type,
                layout: layout,
                timeout: timeout,
                buttons: buttons
            }
        );
    }

    function infoBox(msg) {
        notyBox(msg, 'info', undefined);
    }

    function errorBox(msg) {
        notyBox(msg, 'error', undefined);
    }

    function confirmBox(msg, yes) {
        var buttons = [
            {
                text : "Yes",
                onClick : function($noty) {
                    yes();
                    $noty.close();
                }
            },
            {
                text : "Cancel",
                onClick : function($noty) {
                    $noty.close();
                }
            }
        ];

        notyBox(msg, 'confirm', buttons);
    }

    return {
        info: infoBox,
        error: errorBox,
        confirm: confirmBox
    }
})();