import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import astralLogo from "../assets/img/astral_logo_transparent.png";
import bg from "../assets/img/astral-bg-desktop.png";
import { useNavigate } from "react-router-dom";

export const Features = () => {

    const navigate = useNavigate();

    return(
        <h1> Hey there i am the features page, nice. Weather huh ?  </h1>

    );

};