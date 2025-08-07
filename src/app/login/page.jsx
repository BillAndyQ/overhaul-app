"use client"
import React from "react"
import Login from "@/components/Login.jsx"

import { ENDPOINT_API, PATH_FRONT } from "@/utils/endpoints"

export default function Page(){
    return(
        <div>
            <Login urlAuth={ENDPOINT_API.login} urlRedirect={PATH_FRONT.ot_equipos?.url}></Login>
        </div>
    )
}