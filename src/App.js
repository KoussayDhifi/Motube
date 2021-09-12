import './App.css';
import {useState,useEffect,useContext} from 'react';
import Login from './Components/Login|Register/login.jsx'
import Logout from './Components/Login|Register/logout.jsx'
import Register from './Components/Login|Register/register.jsx'
import Nav from './Components/Nav/nav.jsx'
import Upload from './Components/Upload/upload.jsx'
import {BrowserRouter as Router, Switch,Link, Route, Redirect} from "react-router-dom"
import {useHistory} from "react-router";
import {tokenContext} from './Components/Login|Register/login.jsx'
import ProtectedRoute from './Components/Protected Routes/protectedroute'
import LoginRegister from './Components/Protected Routes/protectedrouterl'
import Home from './Components/Home/home.jsx'
import VideoPage from './Components/VideoPage/videoPage.jsx'


function App() {
  let history = useHistory()
  let display=true
  const newtoken = sessionStorage.getItem("token")


  const redirect = () => {
    history.push("/logout")
  }

const [videos,setVideos] = useState([])
useEffect(()=>{
  fetch('/videos').then(res=>res.json()).then(data=>{
    setVideos(data)
  }).catch(err=>console.error(err))
},[])

console.log(`app page ${videos}`)

  return (
    <>
    <Router>
      <Nav />
      <Switch>
        <ProtectedRoute path="/upload" component={Upload}/>
        <LoginRegister path="/register" component={Register} />
        <LoginRegister path="/login"component={Login} />
        <Route path='/videos/:name' ><VideoPage videos={videos}/></Route>
        <Route render={() => {sessionStorage.removeItem("token");return(<Redirect to="/login" />)}} path="/logout"/>
        <ProtectedRoute component={Home} path="/" videos={videos}/>

      </Switch>
    </Router>
    </>
  )


}

export default App;
