import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import astralLogo from "../assets/img/astral_logo_transparent.png";
import bg from "../assets/img/astral-bg-desktop.png";
import { useNavigate } from "react-router-dom";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])
	const navigate = useNavigate();

	return (
		<div className="text-center mt-5 "
		style={{
				backgroundImage: `url(${bg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "fixed", // nice parallax on desktop
				minHeight: "100vh",            // fill screen even if content is short
				width: "100%"                  // ensure full width
				}}>
			<h1 className="display-4 text-white p-5 ">Welcome to !</h1>
			<p className="lead">
					 <img
						src={astralLogo}
						alt="Astral logo"
						className="img-fluid mx-auto d-block"
						style={{ maxHeight: "550px" }}   // caps size without breaking responsiveness
						loading="lazy"
						decoding="async"
					/>
			</p>
			<div className="p-5">
				
				<button  onClick={() => navigate("/login")} className="btn btn-dark  btn-lg">
					Get Started ! 
				</button>
  			
			</div>
		</div>
	);
}; 