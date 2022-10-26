import axios from "axios";
import { url } from "../slices/api";

const PayButton = ({ cartItems, user }) => {

    const handleCheckout = () => {
        const cart = [];

        for (let i = 0; i < cartItems.length; i++) {
            cart.push({
                id: cartItems[i].id,
                title: cartItems[i].title,
                description: cartItems[i].description,
                price: cartItems[i].price,
                image: cartItems[i].image.url,
                cartQuantity: cartItems[i].cartQuantity,
            })
        }

        axios
            .post(`${url}/stripe/create-checkout-session`, {
                cart,
                userId: user._id,
            })
            .then((response) => {
                if (response.data.url) {
                    window.location.href = response.data.url;
                }
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <>
            <button onClick={() => handleCheckout()}>Check out</button>
        </>
    );
};

export default PayButton;