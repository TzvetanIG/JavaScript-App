var app = app || {};

app.data = (function(){
    var headers = {
        'X-Parse-Application-Id': '3j0bThXejQImgqtjS0jmgw9sZ9inTO0Xox2IaBOZ',
        'X-Parse-REST-API-Key': 'JwLlw3l5rqEdvMrQUNzEICemmCjeCVyqzlnlSNTi'
     };

    var parseComData = {
        headers : headers,
        url: 'https://api.parse.com/1/classes/'
    };

    var parseComUser = {
        headers : headers,
        url: 'https://api.parse.com/1/'
    };

    function Data(){
        this.products = new Table(parseComData, 'Product');
        this.users = new User(parseComUser);
    }

    var User = (function(){
        function User(service){
            this._service = service;
        }

        User.prototype.makeSession = function (userInfo){
            sessionStorage.setItem('un', userInfo.username);
            sessionStorage.setItem('st', userInfo.sessionToken);
            sessionStorage.setItem('id',userInfo.objectId );
        };

        User.prototype.getLoginUserData = function () {
            var user;
            if(sessionStorage['un'] &&
                sessionStorage['st'] &&
                sessionStorage['st']) {
                user = {
                    username: sessionStorage['un'],
                    sessionToken: sessionStorage['st'],
                    id: sessionStorage['id']
                };

                return user;
            } else {
                return null
            }
        };

        User.prototype.registration = function (username, password) {
            var user = {
                username: username,
                password: password
            };

            return requester.post(this._service.url + 'users', this._service.headers, user);
        };

        User.prototype.login = function (username, password) {
            var parameters = 'username=' + username +
                '&password=' + password;

            return requester.get(this._service.url + 'login?' + parameters, this._service.headers);
        };

        return User;
    })();

    var Table = (function(){
        function Table(service, tableName){
            this._service = service;
            this._dataUrl = service.url + tableName
        }

        Table.prototype.addHeader = function (key, value) {
            this._service.headers[key] = value;
        };

        Table.prototype.readAllRows = function () {
            return requester.get(this._dataUrl, this._service.headers);
        };

        Table.prototype.readAllRowsWhere = function (column, value) {
            if(value instanceof Object){
                value = JSON.stringify(value);
            } else {
                value = '"' + value + '"';
            }

            return requester.get(this._dataUrl  + '?where={"' + column + '": ' + value + '}',
                this._service.headers);
        };

        Table.prototype.addRow = function (row) {
            return requester.post( this._dataUrl, this._service.headers, row);
        };

        Table.prototype.editRow = function (objectId, row) {
           return  requester.put( this._dataUrl + '/' + objectId, this._service.headers, row)
        };

        Table.prototype.deleteRow = function (objectId) {
            return requester.delete( this._dataUrl + '/' + objectId, this._service.headers);
        };

        return Table;
    })();

    return {
        get: new Data()
    }
})();