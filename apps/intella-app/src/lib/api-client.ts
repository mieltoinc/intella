import axios from "axios"

import { IndexObjectType, OptionsType, IndexFunctionType } from "../types";
import urljoin from "url-join"
import { BACKEND_API } from "@/config";


export const request = axios.create({
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
})

// Add request interceptor to add platform ID header
request.interceptors.request.use(
    function (config) {
        // Skip adding platform ID for auth-related endpoints
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const gateways: IndexObjectType = {
    backend: {
        name: "backend",
        endpoint: BACKEND_API
    }
}

request.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error?.response?.status == 401 || error?.response?.status == 403) {

            try {
                return Promise.reject(error)
            } catch (e) {
                return Promise.reject(error)
            }

            return;
        } else if (error?.response?.status == 504) {
            return Promise.reject({ response: { data: { message: "Request failed due to network, please try again" } } });
        } else if (error?.response?.status == 500) {
            return Promise.reject(error);
        } else {
            return Promise.reject(error);
        }
    }
);



export const API = {
    post: (base: string, path: string, options?: OptionsType) => APIUtil("post", base, path, options),
    put: (base: string, path: string, options?: OptionsType) => APIUtil("put", base, path, options),
    get: (base: string, path: string, options?: OptionsType) => APIUtil("get", base, path, options),
    patch: (base: string, path: string, options?: OptionsType) => APIUtil("patch", base, path, options),
    del: (base: string, path: string, options?: OptionsType) => APIUtil("delete", base, path, options)
};

export const APIUtil = async (method: string, base: string, path: string, options: OptionsType = {}) => {

    let baseUrl = gateways[base]?.endpoint;


    baseUrl = urljoin(baseUrl, path);

    const methods: IndexFunctionType = {
        get: request.get,
        post: request.post,
        put: request.put,
        patch: request.patch,
        delete: request.delete,
    };

    const response =
        method == "get"
            ? await methods[method](baseUrl, options)
            : await methods[method](baseUrl, options.body, options);
    return response?.data;

};
