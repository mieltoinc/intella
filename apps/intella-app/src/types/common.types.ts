import React from "react";

export type IndexObjectType = {
    [key: string]: Record<string, any>
}


export type OptionsType = {
    body?: {},
    headers?: {},
    params?: {},
    auth?: {}
}


export type IndexFunctionType = {
    [key: string]: Function
}

export type InitialState = {
    isLoading: boolean;
    isPageReady: boolean;
    store?: any;
    storeDispatch?: React.Dispatch<any> | Function;
}


export type ContextProps = {
    children: React.ReactNode
}
