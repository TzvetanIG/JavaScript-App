var app = app || {};

app.views = (function () {
    function showWelcomeQuest() {
        $('nav > *').hide();
        $('#quest-menu').show();
        loadTemplate('welcome-guest')
            .then(mustacheRender)
            .done();
    }

    function showWelcomeUser(sessionData) {
        $('nav > *').hide();
        $('#user-menu').show();
        loadTemplate('welcome-user')
            .then(function (tamplate) {
                mustacheRender(tamplate, sessionData);
            })
            .done();
    }


    function showLoginForm() {
        loadTemplate('login-form')
            .then(mustacheRender)
            .done();
    }

    function showRegisterForm() {
        loadTemplate('register-form')
            .then(mustacheRender)
            .done();
    }

    function showAddProductForm() {
        loadTemplate('add-product-form')
            .then(mustacheRender)
            .done();
    }

    function showProductList(data) {
        loadTemplate('product-list')
            .then(function (tamplate) {
                mustacheRender(tamplate, data);
            })
            .done();
    }

    function showEditForm(e) {
        var $form = $(e.target).parent().parent().parent();
        var id = $(e.target).parent().parent().attr('id');
        var product = {
            name: $form.find('.item-name').text(),
            category: $form.find('.category').text().split(':')[1],
            price: $form.find('.price').text().split(':')[1].split('$')[1],
            objectId: id
        };

        loadTemplate('edit-product-form')
            .then(function (tamplate) {
                mustacheRender(tamplate, product);
            })
            .done();
    }

    function loadTemplate(name) {
        var defer = Q.defer();
        $.get('./templates/' + name + '.html', function (template) {
            defer.resolve(template);
        });

        return defer.promise;
    }

    function mustacheRender(template, data) {
        var output = Mustache.render(template, data);
        $('#main').html('');
        $('#main').html(output);
    }

    return {
        showWelcomeQuest: showWelcomeQuest,
        showLoginForm: showLoginForm,
        showRegisterForm: showRegisterForm,
        showWelcomeUser: showWelcomeUser,
        showAddProductForm: showAddProductForm,
        showProductList: showProductList,
        showEditForm: showEditForm
    };
})();
