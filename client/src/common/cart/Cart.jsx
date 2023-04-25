import React from "react";
import "./cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { userRequest } from "../../utils/makeRequest";
import { STRIPE_PUBLIC_KEY } from "../../private/URL";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
    const { cart, user } = useSelector((state) => state);
    const { currentUser } = user;
    const { products } = cart;

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
        try {
            const stripe = await stripePromise;
            const res = await userRequest.post("/orders", {
                userId: currentUser?.user._id,
                products,
                totalAmount: totalPrice()
            });
            await stripe.redirectToCheckout({
                sessionId: res.data.stripeSession.id,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="cart">
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
                        <DeleteOutlinedIcon
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
        </div>
    );
};


export default Cart;