import React from "react";
import "./list.scss";
import Card from "../card/Card";
import useFetch from "../../hooks/useFetch";


const List = ({ subCats, maxPrice, sort, category }) => {
    const { data, loading, error } = useFetch(
        `/products/all?category=${category}${subCats.map(
            item => `&subCat=${item}`
        )}&maxPrice=${maxPrice}&sort=${sort}`
    );

    return (
        <>
            {
                loading ? (
                    "Please wait..."
                ) : error ? (
                    "Something went wrong"
                ) : (
                    <div className="list">
                        {
                            data && data.map(item => <Card item={item} key={item._id} />)
                        }
                    </div>
                )
            }
        </>
    );
};

export default List;