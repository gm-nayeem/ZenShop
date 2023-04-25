import React, { useState } from "react";
import {
    KeyboardArrowDown, PersonOutlineOutlined,
    FavoriteBorderOutlined, Search, ShoppingCartOutlined
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./navbar.scss";
import enImage from "../../assets/en.png";
import Cart from "../cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userReducer";

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const products = useSelector((state) => state?.cart?.products);
    const dispatch = useDispatch();

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="left">
                    <div className="item">
                        <img src={enImage} alt="" />
                        <KeyboardArrowDown />
                    </div>
                    <div className="item">
                        <span>USD</span>
                        <KeyboardArrowDown />
                    </div>
                    <div className="item">
                        <Link className="link" to="/products/1">Women</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/products/2">Men</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/products/3">Children</Link>
                    </div>
                </div>
                <div className="center">
                    <Link className="link" to="/">ZENSHOP</Link>
                </div>
                <div className="right">
                    <div className="item">
                        <Link className="link" to="/">Homepage</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/">About</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/contact">Contact</Link>
                    </div>
                    <div className="item">
                        <Link 
                            className="link" to="/"
                            onClick={()=> dispatch(logout())}
                        >
                            Logout
                        </Link>
                    </div>
                    <div className="icons">
                        <Search />
                        <PersonOutlineOutlined />
                        <FavoriteBorderOutlined />
                        <div className="cartIcon" onClick={() => setOpen(!open)}>
                            <ShoppingCartOutlined />
                            <span>{products?.length}</span>
                        </div>
                    </div>
                </div>
            </div>
            {open && <Cart />}
        </div>
    );
};

export default Navbar;