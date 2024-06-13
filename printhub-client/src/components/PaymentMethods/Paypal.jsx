import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosHttp from "../../utils/axios-client";

const PayPal = () => {
  const [items] = useState([{ id: 1, quantity: 1 }]);
  const [paypalClientId, setPaypalClientId] = useState("");

  useEffect(() => {
    const fetchPayPalClientId = async () => {
      try {
        const response = await axiosHttp.get("paypal/config");
        setPaypalClientId(response.data.paypalClientId);
      } catch (error) {
        console.error("Error fetching PayPal client ID:", error);
      }
    };

    fetchPayPalClientId();
  }, []);

  useEffect(() => {
    if (paypalClientId) {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&disable-funding=credit,card`;
      script.addEventListener("load", () => {
        paypal
          .Buttons({
            style: {
              shape: "rect",
              layout: "vertical",
              color: "blue",
              label: "pay",
            },
            createOrder: function () {
              return axiosHttp
                .post("paypal/create-order", {
                  items,
                })
                .then((res) => {
                  console.log(res);
                  return res.data.id;
                })
                .catch((err) => {
                  console.error(
                    "Error creating order:",
                    err.response?.data || err.message
                  );
                });
            },
            onApprove: function (data, actions) {
              return actions.order.capture().then((details) => {
                console.log(details.id);
                alert(
                  "Transaction completed by " + details.payer.name.given_name
                );
                axiosHttp
                  .post("paypal/update-order-status", {
                    orderId: details.id,
                  })
                  .then((response) => {
                    console.log("Order confirmed", response);
                  })
                  .catch((error) => {
                    console.error("Error confirming order:", error);
                  });
              });
            },
            onError: function (err) {
              alert("error");
              console.log(err);
            },
            onCancel: async function (data) {
              // try {
              //   const response = await axiosHttp.get("paypal/cancel-order");
              //   setPaypalClientId(response.data.paypalClientId);
              // } catch (error) {
              //   console.error("Error fetching PayPal client ID:", error);
              // }

              alert("Payment was cancelled");
              console.log("Payment cancelled", data);
              // Here you can add a function to handle the payment cancellation
            },
          })
          .render("#paypal-button-container");
      });
      document.body.appendChild(script);
    }
  }, [paypalClientId, items]);

  return (
    <div>
      {paypalClientId ? (
        <div id="paypal-button-container"></div>
      ) : (
        <p>Loading PayPal Button...</p>
      )}
    </div>
  );
};

export default PayPal;
