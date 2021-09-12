import React from 'react'
import {useParams,useHistory} from 'react-router-dom'
import {useState,useEffect} from 'react'
import './videoPage.css';
const VideoPage = ({videos}) => {
	let history = useHistory()
	let {name} = useParams()
	const [likePath,setLikePath] = useState('/like.png')
	const [dislikePath,setDislikePath] = useState('/dislike.png')
	const [liked,setLiked] = useState(false)
	const [disliked,setDisliked] = useState(false)




	let token = sessionStorage.getItem('token')
	let newStr = name.replace(/ /g, "_");
	newStr = newStr.replace(/'/g,'');

	let specefic_video = videos.find(elem=>elem.title===name);
	const [views,setViews] = useState(specefic_video.views)
	
	const [likers,setLikers] = useState(specefic_video.likers)
	let number_of_likers = likers.length
	console.log(number_of_likers)
	const handleView = (e) => {
		if (e.target.currentTime===0){
		fetch(`/view/${specefic_video.id}`,{
			method:'POST',
		headers: {
        'Authorization': "Bearer " + token,

    	},
		}).then(res=>res.json()).then(data=>setViews(data.Views)).catch(err=>console.error(err))
		}
	}


	const handleLike = () => {
		if (liked)
		{
			setLikePath('/like.png')
			setLiked(false)
		}else if (!liked)
		{
			setLiked(true)
			setLikePath('/liked.png')
			setDislikePath('/dislike.png')
			setDisliked(false)
		}


		fetch(`/like/${specefic_video.id}`,{
			method:'POST',
		headers: {
        'Authorization': "Bearer " + token,

    	},

		}).then(res=>res.json()).then(data=>setLikers(data.Likers)).catch(err=>console.error(err))


	}


	const handleDislike = () => {
		if (disliked)
		{
			setDislikePath('/dislike.png')
			setDisliked(false)
		}else if(!disliked)
		{
			setDislikePath('/disliked.png')
			setDisliked(true)
			setLikePath('/like.png')
			setLiked(false)
		}





	}









	return (
		<>
		<video width="500" height="300" controls onPlay={handleView}>
  			<source src={`/Videos/${newStr}`} type="video/mp4"/>


		</video>
		<h2>{name}</h2>
		<h3>{specefic_video.poster_id}</h3>
		<h4>Description:</h4>
		<h5>{specefic_video.description}</h5>
		<small>Views: {views}</small><br/>
		<img src={likePath} className='like'onClick={handleLike}/><img src={dislikePath} className='dislike' onClick={handleDislike}/><br/>
		<small className='likes'>{number_of_likers}</small><small className='dilikes'>9</small>
		<br/>
		<br />
		<input type='text' placeholder='Write a comment' height='50px' width='100px' />
		</>
	)


}

export default VideoPage
