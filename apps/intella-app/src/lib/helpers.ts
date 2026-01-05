import Cookies from "js-cookie";
import { SESSION_DELTA } from "../config";

export const setToken = (token: string) => {
    const expiryTime = new Date(new Date().getTime() + parseInt(SESSION_DELTA) * 60 * 1000);

    // Use secure cookies for ngrok (HTTPS) but allow for localhost development
    const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
    Cookies.set("token", token, { 
        expires: expiryTime,
        secure: isSecure,
        sameSite: 'lax'
    });
};

export const setRefreshToken = (refreshToken: string) => {
    // Refresh tokens typically have longer expiry
    const expiryTime = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

    const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
    Cookies.set("refresh_token", refreshToken, { 
        expires: expiryTime,
        secure: isSecure,
        sameSite: 'lax',
        httpOnly: false // Can't set httpOnly from client-side
    });
};

export const getCurrentSessionTokens = () => {
    const token = Cookies.get("token");
    const refreshToken = Cookies.get("refresh_token");
    return {
        token,
        refreshToken,
    };
};

export const getToken = () => {
    const token = Cookies.get("token");
    return token;
};

export const saveCurrentSession = async (data = {}) => {
    Cookies.remove("currentSession");
    const expiryTime = new Date(new Date().getTime() + parseInt(SESSION_DELTA) * 60 * 1000);

    const _data = btoa(JSON.stringify(data));
    const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
    Cookies.set("currentSession", _data, { 
        expires: expiryTime,
        secure: isSecure,
        sameSite: 'lax'
    });
    sessionStorage.setItem("currentSession", _data);
};

export const setCurrentSessionCookies = (data: Record<string, any>) => Cookies.set("currentSession", btoa(JSON.stringify(data)));

export const getCurrentSessionCookies = () => {
    const cookies = Cookies.get("currentSession")
    if (cookies) {
        return JSON.parse(atob(cookies));
    }
    return null
}

export const removeAllCookies = () => {
    Cookies.remove("token");
    Cookies.remove("refresh_token");
    Cookies.remove("currentSession");
    sessionStorage.removeItem("currentSession");
}

