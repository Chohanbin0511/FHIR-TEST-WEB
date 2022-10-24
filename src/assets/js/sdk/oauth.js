/*eslint-disable*/
// 인증토큰 발급 요청(Authorization Code Grant)
export function authorizationCode(config) {

    var authorizationCodeData = {
        client_id: config.client_id,
        redirect_uri: config.redirect_uri,
        response_type: "code",
        scope: config.scope,
        state: config.state
    };

    var queryStringData = queryString(authorizationCodeData);
    location.href = config.authorize + "?" + queryStringData;
};
// Code를 이용한 인증 토큰 발급 요청(Authorization Code Grant)
export function getToken(config, code) {

    var getTokenData = {
        code: code,
        redirect_uri: config.redirect_uri,
        grant_type: "authorization_code"
    };

    var queryStringData = queryString(getTokenData);

    return authXMLHttpRequest(config, queryStringData);
};
// 인증토큰 발급 요청(Implicit Grant)
export function implicit(config) {

    var implicitData = {
        client_id: config.client_id,
        redirect_uri: config.redirect_uri,
        response_type: "token",
        scope: config.scope,
        state: config.state
    };

    var queryStringData = queryString(implicitData);


    location.href = config.authorize + "?" + queryStringData;
};
// 인증토큰 발급 요청(Client Credentials Grant)
export function clientCredentials(config) {

    var clientCredentialsData = {
        grant_type: "client_credentials",
        scope: config.scope,
        state: '1234'
    };

    var queryStringData = queryString(clientCredentialsData);
    console.log("config",config)
    console.log("queryStringData",queryStringData)
    return authXMLHttpRequest(config, queryStringData);
};

// 인증토큰 발급 요청(Resource Owner Password Credentials Grant)
export function passwordCredentials(config, userInfo) {

    var passwordCredentialsData = {
        grant_type: "password",
        username: userInfo.userId,
        password: userInfo.userPw,
        scope: config.scope,
        state: '1234'
    };

    var queryStringData = queryString(passwordCredentialsData);

    return authXMLHttpRequest(config, queryStringData);
};

// 인증토큰 재발급 요청(Refresh)
export function refresh(config, refresh_token) {

    var refreshData = {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
        scope: config.scope
    };

    var queryStringData = queryString(refreshData);

    return authXMLHttpRequest(config, queryStringData);
};

// queryString 만들기
function queryString(data) {
var queryStringData = Object.keys(data).map(function(key) {
    return key + '=' + data[key]
}).join('&');

return queryStringData;
}

// 인증 토큰 요청
function authXMLHttpRequest(config, queryStringData) {
    return new Promise(function(resolve, reject) {
        console.log("dddd",btoa(config.client_id + ":" + config.client_secret))
        var xhr = new XMLHttpRequest();
        xhr.open("POST", config.token, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "Basic " + btoa(config.client_id + ":" + config.client_secret));
        xhr.send(queryStringData);

        xhr.onreadystatechange = function() {
            console.log("xhr",xhr)
            if(xhr.readyState == xhr.DONE) {
                if(xhr.status >= 200 && xhr.status < 300) {
                    var data = JSON.parse(xhr.responseText);
                    console.log("data",data)
                    resolve(data);
                } else {
                    reject(xhr);
                }
            }
        };
    })
}