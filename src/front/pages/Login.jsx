import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import astralLogo from "../assets/img/astral_logo_transparent.png";
import bg from "../assets/img/astral-bg-desktop.png";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();
    const [ form , setform ]=  React.useState({email:"", Password :"" , remember: false });

    const onChange =(e) =>{
        e.preventDefault();
         
        navigate ("/") // on success 
    }

    return(
         <div
      className="d-flex align-items-center justify-content-center min-vh-100 px-3"
      style={{
        // space background + subtle overlay
        backgroundImage: `linear-gradient(rgba(26,18,49,0.55), rgba(26,18,49,0.55)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // remove on mobile if scroll feels janky
      }}
    >
            <form>
                 <img
                    src={astralLogo}
                    alt="Astral"
                    className="img-fluid mx-auto d-block mb-3"
                    style={{ maxHeight: 500 }}
                    loading="lazy"
                    decoding="async"
                />

                <h1 className=" h4 mb-3 text-center text-white">
                    Please Log in 
                </h1>
                <div className="text-center ">
                    <label className=" form-lable text-white m-3"> Email </label>
                    <input
                    id="loginEmail "
                    name="email"
                    type="email"
                    className=" form-control"
                    placeholder="JohnDoe@email.com"
                    required
                    />
                </div>

            </form>
        </div>

    );

};