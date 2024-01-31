import Cookies from "js-cookie";
import moment from "moment";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { api } from "./api";

export function validateToken() {
        let accessToken = Cookies.get("accessToken");
        let refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            return false;
        }
    
        let accessTokenExpireTime;
    
        try {
            //extracting the token's expiry time with jwt_decode
            accessTokenExpireTime = jwt_decode(accessToken).exp;
        } catch (error) {
            return false;
        }
    
        if (moment.unix(accessTokenExpireTime) - moment(Date.now()) < 10000) {
            //generating new accessToken
            let refreshTokenExpireTime;
    
            try {
                refreshTokenExpireTime = jwt_decode(refreshToken).exp;
            } catch (error) {
                return false;
            }
    
            if (moment.unix(refreshTokenExpireTime) - moment(Date.now()) > 10000) {
                new Promise((resolve, reject) => {
                    api.post("auth/refresh", { refresh: refreshToken }).then(
                        (res) => {
                            if (!res?.data?.access) {
                                //the execution will never reach in this block, and if it did, it could be some backend issue.
                                console.log("refresh token is gone");
                                return false;
                            } else {
                                //refreshed the access token
                                console.log("refreshed");
                                const { access } = res?.data;
                                Cookies.set("accessToken", access);
                                resolve(access);
                            }
                        }
                    );
                });
            } else {
                //refreshToken expired
                Cookies.remove("accessToken");
                localStorage.removeItem("refreshToken");
                console.log("logged out");
                console.log("Token expired")
               
                return false;
            }
            return true;
        }
        return true;
    }