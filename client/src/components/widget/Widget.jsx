import React, { useState } from "react";
import "./widget.scss";
import {
    Facebook, Instagram, Twitter, Google, Pinterest
} from "@mui/icons-material";


const Widget = () => {
    const [mail, setMail] = useState("");

    const handleMail = (e) => {
        e.preventDefault();

        console.log(mail);

        setMail("");
    };

    return (
        <div className="widget">
            <div className="wrapper">
                <span>BE IN TOUCH WITH US:</span>
                <div className="mail">
                    <input type="text" value={mail}
                        placeholder="Enter your email..." 
                        onChange={(e)=> setMail(e.target.value)}
                    />
                    <button onClick={handleMail}>JOIN US</button>
                </div>
                <div className="icons">
                    <Facebook />
                    <Instagram />
                    <Twitter />
                    <Google />
                    <Pinterest />
                </div>
            </div>
        </div>
    );
};

export default Widget;