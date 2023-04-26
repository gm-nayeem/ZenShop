import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../utils/makeRequest"

export default function WidgetSm() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await userRequest.get("/users?new=true");
                setUsers(res.data);
            } catch (err) {
                console.log(err.message)
            }
        }
        getUsers();
    }, []);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {
                    users.map(user => {
                        return (
                            <li className="widgetSmListItem" >
                                <img
                                    src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                                    alt=""
                                    className="widgetSmImg"
                                />
                                <div className="widgetSmUser">
                                    <span className="widgetSmUsername">{user.username}</span>
                                </div>
                                <button className="widgetSmButton">
                                    <Visibility className="widgetSmIcon" />
                                    Display
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}