var app = app || {};

(function(){
    var data = app.data.get;
    var views = app.views;
    var controller = app.controller.get(data,  views);
    controller.load();
})();