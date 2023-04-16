import React from "react";
import "./categories.scss";
import { Link } from "react-router-dom";

const Categories = () => {
    const categoryImages = {
        col1: {
            row1: "https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1600",
            row2: "https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=1600"
        },
        col2: {
            row1: "https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg?auto=compress&cs=tinysrgb&w=1600"
        },
        col3: {
            row1: {
                col1: "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1600",
                col2: "https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1600"
            },
            row2: "https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=1600"
        }
    }

    const {col1, col2, col3} = categoryImages;

    return (
        <div className="categories">
            <div className="col">
                <div className="row">
                    <img
                        src={col1.row1}
                        alt=""
                    />
                    <button>
                        <Link className="link" to="/products/1">
                            Sale
                        </Link>
                    </button>
                </div>
                <div className="row">
                    <img
                        src={col1.row2}
                        alt=""
                    />
                    <button>
                        <Link to="/products/1" className="link">
                            Women
                        </Link>
                    </button>
                </div>
            </div>
            <div className="col">
                <div className="row">
                    {" "}
                    <img
                        src={col2.row1}
                        alt=""
                    />
                    <button>
                        <Link to="/products/1" className="link">
                            New Season
                        </Link>
                    </button>
                </div>
            </div>
            <div className="col col-l">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <img
                                src={col3.row1.col1}
                                alt=""
                            />
                            <button>
                                <Link to="/products/2" className="link">
                                    Men
                                </Link>
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            {" "}
                            <img
                                src={col3.row1.col2}
                                alt=""
                            />
                            <button>
                                <Link to="/products/1" className="link">
                                    Accessories
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <img
                        src={col3.row2}
                        alt=""
                    />
                    <button>
                        <Link to="/products/1" className="link">
                            Shoes
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Categories;