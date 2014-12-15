var app = app || {};

app.controller = (function () {
    function Controller(data, views) {
        this._data = data;
        this._views = views;
    }

    Controller.prototype.loadRouter = function () {
        var _this = this;
        _this.loadHomePage();

        this._router = Sammy(function () {
            this.get('#/', function () {
                _this.loadHomePage();
            });

            this.get('#/login', function () {
                _this._views.showLoginForm();
            });

            this.get('#/registration', function () {
                _this._views.showRegisterForm();
            });

            this.get('#/products', function () {
                loadProducts.call(_this);
            });

            this.get('#/products/add', function () {
                var user = _this._data.users.getLoginUserData();
                if(user){
                    _this._views.showAddProductForm();
                } else {
                    _this._router.setLocation('#/');
                }

            });
        });

        this._router.run('#/');
    };

    Controller.prototype.loadHomePage = function () {
        if (sessionStorage['id']) {
            this._views.showWelcomeUser(sessionStorage);
        } else {
            this._views.showWelcomeQuest();
        }
    };

    Controller.prototype.attachEvents = function () {
        var _this = this;

        $('#main').on('click', '#register-button', function (ev) {
            registerUser.call(_this, ev);
        });

        $('#main').on('click', '#login-button', function (ev) {
            login.call(_this, ev);
        });

        $('#main').on('click', '#add-product-button', function (ev) {
            addProduct.call(_this, ev);
        });

        $('#main').on('click', '.delete-button', function (ev) {
            deleteProduct.call(_this, ev);
        });

        $('#main').on('click', '.edit-button', function (ev) {
            _this._views.showEditForm(ev);
        });

        $('#main').on('click', '#edit-product-button', function (ev) {
            editProduct.call(_this, ev);
        });

        $('header').on('click', '#logout-button', function (e) {
            logout.call(_this);
        });
    };

    function getUserDataOfRegisterForm(e) {
        var $form = $(e.target).parent().parent();
        var password = $form.find('#password').val();
        var confirmPassword = $form.find('#confirm-password').val();
        if (password === confirmPassword) {
            var user = {
                name: $form.find('#username').val(),
                password: password
            };

            return user;
        } else {
            return null;
        }
    }

    function getUserDataOfLoginForm(e) {
        var $form = $(e.target).parent().parent();
        var user = {
            name: $form.find('#username').val(),
            password: $form.find('#password').val()
        };

        return user;
    }

    function login(e) {
        var _this = this;
        var user = getUserDataOfLoginForm(e);
        _this._data.users.login(user.name, user.password)
            .then(function (userInfo) {
                _this._data.users.makeSession(userInfo);
                _this._router.setLocation('#/');
            }, function (data) {
                boxMessage.error('Error: ' + data.responseJSON.error);
            })
            .done();
    }

    function registerUser(e) {
        var _this = this;
        var user = getUserDataOfRegisterForm(e);
        if (user) {
            _this._data.users.registration(user.name, user.password)
                .then(function (userInfo) {
                    boxMessage.info('User registered successfully.');
                }, function (data) {
                    boxMessage.error('Error: ' + data.responseJSON.error);
                })
                .done();
        } else {
            boxMessage.error('Confirm password different from the password');
        }
    }

    function logout() {
        delete sessionStorage['un'];
        delete  sessionStorage['st'];
        delete sessionStorage['id'];
        this._views.showWelcomeQuest();
    }


    function addProduct(e) {
        var _this = this;

        var user = _this._data.users.getLoginUserData();
        var $form = $(e.target).parent().parent();
        var acl = {};

        acl[user.id] = {
            "read": true,
            "write": true
        };
        acl["*"] = {
            "read": true
        };

        var product = {
            name: $form.find('#name').val(),
            category: $form.find('#category').val(),
            price: Number($form.find('#price').val()),
            ACL: acl
        };

        _this._data.products.addRow(product)
            .then(function (data) {
                _this._router.setLocation('#/products');
                boxMessage.info('Product successfully added.');
            }, function (error) {
                boxMessage.error('Error: ' + data.responseJSON.error);
            })
            .done();
    }

    function loadProducts() {
        var _this = this;
        var user = _this._data.users.getLoginUserData();
        if(!user){
            _this._router.setLocation('#/');
        }

        _this._data.products.readAllRows()
            .then(function (data) {
                data.results.forEach(function (result) {
                    //var keys = Object.keys(result.ACL)
                    if(result.ACL && result.ACL[user.id]){
                        var $footer = $('<footer class="product-footer" id="{{objectId}}">' +
                           '<a href="#/products/edit/{{objectId}}">' +
                                ' <button class="edit-button">Edit</button>\n\r' +
                            '</a>' +
                            '<a href="#/products">' +
                                '<button class="delete-button">Delete</button>' +
                            '</a>' +
                        '</footer>');
                        result['footer'] = $footer.html();
                    }
                });
                _this._views.showProductList(data);
            }, function (error) {
                boxMessage.error('Error... try again!!!');
            })
            .done();
    }

    function deleteProduct(e) {
        var _this = this;
        var id = $(e.target).parent().parent().attr('id');
        var user = _this._data.users.getLoginUserData();
        _this._data.products.addHeader('X-Parse-Session-Token', user.sessionToken);
        _this._data.products.deleteRow(id)
            .then(function (data) {
                loadProducts.call(_this);
                boxMessage.info('Product successfully deleted.');
            }, function (error) {
                boxMessage.error('Error: ' + data.responseJSON.error);
            })
            .done();
    }

    function editProduct(e) {
        var $form = $(e.target).parent().parent();
        var product = {
            name: $form.find('#item-name').val(),
            category: $form.find('#category').val(),
            price: Number($form.find('#price').val())
        };

        var id = $(e.target).attr('data-id');

        var _this = this;
        var user = _this._data.users.getLoginUserData();
        _this._data.products.addHeader('X-Parse-Session-Token', user.sessionToken);
        _this._data.products.editRow(id, product)
            .then(function (data) {
                _this._router.setLocation('#/products');
                boxMessage.info('Product successfully edited.');
            }, function (error) {
                boxMessage.error('Error: ' + data.responseJSON.error);
            })
            .done();
    }


    return {
        get: function (data, views) {
            return new Controller(data, views);
        }
    }
})
();