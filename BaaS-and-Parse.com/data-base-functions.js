var ParseComDB = (function () {
    function ParseComDB(parseAppId, parseRestApiKey) {
        this._headers = {
            "X-Parse-Application-Id": parseAppId,
            "X-Parse-REST-API-Key": parseRestApiKey
        };
    }

    ParseComDB.prototype.setTableName = function (tableName) {
        this._tableName = tableName;
    };

    ParseComDB.prototype.readAllRows = function (callback) {
        $.ajax({
            method: "GET",
            headers: this._headers,
            url: "https://api.parse.com/1/classes/" + this._tableName,
        }).success(function (data) {
            callback(data.results);
        }).error(function () {
            throw new Error('Cannot load table: ' + this._tableName);
        });
    };

    ParseComDB.prototype.readAllRowsWhere = function (column, value, callback) {
        var url = "https://api.parse.com/1/classes/" + this._tableName + '?where={"' + column + '": ' + value + '}';
        $.ajax({
            method: "GET",
            headers: this._headers,
            url: "https://api.parse.com/1/classes/" + this._tableName + '?where={"' + column + '": ' + value + '}',
        }).success(function (data) {
            callback(data.results);
        }).error(function () {
            throw new Error('Cannot load table: ' + this._tableName);
        });
    };

    ParseComDB.prototype.addRow = function (row, callback) {
        $.ajax({
            method: "POST",
            headers: this._headers,
            url: "https://api.parse.com/1/classes/" + this._tableName,
            contentType: 'application/json',
            data: JSON.stringify(row)
        }).success(function () {
            callback();
        }).error(function () {
            throw new Error('Cannot add row to table: ' + this._tableName);
        });
    };

    ParseComDB.prototype.editRow = function (objectId, row, callback) {
        $.ajax({
            method: "PUT",
            headers: this._headers,
            url: "https://api.parse.com/1/classes/" + this._tableName + '/' + objectId,
            contentType: 'application/json',
            data: JSON.stringify(row)
        }).success(function () {
            callback();
        }).error(function () {
            throw new Error('Cannot edit row to table: ' + this._tableName);
        });
    };

    ParseComDB.prototype.deleteRow = function (objectId, callback) {
        $.ajax({
            method: "DELETE",
            headers: this._headers,
            url: "https://api.parse.com/1/classes/" + this._tableName + '/' + objectId,
            contentType: 'application/json',
        }).success(function () {
            callback();
        }).error(function () {
            throw new Error('Cannot edit row to table: ' + this._tableName);
        });
    };

    return ParseComDB;
})();


