import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosHttp from "../../utils/axios-client";
import { notification } from "antd";

const PayPal = ({orderData}) => {
  console.log(orderData)
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
                  ...orderData,
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
                axiosHttp
                  .post("paypal/confirm-order", {
                    orderId: details.id,
                  })
                  .then((response) => {
                    notification.open({
                      description: details.payer.name.given_name,
                      duration: 3,
                      type: "success",
                    });
                  })
                  .catch((error) => {
                    const message = error.response.data;
                    if (message.error) {
                      notification.open({
                        description: message.error,
                        duration: 3,
                        type: "error",
                      });
                    }
                  });
              });
            },
            onError: function (err) {
              notification.open({
                description: "Something went wrong, try again!",
                duration: 3,
                type: "error",
              });
              console.log(err);
            },

            onCancel: async function (data) {
              axiosHttp
                .post("paypal/cancel-order", {
                  orderId: data.orderID,
                })
                .then((response) => {
                  console.log("Order cancelled", response);
                })
                .catch((error) => {
                  console.error("Error cancelling order:", error);
                });
            },
          })
          .render("#paypal-button-container");
      });
      document.body.appendChild(script);
    }
  }, [paypalClientId, orderData]);

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
