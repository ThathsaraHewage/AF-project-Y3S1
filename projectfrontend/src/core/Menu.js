import React , {Fragment} from 'react'
import {Link, withRouter} from "react-router-dom"
import { signout, isAutheticated } from '../auth/helper'


const currentTab = (history,path) => {
    if (history.location.pathname === path) {
        return {color : "#2ecc72"}
    }else{
        return {color : "#FFFFFF"}
        
    }
}

const Menu = ({history}) => (
    <div className="container">
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link style={currentTab(history,"/")} className="nav-link" to="/">
                    Home
                </Link>
            </li>

            {isAutheticated() && isAutheticated().user.role === 0 && (
                <li className="nav-item">
                <Link style={currentTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">
                    Dash Board
                </Link>
                </li>
            )}

{isAutheticated() && isAutheticated().user.role === 1 && (
                <li className="nav-item">
                <Link style={currentTab(history,"/reviewer/dashboard")} className="nav-link" to="/reviewer/dashboard">
                    Reviewer Dash Board
                </Link>
                </li>
            )}
            {isAutheticated() && isAutheticated().user.role === 2 && (
                <li className="nav-item">
                <Link style={currentTab(history,"/editor/dashboard")} className="nav-link" to="/editor/dashboard">
                    Editor Dash Board
                </Link>
                </li>
            )}
            {isAutheticated() && isAutheticated().user.role === 3 && (
                <li className="nav-item">
                <Link style={currentTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                    Admin Dash Board
                </Link>
                </li>
            )}


            {!isAutheticated() && (
                <Fragment>
                <li className="nav-item">
                    <Link style={currentTab(history,"/signup")} className="nav-link" to="/signup">
                        SignUp
                    </Link>
                </li>
    
                <li className="nav-item" >
                    <Link style={currentTab(history,"/signin")} className="nav-link" to="/signin">
                        SignIn
                    </Link>
                </li>
                </Fragment>
            )}


            {isAutheticated() && (
                <li className="nav-item">
                <span
                className="nav-link text-warning"
                onClick={ () => {
                    signout(() => {
                        history.push("/");
                    })
                }}>
                    Signout
                </span>
            </li>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);
