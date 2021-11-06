import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import Profile from './components/profile'
import Home from  './components/home'
import Messages from './components/messages'
import Login from './components/Login'
import SignIn from './components/SignIn'
import Navbar from "./navbar";
import Footer from "./components/footer"



class App extends React.Component {
    render() {
    
        console.log((window.location.pathname!="/login"))
        console.log((window.location.pathname!="/SignIn"))
        return(<div>
                <Navbar/>
            <main>
                <Router>    
                    <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/messages" component={Messages}/>
                    <Route path="/signIn" component={SignIn}/>
                    <Route path="/login" component={Login}/>

                    </Switch>   
                </Router>
            </main>
               <Footer/>
               </div>
        )
    }
}

export default App