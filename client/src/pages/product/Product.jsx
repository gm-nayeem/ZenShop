import { useEffect, useState } from "react";
import "./product.scss";
import {
  AddShoppingCart, FavoriteBorder, Balance
} from "@mui/icons-material";
// import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const singleProduct = {
  id: 1,
  title: "women hat",
  desc: "it looks beautiful",
  price: 15,
  img: "https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1600",
  img2: "https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=1600",
  isNew: true
}

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setProduct(singleProduct);
  }, [singleProduct]);


  // const {
  //   data, loading: productLoading, error: productError
  // } = useFetch(`/products/${id}?populate=*`);

  // useEffect(() => {
  //   setLoading(productLoading);
  //   setProduct(data);
  //   setError(productError);
  // }, [data, productError, productLoading]);


  return (
    <div className="product">
      {
        <>
          <div className="left">
            <div className="images">
              <img
                src={product?.img}
                alt=""
                onClick={(e) => setSelectedImg("img")}
              />
              <img
                src={product?.img2}
                alt=""
                onClick={(e) => setSelectedImg("img2")}
              />
            </div>
            <div className="mainImg">
              <img
                src={product[selectedImg]}
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <h1 className="title">{product?.title}</h1>
            <span className="price">${product?.price}</span>
            <p>{product?.desc}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity(prev => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
            </div>
            <button
              className="add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: product.id,
                    title: product.title,
                    desc: product.desc,
                    price: product.price,
                    img: product.img
                  })
                )
              }
            >
              <AddShoppingCart /> ADD TO CART
            </button>
            <div className="links">
              <div className="item">
                <FavoriteBorder /> ADD TO WISH LIST
              </div>
              <div className="item">
                <Balance /> ADD TO COMPARE
              </div>
            </div>
            <div className="info">
              <span>Vendor: Polo</span>
              <span>Product Type: T-Shirt</span>
              <span>Tag: T-Shirt, Women, Top</span>
            </div>
            <hr />
            <div className="info">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>
          </div>
        </>
      }
    </div>
  );
};


export default Product;