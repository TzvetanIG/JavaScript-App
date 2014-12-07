var requester = (function(){
    function makeRequest(method, url, headers, userData) {
        var defer = Q.defer();

        $.ajax({
            method: method,
            headers: headers,
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(userData)
        }).success(function (data) {
            defer.resolve(data);
        }).error(function (data) {
            defer.reject(data);
        });

        return defer.promise;
    };

    function makeGetRequest( url, headers){
       return makeRequest('GET', url, headers, undefined)
    }

    function makePostRequest( url, headers, userData){
       return makeRequest('POST', url, headers, userData)
    }

    function makeDeleteRequest( url, headers){
        return makeRequest('DELETE', url, headers, undefined)
    }

    function makePutRequest( url, headers, userData){
        return makeRequest('PUT', url, headers, userData)
    }

    return {
        get: makeGetRequest,
        post: makePostRequest,
        put: makePutRequest,
        delete: makeDeleteRequest
    }
})();