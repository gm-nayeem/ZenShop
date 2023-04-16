import Card from "../card/Card";
import "./featuredProducts.scss";
import useFetch from "../../hooks/useFetch";
import {allProduct} from "../../utils/dummyData"
import { useEffect, useState } from "react";

const FeaturedProducts = ({ type }) => {
    // const { data, loading, error } = useFetch(
    //     `/products?populate=*&[filters][type][$eq]=${type}`
    // );

    const [data, setData] = useState([]);
    useEffect(() => {
        setData(allProduct);
    }, []);

    return (
        <div className="featuredProducts">
            <div className="top">
                <h1>{type} products</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
                    suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
                    lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
                    suspendisse ultrices gravida. Risus commodo viverra maecenas.
                </p>
            </div>
            <div className="bottom">
                {
                    data?.map((item) => <Card item={item} key={item.id} />)
                }
            </div>
        </div>
    );
};

export default FeaturedProducts;