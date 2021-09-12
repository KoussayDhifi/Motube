import React from 'react'
import {Route,Redirect} from 'react-router-dom'


const ProtectedRoute = ({component:Component,path,...rest}) => {
	const newToken = sessionStorage.getItem("token")
	return (
		<Route {...rest} render={
			(props) => {
				if (newToken != null || newToken){
				return <Component {...props} {...rest}/>
				}else{
					return <Redirect to={{pathname:"/login"}} />
				}
			}
		} exact path={path}/>


	)


}

export default ProtectedRoute;