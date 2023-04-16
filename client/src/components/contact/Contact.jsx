import React, { useState } from "react";
import "./contact.scss";
import {
    Facebook, Instagram, Twitter, Google, Pinterest
} from "@mui/icons-material";


const Contact = () => {
    const [mail, setMail] = useState("");

    const handleMail = (e) => {
        e.preventDefault();

        console.log(mail);

        setMail("");
    };

    return (
        <div className="contact">
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

export default Contact;