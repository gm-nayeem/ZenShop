import React, { useState } from "react";
import "./navbar.scss";
import {
    KeyboardArrowDown, FavoriteBorderOutlined, 
    ShoppingCartOutlined, ArrowDropDown
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import BDIMG from "../../assets/bd.webp";
import Cart from "../cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userReducer";
import useFetch from '../../hooks/useFetch';
const DEFAULT_IMG_URL = "https://i.ibb.co/MBtjqXQ/no-avatar.gif";


const Navbar = ({ user }) => {
    const products = useSelector((state) => state?.cart?.products);
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false);
    const [catShow, setCatShow] = useState(false);

    const {
        data, loading, error
    } = useFetch('/categories/all');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // logout
    const handleLogout = () => {
        dispatch(logout());
        setShow(!show);
        navigate('/');
    }

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="left">
                    <div className="item">
                        <img 
                            src={BDIMG} 
                            alt="" 
                            className="flag"
                        />
                        <KeyboardArrowDown />
                    </div>
                    <div className="item">
                        <Link className="link" to="/">Dashboard</Link>
                    </div>
                    <div className="item">
                        <span>Categoreis</span>
                        <KeyboardArrowDown
                            className="icon"
                            onClick={() => setCatShow(!catShow)}
                        />
                        {
                            catShow && (
                                <div className="categories">
                                    <ul onClick={() => setCatShow(!catShow)}>
                                        {
                                            loading ? (
                                                "Loading..."
                                            ) : error ? (
                                                'Something went wrong!'
                                            ) : (
                                                data && data.map(cat => (
                                                    <Link
                                                        key={cat?._id}
                                                        to={`/products/${cat.title}`}
                                                        className="link"
                                                    >
                                                        <li style={{textTransform: "capitalize"}}>{cat?.title}</li>
                                                    </Link>
                                                ))
                                            )
                                        }
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="center">
                    <Link className="link" to="/">ZenShop</Link>
                </div>
                <div className="right">
                    <div className="item">
                        <Link className="link" to="/about">About</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/contact">Contact</Link>
                    </div>
                    <div className="icons">
                        <FavoriteBorderOutlined className="icon" />
                        <div className="cartIcon" onClick={() => setOpen(!open)}>
                            <ShoppingCartOutlined className="icon" />
                            {
                                user ? (
                                    <span>{products?.length}</span>
                                ) : (
                                    <span>0</span>
                                )
                            }
                        </div>
                    </div>
                    <div className="profileImg">
                        <img
                            src={user?.profilePic || DEFAULT_IMG_URL}
                            alt=""
                        />
                    </div>
                    <div className={show ? "profile show" : "profile"}>
                        <ArrowDropDown
                            className="icon"
                            onClick={() => setShow(!show)}
                        />
                        <div className="options">
                            {
                                !user ? (
                                    <>
                                        <Link to='/login' className="link">
                                            <span onClick={() => setShow(!show)}>Login</span>
                                        </Link>
                                        <Link to='/register' className="link">
                                            <span onClick={() => setShow(!show)}>Register</span>
                                        </Link>
                                    </>

                                ) : (
                                    <>
                                        <Link to={`/profile/${user?._id}`} className="link">
                                            <span onClick={() => setShow(!show)}>Profile</span>
                                        </Link>
                                        <span onClick={handleLogout}>
                                            Logout
                                        </span>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {open && <Cart />}
        </div>
    );
};

export default Navbar;