import React from "react";
import "./cart.scss";
import { DeleteOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { userRequest } from "../../utils/makeRequest";
import { STRIPE_PUBLIC_KEY } from "../../private/URL";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
    const user = useSelector(state => state.user?.currentUser?.user);
    const { products } = useSelector(state => state?.cart);
    const dispatch = useDispatch();

    // set total price
    const totalPrice = () => {
        let total = 0;
        products.forEach((item) => {
            total += item.quantity * item.price;
        });
        return total.toFixed(2);
    };

    const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

    const handlePayment = async () => {
        if (products.length > 0) {
            try {
                const stripe = await stripePromise;
                const res = await userRequest.post("/checkout/payment", {
                    products,
                });
    
                const stripeId = res.data.stripeSession.id;
    
                // save stripeSession id
                localStorage.setItem(
                    "stripeId",
                    JSON.stringify(stripeId)
                );
    
                await stripe.redirectToCheckout({
                    sessionId: stripeId,
                });
            } catch (err) {
                console.log(err);
            }
        } else {
            alert("You didn't select any product!!");
        }
    };

    return (
        <div className="cart">
            {
                user ? (
                    <>
                        <h1>Products in your cart</h1>
                        {
                            products && products.map(item => (
                                <div className="item" key={item.id}>
                                    <img src={item.img} alt="" />
                                    <div className="details">
                                        <h1>{item.title}</h1>
                                        <p>{item.desc?.substring(0, 100)}</p>
                                        <div className="price">
                                            {item.quantity} x ${item.price}
                                        </div>
                                    </div>
                                    <DeleteOutlined
                                        className="delete"
                                        onClick={() => dispatch(removeItem({ id: item.id }))}
                                    />
                                </div>
                            ))
                        }
                        <div className="total">
                            <span>SUBTOTAL</span>
                            <span>${totalPrice()}</span>
                        </div>
                        <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
                        <span className="reset" onClick={() => dispatch(resetCart())}>
                            Reset Cart
                        </span>
                    </>
                ) : (
                    <>
                        <h1>Products in your cart</h1>
                        <div className="total">
                            <span>SUBTOTAL</span>
                            <span>$0.00</span>
                        </div>
                        <button>PROCEED TO CHECKOUT</button>
                        <span className="reset">
                            Reset Cart
                        </span>
                    </>
                )
            }
        </div>
    );
};


export default Cart;