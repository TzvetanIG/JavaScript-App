var Table = (function () {
    function Table(id) {
        var $thead = $('<thead>');
        this._$header = $('<tr>').appendTo($thead);
        this._$table = $('<table id="' + id + '">');
        this._$table.append($thead);
        this._id = id;
    }

    Table.prototype.addHeader = function (columnNames) {
        var i,
            text;
        for (i = 0; i < columnNames.length; i++) {
            text = columnNames[i].replace(/\w/, columnNames[i][0].toUpperCase());
            this._$header.append($('<td>').text(text));
        }
    };

    Table.prototype.addRow = function (cells) {
        var $row = $('<tr>'),
            key;

        for (key in cells) {
            $row.append($('<td>').text(cells[key]));
        }

        this._$table.append($row);
    };

    Table.prototype.addBorder = function () {
        this._$table.css('border-collapse', 'collapse');
        $('#' + this._id + ' td').css('border', 'solid 1px #000');
    };

    Table.prototype.appendTo = function (parent) {
        this._$table.appendTo(parent);
    };

    Table.prototype.get$ = function () {
        return this._$table;
    };

    return Table;
})();


(function () {
    function generateTable() {
        var $textArea = $('textarea'),
            inputString = $textArea.val(),
            input = JSON.parse(inputString),
            keys = Object.keys(input[0]);

        var table = new Table('tableId');
        table.addHeader(keys);

        var i;
        for(i = 0; i < input.length; i++){
            table.addRow(input[i]);
        }

        table.appendTo(document.body);
        table.addBorder();

        table.get$().css('margin-top', '20px');
        table.get$().css('width', '50%');
        var $header  = table.get$().children('thead');
        $header.css('background', '#76923C');
        $header.css('text-align', 'center');
    }

    var $textArea = $('<textarea>');
    $textArea.appendTo('body');
    $textArea.css('width', '50%');
    $textArea.css('height', '100px');
    $textArea.css('display', 'block');

    var $submitButton = $('<button id="submitButton">Generate Table</button>').appendTo('body');
    $submitButton.click(generateTable);
})();
