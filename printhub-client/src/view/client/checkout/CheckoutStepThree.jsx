import React, { useEffect } from "react";
import { Card, Flex, List } from "antd";
import { getAddresses, resetStateAddress } from "../../../provider/features/address/AddressSlice";
import { useDispatch, useSelector } from "react-redux";

const CheckoutStepThree = ({ checkoutData, carts }) => {
    const { addresses, getAddressesState, createAddressState } = useSelector(
        (state) => state.address
      );
  const paymentMethod = checkoutData.paymentMethod;
  const address = addresses.find((e) => e.id == checkoutData.addressId);
  const dispatch=useDispatch()
  useEffect(() => {
    if (addresses.length == 0) {
      dispatch(getAddresses());
    } else {
      dispatch(resetStateAddress());
    }
  }, []);
  return (
    <>
      <h2>Review Your Order</h2>
      <h3>Address Information:</h3>
      {address && (
          <Card
            size="small"
            hoverable
            title={
              <Flex justify="space-between" align="center">
                <div>
                  {address.firstName} {address.lastName}
                </div>
              </Flex>
            }
          >
            <small>{address.address1} </small>
            <small>{address.address2} </small>
            <small>{address.address3} </small>
            <br />
            <small>
              {address.city}, {address.country}
            </small>
            <br />
            <small>Phone: {address.phone}</small>
            <br />
            <small>Postal Code: {address.postal_code}</small>
          </Card>
        )}
      <h3>Payment Method:</h3>
      <p>{paymentMethod}</p>
      <h3>Order Items:</h3>
      <List
        dataSource={carts}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.Product.name}
              description={`Quantity: ${item.quantity} - Price: ${item.Product.price}`}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default CheckoutStepThree;