(function () {
    function addCountryToSelect(country) {
        var $option = $('<option value="' + country['objectId'] + '">').text(country['name']);
        $('#countries').append($option);
    }

    function addTownToTable(town) {
        var $table = $('#townList'),
            $tr = $('<tr>'),
            $td = $('<td id="' + town['objectId'] + '">'),
            $span = $('<span>').text(town['name']),
            $removeButton = $('<button name="removeTownButton" objectId="' + town['objectId'] + '">').text('Remove'),
            $editButton = $('<button name="editTownButton" objectId="' + town['objectId'] + '">').text('Edit');
        $td.append($span).append($removeButton).append($editButton);
        $tr.append($td);
        $table.append($tr);
    }

    function emptyTable(selector) {
        $(selector + ' tr:not(:first)').remove();
    }

    function addAllElements(elements, callback) {
        var i;
        for (i = 0; i < elements.length; i++) {
            callback(elements[i]);
        }
    }

    function addAllCountriesToSelect(countries) {
        $('#countries').children().remove();
        addAllElements(countries, addCountryToSelect);
        showTownsByCountry();
     }

    function addAllTownsToTable(towns) {
        emptyTable('#townList');
        addAllElements(towns, addTownToTable);
    }

    function showTownsByCountry(e) {
        var countryId = $('#countries').val();
        parseCom.setTableName('Town');
        parseCom.readAllRowsWhere('country', '{"__type":"Pointer","className":"Country","objectId":"' + countryId + '"}',
            addAllTownsToTable);
    }

    function showCountryInputField(e) {
        sessionStorage.setItem("eventTarget", e.target.id);
        $('#countries').hide(500);
        $('#addCountryButton').hide(500);
        $('#removeCountryButton').hide(500);
        $('#editCountryButton').hide(500);
        $('#saveCountryButton').show(500);
        $('#countryName').show(500).select();

        switch (e.target.id) {
            case 'editCountryButton':
                $('input').val($('option:selected').text());
                break;
        }
    }

    function showAddTownInputField(e) {
        var countryId = $('#countries').val(),
            $button = $(e.target);
        $button.hide(500);
        $('#saveTownButton').show(500);
        $('#townName').show(500).select();

        sessionStorage.setItem("eventTarget", e.target.id);
        switch (e.target.id) {
            case 'editTownButton':
                //$('#townName').val($('option:selected').text());
                break;
        }
    }

    function showTownInputField(e) {
        var $td = $(e.target).parent(),
            townName = $td.children('span').text();
        $td.children().hide(500);
        $('<input type="text">')
            .val(townName)
            .hide()
            .appendTo($td)
            .show(500);
        $('<button name="saveTownButton">')
            .text('Save')
            .hide()
            .appendTo($td)
            .show(500);

    }

    function saveCountry(e) {
        var name = $('#countryName').val();

        $('#saveCountryButton').hide(500);
        $('#countryName').hide(500);
        $('#countries').show(500);
        $('#addCountryButton').show(500);
        $('#removeCountryButton').show(500);
        $('#editCountryButton').show(500);

        switch (sessionStorage.getItem("eventTarget")) {
            case 'addCountryButton':
                parseCom.setTableName('Country');
                parseCom.addRow({name: name}, update);
                break;
            case 'editCountryButton':
                parseCom.setTableName('Country');
                parseCom.editRow($('#countries').val(), {name: name}, update);
                $('option:selected').text(name);
                break;
        }

        $('#countryName').val('');
    }


    function saveTown(e) {
        var name = $('#townName').val(),
            countryId = $('#countries').val();

        $('#saveTownButton').hide(500);
        $('#townName').hide(500);
        $('#addTownButton').show(500);

        switch (sessionStorage.getItem("eventTarget")) {
            case 'addTownButton':
                parseCom.setTableName('Town');
                parseCom.addRow({
                    name: name,
                    country: {
                        "__type": "Pointer",
                        "className": "Country",
                        "objectId": countryId
                    }
                }, showTownsByCountry);
                break;
        }

        $('#countryName').val('');
    }

    function deleteCountry() {
        parseCom.setTableName('Country');
        parseCom.deleteRow($('#countries').val(), update);
        emptyTable('#townList');
        //todo delete towns of country
    }


    function update() {
        parseCom.setTableName('Country');
        parseCom.readAllRows(addAllCountriesToSelect);
    }

    function captureClickonTowns(e) {
        var buttonName = $(e.target).attr('name'),
            townId = $(e.target).parent().attr('id');
        parseCom.setTableName('Town');
        switch (buttonName) {
            case 'editTownButton':
                showTownInputField(e);
                break;
            case 'saveTownButton':
                var townName = $(e.target).parent().children('input').val();
                parseCom.editRow(townId, {name: townName}, showTownsByCountry);
                break;
            case 'removeTownButton':
                parseCom.deleteRow(townId, showTownsByCountry);
                break;
        }
    }

    var parseCom = new ParseComDB('6XybF3VFQ0JcSjv2dFnPSF8gKtfizQKgfQ2DWd9d', 'gpifIkq3gXdDTIDVnaUO9MmQDFvo5lsngF894JTn');
    parseCom.setTableName('Country');
    parseCom.readAllRows(addAllCountriesToSelect);
    $('#countries').on('change', showTownsByCountry);
    $('#addCountryButton').on('click', showCountryInputField);
    $('#saveCountryButton').on('click', saveCountry);
    $('#editCountryButton').on('click', showCountryInputField);
    $('#removeCountryButton').on('click', deleteCountry);

    $('#addTownButton').on('click', showAddTownInputField);
    $('#saveTownButton').on('click', saveTown);
    $('#townList').on('click', captureClickonTowns);
    parseCom.setTableName('Town');
})();


