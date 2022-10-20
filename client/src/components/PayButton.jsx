import axios from "axios";
import { url } from "../slices/api";

const PayButton = ({ cartItems, user }) => {

    const handleCheckout = () => {
        axios
            .post(`${url}/stripe/create-checkout-session`, {
                cartItems,
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