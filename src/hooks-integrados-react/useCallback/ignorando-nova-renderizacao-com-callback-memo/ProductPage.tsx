import { useCallback } from "react";
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
  //armazenando em cache uma função entre re-renderizações do seu componente, usando o useCallback hook
  //primeiro paramentro e uma definição de função, que eu desejo armazenar em cache entre novas renderizações
  //segundo paramentro lista de dependencias incluindo os valores do seu componente que são usados na minha function
  //useCallback armazena em cache uma função entre-re-renderizações até que suas dependencias mudem
  //Ao envolver handleSubmit, useCallback você garante que seja a mesma função entre as novas renderizações (até que as dependências mudem). Você não precisa agrupar uma função, useCallback a menos que faça isso por algum motivo específico.
  //Neste exemplo, o motivo é que você o passa para um componente encapsulado em memo, e isso permite que ele pule a nova renderização. Existem outros motivos pelos quais você pode precisar useCallback
  //como a function handleSubmit esta em cache por causa do useCallback, sempre sera usada a mesma,
  //até que as dependencias mude, assim, como o ShippingForm esta memoizado, so havera nova renderização, caso
  //o handleSubmit seja uuma nova function diferente da do cache
  //useCallback armazena em cache a própria função.
  //armazena em cache a função que eu forneci para que não mude, a menos que productId, ou referrerId tenha sido alterado, dai uma nova function e armazenada em cache
  const handleSubmit = useCallback(
    (orderDetails: OrderDetails) => {
      post("/product/" + productId + "/buy", {
        referrerId,
        orderDetails,
      });
    },
    [productId, referrerId]
  );

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
