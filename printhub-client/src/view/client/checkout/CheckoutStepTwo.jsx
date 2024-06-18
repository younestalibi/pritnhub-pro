import { Button, Flex } from "antd";
import PaymentMethods from "./components/PaymentMethods";

const CheckoutStepTwo = ({ setCheckoutData, checkoutData, next, prev }) => {
  return (
    <>
      <Flex>
        <PaymentMethods
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
        />
      </Flex>
      <div style={{ marginTop:'40px' }}>
        <Button disabled={!checkoutData.paymentMethod} type="primary" onClick={() => next()}>
          Next
        </Button>
        <Button
          style={{
            margin: "0 8px",
          }}
          onClick={() => prev()}
        >
          Previous
        </Button>
      </div>
    </>
  );
};

export default CheckoutStepTwo;
