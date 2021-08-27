import React from 'react'
import {Route,Redirect} from 'react-router-dom'


const ProtectedRoute = ({component:Component},{path}) => {
	const newToken = sessionStorage.getItem("token")
	return (
		<Route render={
			(props) => {
				if (newToken != null || newToken){
				return <Component {...props}/>
				}else{
					return <Redirect to={{pathname:"/login"}} />
				}
			}
		} exact path={path}/>


	)


}

export default ProtectedRoute;