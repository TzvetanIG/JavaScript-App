var app = app || {};

app.data = (function(){
    var headers = {
        'X-Parse-Application-Id': 'SXImHC6DRY68x0wma5GEhI2gxS6f7epZdZc2BhlJ',
        'X-Parse-REST-API-Key': 'CLAeR8X7J5rrSKfLrEIuH8mALK1ZCbsi91jKoFO1'
     };

    var parseComData = {
        headers : headers,
        url: 'https://api.parse.com/1/classes/'
    };

    function Data(){
        this.books = new Table(parseComData, 'Books');
    }

    var Table = (function(){
        function Table(service, tableName){
            this._service = service;
            this._dataUrl = service.url + tableName
        }

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