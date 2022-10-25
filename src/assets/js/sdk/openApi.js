/*eslint-disable*/
// 회원 아이디 중복 확인
export function checkExistUserId(config, data) {
    return openAPIXMLHttpRequest("GET", `${config.baseUrl}/register/${data.userId}/exist`, null, null, config);
};
// 핸드폰번호 인증(SMS)
export function identifyMobilePhone(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/register/identify`, null, data, config);
};
// 플랫폼 약관 목록 조회
export function fetchStplat(config) {
    return openAPIXMLHttpRequest("GET", `${config.baseUrl}/register/stplat`, null, null, config);
};
// 신규 회원가입
export function register(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/register`, null, data, config);
};
// 기존 회원 서비스 가입
export function registerService(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/register/${data.userId}/service`, null, data, config);
};
// 1. 이메일/핸드폰번호로 아이디 찾기
// 2. 질문/답변으로 아이디 찾기
export function searchUserId(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/register/search`, null, data, config);
};
// 이메일/핸드폰번호로 비밀번호 찾기
export function searchPassword(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/register/${data.userId}/lostpw`, null, data, config);
};
// 인증코드 확인
export function checkAuthCode(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/register/${data.userId}/checkauthcode`, null, data, config);
};
// 업데이트 패스워드
export function updatePassword(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/register/${data.userId}/resetpw`, null, data, config);
};
// 회원 정보 조회
export function fetchUserInfo(config) {
    return openAPIXMLHttpRequest("GET", `${config.baseUrl}/user`, config.accessToken, null, null);
};
// 패스워드 확인
export function checkPassword(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/checkpw`, config.accessToken, data, null);
};
// 회원 정보 수정
export function modifyUserInfo(config, data) {
    return openAPIXMLHttpRequest("PUT", `${config.baseUrl}/user`, config.accessToken, data, null);
};
// 회원 탈퇴
export function unregister(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/unregister`, config.accessToken, data, null);
};
// PHR 공유자 추가
export function addPHRSharedUser(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/sharedUser`, config.accessToken, data, null);
};
// PHR 공유자 조회
export function fetchPHRSharedUserList(config) {
    return openAPIXMLHttpRequest("GET", `${config.baseUrl}/user/sharedUserList`, config.accessToken, null, null);
};
// PHR 공유자 삭제
export function removePHRSharedUser(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/removeSharedUser`, config.accessToken, data, null);
};
// PHR 공유자 수정
export function modifyPHRSharedUsers(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/modifySharedUsers`, config.accessToken, data, null);
};
// 업데이트 패스워드
export function modifyPassword(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/modify/password`, config.accessToken, data, null);
};
// 관상동맥질환 예측
export function coronaryArtery(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/10`, config.accessToken, data, null);
};
// 당뇨병 질환 예측
export function diabetes(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/12`, config.accessToken, data, null);
};
// 뇌졸중 질환 예측
export function stroke(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/5`, config.accessToken, data, null);
};
// 신체나이 예측
export function bodyAge(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/7`, config.accessToken, data, null);
};
// 동맥경화성 심혈관질환(ASCVD) 예측
export function ASCVD(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/11`, config.accessToken, data, null);
};
// 10년내 당뇨병 발병 예측
export function diabetesIn10Years(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/13`, config.accessToken, data, null);
};
// 10년내 심장마비 발병 예측
export function heartAttackIn10Years(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/14`, config.accessToken, data, null);
};
// 10년내 11종 암 발병 예측
export function cancersIn10Years(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/15`, config.accessToken, data, null);
};
// 사용자의 예측모델별 마지막 예측결과값 조회
export function fetchLatestPredict(config, data) {
    return openAPIXMLHttpRequest("GET", `${config.baseUrl}/user/predict/${data.modelId}`, config.accessToken, null, null);
};
// 5년내 정맥 혈전 색전증(DVT) 발병 예측
export function dvtIn5Years(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/16`, config.accessToken, data, null);
};
// 5년내 중증도의 만성 신장 질환(CKD) 발병 예측
export function ckdIn5Years(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/17`, config.accessToken, data, null);
};
// 5년내 말기 신부전 신장 질환(ESRD) 발병 예측
export function esrdIn5Years(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/18`, config.accessToken, data, null);
};
// 10년내 골다공증 골절 발병 예측
export function osteoporoticFractureIn10Years(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/19`, config.accessToken, data, null);
};
// 10년내 고관절 골절 발병 예측
export function hipFractureIn10Years(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/20`, config.accessToken, data, null);
};
// 회원 정보 Block 생성
export function createBlockchain(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/block`, config.accessToken, data, null);
};
// Resource 추가
export function addResource(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/block/resource`, config.accessToken, data, null);
};
// 회원 정보 Block 수정
export function updateBlockchain(config, data) {
    return openAPIXMLHttpRequest("PUT", `${config.baseUrl}/user/block`, config.accessToken, data, null);
};
// 회원 정보 Block 조회
export function fetchBlockchain(config) {
    return openAPIXMLHttpRequest("GET", `${config.baseUrl}/user/block`, config.accessToken, null, null);
};
// 회원 정보 Block 삭제
export function deleteBlockchain(config) {
    return openAPIXMLHttpRequest("DELETE", `${config.baseUrl}/user/block`, config.accessToken, null, null);
};
// 모바일 앱 최신 버전정보 조회
export function PHRApp(config, data) {
    return openAPIXMLHttpRequest("GET", `${config.baseUrl}/phrapp/${data.appSn}`, null, null, config);
};
// 문자 메시지 발송
export function sendSMSMsg(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/send/sms`, null, data, config);
};
// 유저 문자 메시지 발송
export function sendUserSMSMsg(config, data) {
    return openAPIXMLHttpRequest("POST", `${config.baseUrl}/send/user/sms`, config.accessToken, data, null);
};

function openAPIXMLHttpRequest(method, uri, accessToken, data, config) {
    return new Promise(function(resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open(method, uri, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        if(accessToken == null) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(config.client_id + ":" + config.client_secret));
        } else {
            xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        }

        if(data == null) {
            xhr.send(null);
        } else {
            xhr.send(JSON.stringify(data));
        }

        xhr.onreadystatechange = function() {
            if(xhr.readyState == xhr.DONE) {
                if(xhr.status >= 200 && xhr.status < 300) {
                    var response = xhr.responseText;

                    if(response && response != undefined && response != null && response != "") {
                        var openApiData = JSON.parse(response);
                        resolve(openApiData);
                    } else {
                        resolve(response);
                    }
                } else {
                    reject(xhr);
                }
            }
        } 
    }) 
};