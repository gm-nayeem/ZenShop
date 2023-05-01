import React from "react";
import "./topbar.scss";
import { 
  NotificationsNone, Language, 
  Settings, Lock 
} from "@mui/icons-material";
import {useDispatch} from 'react-redux'
import {logout} from "../../redux/userReducer";
import {Link} from 'react-router-dom';


const Navbar = () => {
  const dispatch = useDispatch();

  // handle logout
  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div className='topbar'>
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to={"/"} className="link">
          <span className="logo">ZenShop</span>
          </Link>
        </div>
        
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="topbarIconContainer"
            onClick={handleLogout}
          >
            <Lock />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  )
}

export default Navbar