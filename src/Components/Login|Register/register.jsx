import React from 'react'
import {useState} from 'react'

const Register = () => {

	const [name,setName] = useState("")
	const [email,setEmail] = useState("")	
	const [password,setPassword] = useState("")	
	const [remark,setRemark] = useState("")

	const handleNameChange = (event) => {
		let b = event.target.value
		setName(b)
	}

	const handleEmailChange = (event) => {
		let b = event.target.value
		setEmail(b)
	}
	const handlePasswordChange = (event) => {
		let b = event.target.value
		setPassword(b)
	}


	const onFormSubmit = (event) => {
		event.preventDefault()
		fetch("/create",{
			method:'POST',
			body:JSON.stringify({
				name:name,
				email:email,
				password:password
			})
		}).then(res=> res.json()).then(msg=>setRemark(msg.msg))

		setName("")
		setEmail("")
		setPassword("")
	}




	return (
		<>
			<form onSubmit={onFormSubmit}>
				<label for="username">Name: </label><br />
				<input type="text" id="username" required onChange={handleNameChange} value={name}/><br />
				<label for="email">Email: </label><br />
				<input type="email" id="email" required onChange={handleEmailChange} value={email}/><br />
				<label for="password">Password: </label><br />
				<input type="password" id="password" required onChange={handlePasswordChange} value={password}/><br />
				<input type="submit" />
				<p>{remark}</p>
			</form>
		</>

	)
}

export default Register;