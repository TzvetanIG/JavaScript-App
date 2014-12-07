var app = app || {};

(function(){
    var data = app.data.get;
    var views = app.views;
    var controller = app.controller.get(data,  views);
    controller.attachEvents();

    app.router = Sammy(function (){
        this.get('#/', function () {
            controller.loadBooks();
        });

        this.get('#/add', function () {
            controller.loadAddForm();
        });

        this.get('#/all', function () {
            controller.loadBooks();
        });
    });

    app.router.run('#/');
})();