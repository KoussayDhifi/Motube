import React from "react"
import {useHistory} from "react-router"


const Logout = () => {
	let history = useHistory()

	return (
		<>
			{
				() => {
					return(
					sessionStorage.removeItem("token"),
					history.push("/login")
					)
				}

			}

		</>
	)

}
export default Logout