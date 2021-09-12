import './upload.css'
import {useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {axios} from "axios"

const Upload = () => {
	const [title,setTitle] = useState('')
	const [textArea,setTextArea] = useState('')
	const axios = require('axios');
	const [isFileSelected,setIsFileSelected] = useState(false)
	const [selectedFile,setSelectedFile] = useState()
	let history = useHistory()
	const onTitleChange = (event) => {
		let b =event.target.value;
		setTitle(b)
	}	

	const onTextAreaChange = (event) => {
		let b = event.target.value
		setTextArea(b)
	}

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0])
		setIsFileSelected(true)
	}



	const upload_file = (e) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('file',selectedFile)
		formData.append('title',title)
		formData.append('description',textArea)
		console.log(formData)
		let token = sessionStorage.getItem('token')
		fetch('/releaseVideo',{
			method:'POST',
			    headers: {
        'Authorization': "Bearer " + token,

    	},
			body:formData
		}).then(res=>res.json()).then((data)=>console.log(data)).catch(err => console.error(err))
	

		history.push('/')


	}







	return (
		<>
			<form onSubmit={upload_file}>
				<label>Title: </label><br />
				<input type="text" onChange={onTitleChange} value={title}/><br />
				<label>Description:</label><br />
				<textarea value={textArea} onChange={onTextAreaChange}></textarea>
				<input type="file" id="file" onChange={handleFileChange}/>
				<input type="submit" value="Upload Video!" />

			</form>
		</>
	)
}

export default Upload;