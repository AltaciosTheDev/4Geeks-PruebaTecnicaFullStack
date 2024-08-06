import React from "react";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";


export const Navbar = () => {
	const location = useLocation();
	const params = useParams()
	const { id } = params;
    const excludePaths = ["/dashboard","/learn","/history","/profile",`/favorites`,"/login", "/signup"]; //insert in this array other paths where navbar is not wanted.
    const shouldExcludeNavbar = excludePaths.includes(location.pathname);
	const isSinglePage  = location.pathname.startsWith("/single/");
	
    if (shouldExcludeNavbar || isSinglePage) {
        return null; // Don't render anything if the current path is included in excludePaths
    }

	return (
		<nav className="navbar navbar-expand-lg bg-navbar  border-body" data-bs-theme="dark">
			<div className="container-fluid ">
				<Link to="/" className="decoration" >
					{/* <span className="navbar-brand sidebar-link text-logo">SkillSwap</span> */}
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse " id="navbarSupportedContent">
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						{/* <li className="nav-item">
							<Link to="/dashboard" className="decoration">	
								<span className="nav-link" aria-current="page">Dashboard</span>
							</Link>
						</li> */}
						<li className="nav-item">
							<Link to="/howitworks" className="decoration">
								<span className="nav-link">How it works</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/pricing" className="decoration">	
								<span className="nav-link" aria-current="page">Prices</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/testimonials" className="decoration">	
								<span className="nav-link" aria-current="page">Testimonials</span>
							</Link>
						</li>
						<li className="nav-item login-link">
							<Link to="/login" className="decoration">	
								<span className="nav-link text-success login-link" aria-current="page">Login <i class="fa-solid fa-user-plus login-link"></i></span>
							</Link>
						</li>
						{ 
						/* <li className="nav-item">
							<Link to="/form" className="decoration">	
								<span className="nav-link sidebar-link" aria-current="page">Sign up</span>
							</Link>
						</li> */}
					</ul>
				</div>
			</div>
		</nav>
	);
};