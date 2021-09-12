import ReactPlayer from 'react-player'
import {BroswerRouter as Router , Switch, Link} from 'react-router-dom'
import {useEffect,useState,useContext} from 'react'
import React from 'react'



const Home = ({videos}) => {


	console.log(videos)



	return (
		<>


			{


				videos.map((d)=>{
					return(

						<table>
							<tr>
								<td>
									<Link to={{pathname:`/Videos/${d.title}`}}>{d.title}</Link>
								</td>
							</tr>

						</table>

					)
				})

			}



		</>
	)
}

export default Home
