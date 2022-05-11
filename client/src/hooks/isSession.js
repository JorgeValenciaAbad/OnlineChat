import React from "react";
import Cookies from 'universal-cookie'

const cookie = new Cookies()
export const isSession = () =>{
    if (cookie.get("user")==null) {
        this.props.children
    }
}
