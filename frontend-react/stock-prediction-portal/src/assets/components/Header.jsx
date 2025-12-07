import { useContext } from "react";
import Button from "./Button";
import { Link ,useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
const Header = () => {
	const { IsLoggedin, setIsLoggedin } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedin(false)
    console.log("logout")
    navigate('/login')
  }
	return (
		<>
			<nav className="navbar container pt-3 pb-3 align-items-start">
				<Link className="navbar-brand text-light" href="" to="/">
					Stock prediction portal
				</Link>
				{IsLoggedin ? (
					
          <button  className="btn btn-danger" onClick={handleLogout}>Logout</button>
				) : (
					<>
						<div>
							<Button text="Login" class="btn-outline-info" url="/login" />
							&nbsp;
							<Button text="Register" class="btn-info" url="/register" />
						</div>
					</>
				)}
			</nav>
		</>
	);
};
export default Header;
