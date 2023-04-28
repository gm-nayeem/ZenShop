import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import Chart from '../../components/userChart/UserChart';
import { Link, useLocation } from "react-router-dom";
import "./user.scss";
import { useSelector } from "react-redux";
import {DEFAULT_IMG_URL} from "../../private/URL";


const User = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const user = useSelector(state => state.user.users.find(
    user => user._id === userId
  ));

  let date = new Date(user?.createdAt).getDate();
  let month = new Date(user?.createdAt).getMonth() + 1;
  const year = new Date(user?.createdAt).getFullYear();

  date = date.toString().length === 1 ? ("0" + date) : date;
  month = month.toString().length === 1 ? ("0" + month) : month;
  const fullDate = date + '.' + month + '.' + year;

  // console.log();

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">User</h1>
      </div>
      <div className="userTop">
        <div className="userLeft">
          <div className="userInfoTop">
            <img
              src={user?.img || DEFAULT_IMG_URL}
              alt=""
              className="userInfoImg"
            />
            <div className="userInfoTitle">
              <span className="username">{user?.username}</span>
            </div>
          </div>
          <div className="userInfoBottom">
            <span className="userInfoTitle">Account Details</span>
            <div className="userInfoItem">
              <PermIdentity className="userInfoIcon" />
              <span className="userInfoValue">{user?.username}</span>
            </div>
            <div className="userInfoItem">
              <CalendarToday className="userInfoIcon" />
              <span className="userInfoValue">{fullDate}</span>
            </div>
            <span className="userInfoTitle">Contact Details</span>
            <div className="userInfoItem">
              <PhoneAndroid className="userInfoIcon" />
              <span className="userInfoValue">+1 123 456 67</span>
            </div>
            <div className="userInfoItem">
              <MailOutline className="userInfoIcon" />
              <span className="userInfoValue">{user?.email}</span>
            </div>
            {/* <div className="userInfoItem">
              <LocationSearching className="userInfoIcon" />
              <span className="userInfoValue">New York | USA</span>
            </div> */}
          </div>
        </div>
        <div className="userRight">
          <Chart aspect={2.5 / 1} title="User Spending (Last 6 Months)" />
        </div>
      </div>
      <div className="userBottom"></div>
    </div>
  );
}

export default User;