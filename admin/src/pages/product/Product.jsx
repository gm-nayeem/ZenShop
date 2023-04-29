import { useParams } from "react-router-dom";
import "./product.scss";
import Chart from "../../components/productChart/ProductChart";
import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { userRequest } from "../../utils/makeRequest";
import ProductUpdate from "../../components/productUpdate/ProductUpdate";


const Product = () => {
    const [pStats, setPStats] = useState([]);
    const productId = useParams().productId;

    const product = useSelector(state => state.product.products.find(
        product => product._id === productId
    ));

    const MONTHS = useMemo(() => (
        [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ]
    ), []);

    // set product stats
    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("/orders/income?pid=" + productId);
                const list = res.data.sort((a, b) => {
                    return (
                        a._id - b._id
                    )
                });
                list.map(item =>
                    setPStats(prev => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total }
                    ])
                );
            } catch (err) {
                console.log(err.message);
            }
        }
        getStats();
    }, [productId, MONTHS]);


    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart
                        data={pStats}
                        title="Sales Performance"
                        dataKey="Sales"
                    />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product?.img} alt="" className="productInfoImg" />
                        <span className="productName">{product?.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey" style={{ marginRight: "30px" }}>Id:</span>
                            <span className="productInfoValue">{product?._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Sales:</span>
                            <span className="productInfoValue">${product?.price}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">In stock:</span>
                            <span className="productInfoValue">
                                {product?.inStock ? "Stocked" : "Out of stock"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <ProductUpdate product={product} />
            </div>
        </div>
    );
}

export default Product;