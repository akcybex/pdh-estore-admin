import React, { Component,Fragment } from 'react'
import {Link} from 'react-router-dom'
import ls from 'local-storage'
//images import
import man from '../../../assets/images/dashboard/man.png'
export class User_menu extends Component {

    _logOut = () => {
        ls.remove('user');
        ls.remove('skills');
        window.location.replace('/');
        console.log('logout')
    }
    render() {
        return (
            <Fragment>
                    <li className="onhover-dropdown">
                        <div className="media align-items-center">
                            <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={man} alt="header-user" />
                            <div className="dotted-animation"><span className="animate-circle"></span><span className="main-circle"></span></div>
                        </div>
                        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                            {/* <li><Link to={"/settings/profile"} ><i data-feather="user"></i>Edit Profile</Link></li>
                            <li><a href="javascript:void(0)"><i data-feather="settings"></i>Settings</a></li> */}
                            <li><Link onClick={this._logOut}><i data-feather="log-out"></i>Logout</Link></li>
                        </ul>
                    </li>
            </Fragment>
        )
    }
}

export default User_menu
