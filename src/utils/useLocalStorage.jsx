import { useState } from "react";

export const store = (keyName, defaultValue) => {
    try {
        const value = window.localStorage.getItem(keyName);
        if (value) {
            return JSON.parse(value);
        } else {
            window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
            return defaultValue;
        }
    } catch (err) {
        return defaultValue;
    }
}
 export const get = (keyName) => {
    try {
        const value = window.localStorage.getItem(keyName);
        return value ? JSON.parse(value) : null;
    } catch (err) {
        alert(err);
        return null;
    }
}

 export const remove = (keyName) => {
    try {
        window.localStorage.removeItem(keyName);
        return null;
    } catch (err) {
        alert(err);
        return null;
    }
}