(function () {
    var students = [
        {"gender": "Male", "firstName": "Joe", "lastName": "Riley", "age": 22, "country": "Russia"},
        {"gender": "Female", "firstName": "Lois", "lastName": "Morgan", "age": 41, "country": "Bulgaria"},
        {"gender": "Male", "firstName": "Roy", "lastName": "Wood", "age": 33, "country": "Russia"},
        {"gender": "Female", "firstName": "Diana", "lastName": "Freeman", "age": 40, "country": "Argentina"},
        {"gender": "Female", "firstName": "Bonnie", "lastName": "Hunter", "age": 23, "country": "Bulgaria"},
        {"gender": "Male", "firstName": "Joe", "lastName": "Young", "age": 16, "country": "Bulgaria"},
        {"gender": "Female", "firstName": "Kathryn", "lastName": "Murray", "age": 22, "country": "Indonesia"},
        {"gender": "Male", "firstName": "Dennis", "lastName": "Woods", "age": 37, "country": "Bulgaria"},
        {"gender": "Male", "firstName": "Billy", "lastName": "Patterson", "age": 24, "country": "Bulgaria"},
        {"gender": "Male", "firstName": "Willie", "lastName": "Gray", "age": 42, "country": "China"},
        {"gender": "Male", "firstName": "Justin", "lastName": "Lawson", "age": 38, "country": "Bulgaria"},
        {"gender": "Male", "firstName": "Ryan", "lastName": "Foster", "age": 24, "country": "Indonesia"},
        {"gender": "Male", "firstName": "Eugene", "lastName": "Morris", "age": 37, "country": "Bulgaria"},
        {"gender": "Male", "firstName": "Eugene", "lastName": "Rivera", "age": 45, "country": "Philippines"},
        {"gender": "Female", "firstName": "Kathleen", "lastName": "Hunter", "age": 28, "country": "Bulgaria"}
    ];


    //	Get all students with age between 18 and 24
    var filteredStudents = _.filter(students, function (student) {
        return student.age >= 18 && student.age <= 24
    });

    var result = {
        filteredStudents: filteredStudents
    };

    var template = '{{#filteredStudents}}<div>{{firstName}} {{lastName}} - age: {{age}}</div>{{/filteredStudents}}'
    var output = Mustache.render(template, result) + '<br/>';


    //	Get all students whose first name is alphabetically before their last name
    filteredStudents = _.filter(students, function (student) {
        return (student.firstName.localeCompare(student.lastName) < 0);
    });

    result = {
        filteredStudents: filteredStudents
    };

    template = '{{#filteredStudents}}<div>{{firstName}} {{lastName}}</div>{{/filteredStudents}}'
    output += Mustache.render(template, result) + '<br/>';


    //	Get only the names of all students from Bulgaria
    filteredStudents = _.chain(students)
        .where({country: 'Bulgaria'})
        .map(function (student) {
            return {
                firstName: student.firstName,
                lastName: student.lastName
            }
        })
        .value();

    filteredStudents.forEach(function (student) {
        student.json = JSON.stringify(student)
    });

    result = {
        filteredStudents: filteredStudents
    };

    template = '{{#filteredStudents}}<div>{{json}}</div>{{/filteredStudents}}'
    output += Mustache.render(template, result) + '<br/>';


    //	Get the last five students
    filteredStudents = _.last(students, 5);
    result = {
        filteredStudents: filteredStudents
    };

    template = '{{#filteredStudents}}<div>{{firstName}} {{lastName}}</div>{{/filteredStudents}}'
    output += Mustache.render(template, result) + '<br/>';


    //	Get the first three students who are not from Bulgaria and are male
    filteredStudents = _.chain(students)
        .filter(function (student) {
            return (student.country !== 'Bulgaria' && student.gender === 'Male');
        })
        .first(3)
        .value();

    result = {
        filteredStudents: filteredStudents
    };

    template = '{{#filteredStudents}}<div>{{firstName}} {{lastName}} - gender: {{gender}} - country: {{country}}</div>{{/filteredStudents}}'
    output += Mustache.render(template, result) + '<br/>';

    $('body').html(output);
})();