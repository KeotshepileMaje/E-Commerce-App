"use client";

import { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CheckOutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const router = useRouter();
  console.log("Payment Intent: ", paymentIntent);
  console.log("clientSecret: ", clientSecret);

  useEffect(() => {
    // create a paymentIntent as soon as page loads
    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }
          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
          setError(true);
          console.log("Error", error);
          toast.error("Something went wrong");
        });
    }
  }, []);

  return <></>;
};

export default CheckOutClient;
