import './upload.css'
import {useState,useContext} from 'react'


const Upload = () => {
	const [title,setTitle] = useState('')
	const [textArea,setTextArea] = useState('')


	const onTitleChange = (event) => {
		let b =event.target.value;
		setTitle(b)
	}	

	const onTextAreaChange = (event) => {
		let b = event.target.value
		setTextArea(b)
	}


	return (
		<>
			<form>
				<label>Title: </label><br />
				<input type="text" onChange={onTitleChange} value={title}/><br />
				<label>Description:</label><br />
				<textarea value={textArea} onChange={onTextAreaChange}></textarea>
				<input type="file"/>
				<input type="submit" value="Upload Video!" />

			</form>
		</>
	)
}

export default Upload;