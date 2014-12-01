var requester = (function(){
    function makeRequest(method, url, headers, userData, success, error) {
        $.ajax({
            method: method,
            headers: headers,
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(userData)
        }).success(function (data) {
            success(data.results);
        }).error(function (data) {
            error(data.results);
        });
    };

    function makeGetRequest( url, headers, success, error){
        makeRequest('GET', url, headers, undefined, success, error)
    }

    function makePostRequest( url, headers, userData, success, error){
        makeRequest('POST', url, headers, userData, success, error)
    }

    function makeDeleteRequest( url, headers, success, error){
        makeRequest('DELETE', url, headers, undefined, success, error)
    }

    function makePutRequest( url, headers, userData, success, error){
        makeRequest('PUT', url, headers, userData, success, error)
    }

    return {
        get: makeGetRequest,
        post: makePostRequest,
        put: makePutRequest,
        delete: makeDeleteRequest
    }
})();