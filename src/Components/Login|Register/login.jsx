import React from 'react';
import './style.css'
import {useState,createContext} from "react"
import {useHistory} from "react-router"
export const tokenContext = createContext(null)
const Login = () => {
	const [color,setColor] = useState("black")
	const [loginInput,setLoginInput] = useState("")
	const [passwordInput,setPasswordInput] = useState("")
	const [error,setError] = useState("")
	const [token,setToken] = useState('')

	let history = useHistory()

	const changeColor = () => {
		if (color == "black")
		{
		setColor("#FAF7FF");
		}else
		{
			setColor("black")
		}
	}

	let style = {
		border:color
	}



	const handleInputChange = (event) => {
		let b = event.target.value
		setLoginInput(b)

	}

	const handlePasswordChange = (event) => {
		let b = event.target.value
		setPasswordInput(b)
	}


	const Login = (event) => {
		event.preventDefault()
		fetch('/login',{
			method:'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email:loginInput,
				password:passwordInput
			})
			
		}).then(res=>res.json()).then(data=>{
			if (data.Error=="User Not found"){
			setError(data.Error)
			
		}else{
			sessionStorage.setItem("token",data.Token)
			history.push("/")
			setToken(data.Token)
			}

		})
		setLoginInput("")
		setPasswordInput("")

	}


	return (
		<>
			<form onSubmit={Login}>
				
				<label for="email">Email: </label><br />
				<input type="text" id="email" style={style} onChange={handleInputChange} onClick={changeColor} value={loginInput}/><br/>
				<label for="password">Password: </label> <br />
				<input type="password" id="password" onChange={handlePasswordChange} value={passwordInput} style={style} onClick={changeColor}/>	<br />		
				<input type="submit" value="Login"/>
				<p>{error}</p>
				
			</form>
		</>

	)
}

export default Login;
