import './navstyle.css'
import {Switch,Link} from 'react-router-dom'

const Nav = () => {
	const newToken = sessionStorage.getItem("token")


	return(
		<>
			
				
					
						<ul>
						
					
					<li><Link to="/login">Login</Link></li>
					<li><Link to="/register">Register</Link></li>
					<li><Link to="/">Home</Link></li>
					<li><input type="text" /> <input type="submit" value="Search" /></li>
					<li><Link to="/upload">Upload video</Link></li>
					<li><Link to="/logout">Logout</Link></li>
					
						</ul>
					
			
		</>
	)
}

export default Nav;