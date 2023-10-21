import ShippingForm, { OrderDetails } from "./ShippingForm";

export default function ProductPage({
  productId,
  referrerId,
  theme,
}: {
  productId: number;
  referrerId: string;
  theme: string;
  }) {
  
  function handleSubmit(orderDetails: OrderDetails) {
    post("/product/" + productId + "/buy", {
      referrerId,
      orderDetails,
    });
  }

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

function post(
  url: string,
  data: { referrerId: string; orderDetails: OrderDetails }
) {
  // Imagine this sends a request...
  console.log("POST /" + url);
  console.log(data);
}
