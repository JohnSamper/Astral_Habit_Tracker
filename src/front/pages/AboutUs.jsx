import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import astralLogo from "../assets/img/astral_logo_transparent.png";
import bg from "../assets/img/astral-bg-desktop.png";
import { useNavigate } from "react-router-dom";

export const AboutUs = () => {

    const navigate = useNavigate();

    return(
        <h1>yooooo. i. am the About us page :)  </h1>

    );

};