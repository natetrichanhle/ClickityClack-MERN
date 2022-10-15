import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
import Navbar from '../components/Navbar'

const stripePromise = loadStripe("pk_test_51LrqvQIXvsVt6VeK8Ymyrfs4FvU7vCyP8M9vHILH64H9jlcrlrpgfvWSo4SYM9TIkjNqopLM6VW1Gw6hhbaMWoGQ00hBBVI2sX");

const Cart = ({ user, setUser }) => {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div>
            <Navbar user={user} setUser={setUser} />
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}

export default Cart