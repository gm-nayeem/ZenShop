import Card from "../card/Card";
import "./featuredProducts.scss";
import useFetch from "../../hooks/useFetch";

const FeaturedProducts = ({ type }) => {
    const { data, loading, error } = useFetch(
        `/products/all?type=${type}`
    );

    return (
        <div className="featuredProducts">
            <div className="top">
                <h1>{type} products</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </p>
            </div>
            {
                loading ? (
                    "Please wait..."
                ) : error ? (
                    "Something went wrong"
                ) : (
                    <div className="bottom">
                        {
                            data && data.map(item => <Card item={item} key={item._id} />)
                        }
                    </div>
                )
            }
        </div>
    );
};

export default FeaturedProducts;