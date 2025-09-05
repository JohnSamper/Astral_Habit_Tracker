import { Link } from "react-router-dom";
import astroman from "../assets/img/astroman.png";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
	
	const navigate = useNavigate();

	return (
		<nav className=" nav navbar navbar-dark">
			<div className="container-fluid ps-5">
				<Link to="/">
				   	<img
					src={astroman}
					alt="Astral Logo "
					className="navbar-brand d-inline-block align-top" 
					style={{ height: "100px" }}


					/>
				</Link>
					<div className=" text-white text-center">
						
						<button  onClick={() => navigate("/AboutUs")} className="btn text-white fs-4"> About Us </button>

						<span className="mx-2 fs-3 ">||</span>

						<button  onClick={() => navigate("/Pricing")} className="btn text-white fs-4"> Pricing </button>

						<span className="mx-2 fs-3 ">||</span>

						<button  onClick={() => navigate("/Features")} className="btn  text-white fs-4"> Features  </button>
					</div>
					<div className=" pe-4">

						<Link to="/signup">
							<button className="btn btn-primary m-3"> Signup </button>
						</Link>

						<Link to="/Login">
							<button className="btn btn-primary"> Login </button>
						</Link>
					</div>
			</div>
		</nav>
	);
};