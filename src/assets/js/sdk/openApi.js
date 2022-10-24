/*eslint-disable*/
(function (global) {

    // nodejs
    if ( typeof module === "object" && typeof module !== undefined ) {

        var axios = require('axios').default;

        module.exports = {
            // 회원 아이디 중복 확인
            checkExistUserId: function(config, data) {
                
                var auth = {
                    username: config.client_id,
                    password: config.client_secret
                };

                return openAPIRequest("GET", `${config.baseUrl}/register/${data.userId}/exist`, auth, null, null);
            },
            // 핸드폰번호 인증(SMS)
            identifyMobilePhone: function(config, data) {

                var auth = {
                    username: config.client_id,
                    password: config.client_secret
                };

                return openAPIRequest("POST", `${config.baseUrl}/register/identify`, auth, null, data);
            },
            // 플랫폼 약관 목록 조회
            fetchStplat: function(config, data) {

                var auth = {
                    username: config.client_id,
                    password: config.client_secret
                };

                return openAPIRequest("GET", `${config.baseUrl}/register/stplat`, auth, null, data);
            },
            // 신규 회원가입
            register: function(config, data) {
                var auth = {
                    username: config.client_id,
                    password: config.client_secret
                };

                return openAPIRequest("POST", `${config.baseUrl}/register`, auth, null, data);
            },
            // 기존 회원 서비스 가입
            registerService: function(config, data) {

                var auth = {
                    username: config.client_id,
                    password: config.client_secret
                }

                return openAPIRequest("POST", `${config.baseUrl}/register/${data.userId}/service`, auth, null, data);
            },
            // 1. 이메일/핸드폰번호로 아이디 찾기
            // 2. 질문/답변으로 아이디 찾기
            searchUserId: function(config, data) {

                var auth = {
                    username: config.client_id,
                    password: config.client_secret
                }

                return openAPIRequest("POST", `${config.baseUrl}/register/search`, auth, null, data);
            },
            // 이메일/핸드폰번호로 비밀번호 찾기
            searchPassword: function(config, data) {

                var auth = {
                    username: config.client_id,
                    password: config.client_secret
                }

                return openAPIRequest("POST", `${config.baseUrl}/register/${data.userId}/lostpw`, auth, null, data);
            },
            // 인증코드 확인
            checkAuthCode: function(config, data) {

                var auth = {
                    username: config.client_id,
                    password: config.client_secret
                }

                return openAPIRequest("POST", `${config.baseUrl}/register/${data.userId}/checkauthcode`, auth, null, data);
            },
            // 업데이트 패스워드
            updatePassword: function(config, data) {

                var auth = {
                    username: config.client_id,
                    password: config.client_secret
                }

                return openAPIRequest("POST", `${config.baseUrl}/register/${data.userId}/resetpw`, auth, null, data);
            },
            // 회원 정보 조회
            fetchUserInfo: function(config) {
                
                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("GET", `${config.baseUrl}/user`, null, headers, null);
            },
            // 패스워드 확인
            checkPassword: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/checkpw`, null, headers, data);
            },
            // 회원 정보 수정
            modifyUserInfo: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("PUT", `${config.baseUrl}/user`, null, headers, data);
            },
            // 회원 탈퇴
            unregister: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/unregister`, null, headers, data);
            },
            // PHR 공유자 추가
            addPHRSharedUser: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }
                
                return openAPIRequest("POST", `${config.baseUrl}/user/sharedUser`, null, headers, data);
            },
            // PHR 공유자 조회
            fetchPHRSharedUserList: function(config) {
                
                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("GET", `${config.baseUrl}/user/sharedUserList`, null, headers, null);
            },
            // PHR 공유자 삭제
            removePHRSharedUser: function(config, data) {
                
                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/removeSharedUser`, null, headers, data);
            },
            // PHR 공유자 수정
            modifyPHRSharedUsers: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/modifySharedUsers`, null, headers, data);
            },
            // 업데이트 패스워드
            modifyPassword: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                };

                return openAPIRequest("POST", `${config.baseUrl}/user/modify/password`, null, headers, data);
            },
            // 관상동맥질환 예측
            coronaryArtery: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/predict/10`, null, headers, data);
            },
            // 당뇨병 질환 예측
            diabetes: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/predict/12`, null, headers, data);
            },
            // 뇌졸중 질환 예측
            stroke: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/predict/5`, null, headers, data);
            },
            // 신체나이 예측
            bodyAge: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/predict/7`, null, headers, data);
            },
            // 동맥경화성 심혈관질환(ASCVD) 예측
            ASCVD: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/predict/11`, null, headers, data);
            },
            // 10년내 당뇨병 발병 예측
            diabetesIn10Years: function(config, data) {
                
                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/predict/13`, null, headers, data);
            },
            // 10년내 심장마비 발병 예측
            heartAttackIn10Years: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/predict/14`, null, headers, data);
            },
            // 10년내 11종 암 발병 예측
            cancersIn10Years: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/predict/15`, null, headers, data);
            },
            // 사용자의 예측모델별 마지막 예측결과값 조회
            fetchLatestPredict: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("GET", `${config.baseUrl}/user/predict/${data.modelId}`, null, headers, null);
            },
            // 5년내 정맥 혈전 색전증(DVT) 발병 예측
            dvtIn5Years: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/predict/16`, null, headers, data);
            },
            // 5년내 중증도의 만성 신장 질환(CKD) 발병 예측
            ckdIn5Years: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/predict/17`, null, headers, data);
            },
            // 5년내 말기 신부전 신장 질환(ESRD) 발병 예측
            esrdIn5Years: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/predict/18`, null, headers, data);
            },
            // 10년내 골다공증 골절 발병 예측
            osteoporoticFractureIn10Years: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/predict/19`, null, headers, data);
            },
            // 10년내 고관절 골절 발병 예측
            hipFractureIn10Years: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/predict/20`, null, headers, data);
            },
            // 회원 정보 Block 생성
            createBlockchain: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/block`, null, headers, data);
            },
            // Resource 추가
            addResource: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("POST", `${config.baseUrl}/user/block/resource`, null, headers, data);
            },
            // 회원 정보 Block 수정
            updateBlockchain: function(config, data) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("PUT", `${config.baseUrl}/user/block`, null, headers, data);
            },
            // 회원 정보 Block 조회
            fetchBlockchain: function(config) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("GET", `${config.baseUrl}/user/block`, null, headers, null);
            },
            // 회원 정보 Block 삭제
            deleteBlockchain: function(config) {

                var headers = {
                    Authorization: `Bearer ${config.accessToken}`
                }

                return openAPIRequest("DELETE", `${config.baseUrl}/user/block`, null, headers, null);
            },
            // 모바일 앱 최신 버전정보 조회
            PHRApp: function(config, data) {

                var auth = {
                    username: config.client_id,
                    password: config.client_secret
                }

                return openAPIRequest("GET", `${config.baseUrl}/phrapp/${data.appSn}`, auth, null, null);
            },
            // 문자 메시지 발송
            sendSMSMsg: function(config, data) {
                const auth = {
                    username: config.client_id,
                    password: config.client_secret
                };

                return openAPIRequest("POST", `${config.baseUrl}/send/sms`, auth, null, data);
            },
            // 유저 문자 메시지 발송
            sendUserSMSMsg: function(config, data) {
                const headers = {
                    Authorization: `Bearer ${config.accessToken}`
                };

                return openAPIRequest("POST", `${config.baseUrl}/send/user/sms`, null, headers, data);
            }
        }

        const openAPIRequest = (method, url, auth, headers, data) => {
            return axios({
                method,
                url,
                auth,
                headers,
                data
            })
            .then(response => response.data)
            .catch(error => {
                throw error.response
            });
        }
    // window
    } else {
        global.OpenAPI = {
            // 회원 아이디 중복 확인
            checkExistUserId: function(config, data) {
                return openAPIXMLHttpRequest("GET", `${config.baseUrl}/register/${data.userId}/exist`, null, null, config);
            },
            // 핸드폰번호 인증(SMS)
            identifyMobilePhone: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/register/identify`, null, data, config);
            },
            // 플랫폼 약관 목록 조회
            fetchStplat: function(config) {
                return openAPIXMLHttpRequest("GET", `${config.baseUrl}/register/stplat`, null, null, config);
            },
            // 신규 회원가입
            register: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/register`, null, data, config);
            },
            // 기존 회원 서비스 가입
            registerService: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/register/${data.userId}/service`, null, data, config);
            },
            // 1. 이메일/핸드폰번호로 아이디 찾기
            // 2. 질문/답변으로 아이디 찾기
            searchUserId: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/register/search`, null, data, config);
            },
            // 이메일/핸드폰번호로 비밀번호 찾기
            searchPassword: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/register/${data.userId}/lostpw`, null, data, config);
            },
            // 인증코드 확인
            checkAuthCode: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/register/${data.userId}/checkauthcode`, null, data, config);
            },
            // 업데이트 패스워드
            updatePassword: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/register/${data.userId}/resetpw`, null, data, config);
            },
            // 회원 정보 조회
            fetchUserInfo: function(config) {
                return openAPIXMLHttpRequest("GET", `${config.baseUrl}/user`, config.accessToken, null, null);
            },
            // 패스워드 확인
            checkPassword: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/checkpw`, config.accessToken, data, null);
            },
            // 회원 정보 수정
            modifyUserInfo: function(config, data) {
                return openAPIXMLHttpRequest("PUT", `${config.baseUrl}/user`, config.accessToken, data, null);
            },
            // 회원 탈퇴
            unregister: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/unregister`, config.accessToken, data, null);
            },
            // PHR 공유자 추가
            addPHRSharedUser: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/sharedUser`, config.accessToken, data, null);
            },
            // PHR 공유자 조회
            fetchPHRSharedUserList: function(config) {
                return openAPIXMLHttpRequest("GET", `${config.baseUrl}/user/sharedUserList`, config.accessToken, null, null);
            },
            // PHR 공유자 삭제
            removePHRSharedUser: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/removeSharedUser`, config.accessToken, data, null);
            },
            // PHR 공유자 수정
            modifyPHRSharedUsers: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/modifySharedUsers`, config.accessToken, data, null);
            },
            // 업데이트 패스워드
            modifyPassword: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/modify/password`, config.accessToken, data, null);
            },
            // 관상동맥질환 예측
            coronaryArtery: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/10`, config.accessToken, data, null);
            },
            // 당뇨병 질환 예측
            diabetes: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/12`, config.accessToken, data, null);
            },
            // 뇌졸중 질환 예측
            stroke: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/5`, config.accessToken, data, null);
            },
            // 신체나이 예측
            bodyAge: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/7`, config.accessToken, data, null);
            },
            // 동맥경화성 심혈관질환(ASCVD) 예측
            ASCVD: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/11`, config.accessToken, data, null);
            },
            // 10년내 당뇨병 발병 예측
            diabetesIn10Years: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/13`, config.accessToken, data, null);
            },
            // 10년내 심장마비 발병 예측
            heartAttackIn10Years: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/14`, config.accessToken, data, null);
            },
            // 10년내 11종 암 발병 예측
            cancersIn10Years: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/15`, config.accessToken, data, null);
            },
            // 사용자의 예측모델별 마지막 예측결과값 조회
            fetchLatestPredict: function(config, data) {
                return openAPIXMLHttpRequest("GET", `${config.baseUrl}/user/predict/${data.modelId}`, config.accessToken, null, null);
            },
            // 5년내 정맥 혈전 색전증(DVT) 발병 예측
            dvtIn5Years: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/16`, config.accessToken, data, null);
            },
            // 5년내 중증도의 만성 신장 질환(CKD) 발병 예측
            ckdIn5Years: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/17`, config.accessToken, data, null);
            },
            // 5년내 말기 신부전 신장 질환(ESRD) 발병 예측
            esrdIn5Years: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/18`, config.accessToken, data, null);
            },
            // 10년내 골다공증 골절 발병 예측
            osteoporoticFractureIn10Years: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/19`, config.accessToken, data, null);
            },
            // 10년내 고관절 골절 발병 예측
            hipFractureIn10Years: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/predict/20`, config.accessToken, data, null);
            },
            // 회원 정보 Block 생성
            createBlockchain: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/block`, config.accessToken, data, null);
            },
            // Resource 추가
            addResource: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/user/block/resource`, config.accessToken, data, null);
            },
            // 회원 정보 Block 수정
            updateBlockchain: function(config, data) {
                return openAPIXMLHttpRequest("PUT", `${config.baseUrl}/user/block`, config.accessToken, data, null);
            },
            // 회원 정보 Block 조회
            fetchBlockchain: function(config) {
                return openAPIXMLHttpRequest("GET", `${config.baseUrl}/user/block`, config.accessToken, null, null);
            },
            // 회원 정보 Block 삭제
            deleteBlockchain: function(config) {
                return openAPIXMLHttpRequest("DELETE", `${config.baseUrl}/user/block`, config.accessToken, null, null);
            },
            // 모바일 앱 최신 버전정보 조회
            PHRApp: function(config, data) {
                return openAPIXMLHttpRequest("GET", `${config.baseUrl}/phrapp/${data.appSn}`, null, null, config);
            },
            // 문자 메시지 발송
            sendSMSMsg: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/send/sms`, null, data, config);
            },
            // 유저 문자 메시지 발송
            sendUserSMSMsg: function(config, data) {
                return openAPIXMLHttpRequest("POST", `${config.baseUrl}/send/user/sms`, config.accessToken, data, null);
            }
        }

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
        }
    }
}(this));