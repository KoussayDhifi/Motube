import React from 'react'
import {Redirect,Route} from "react-router-dom"

const LoginRegister = ({component:Component},{path}) => {
	const newToken = sessionStorage.getItem("token")
	return (
		<Route render={
			(props) => {
				if (newToken != null || newToken){
				return <Redirect to="/" />
				}else{
					return <Component {...props}/> 
				}
			}
		} exact path={path}/>


	)

}

export default LoginRegister