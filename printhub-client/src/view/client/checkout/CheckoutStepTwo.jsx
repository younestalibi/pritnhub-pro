import { Flex } from "antd";
import PaymentMethods from "./components/PaymentMethods";

const CheckoutStepTwo = ({ setCheckoutData, checkoutData }) => {
  return (
    <Flex>
      <PaymentMethods
        checkoutData={checkoutData}
        setCheckoutData={setCheckoutData}
      />
    </Flex>
  );
};

export default CheckoutStepTwo;
