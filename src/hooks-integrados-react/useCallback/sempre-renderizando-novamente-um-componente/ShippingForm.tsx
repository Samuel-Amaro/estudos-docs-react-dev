import { memo, useState } from "react";

export type OrderDetails = {
  street: string;
  city: string;
  zipCode: string;
  count: number;
};

//pulando uma nova renderização quando seus props forem os mesmos da ultima renderização, agrupando-os em memo
//Com esta mudança, ShippingForm pulará a nova renderização se todos os seus adereços forem iguais aos da última renderização.
//useMemo armazena em cache o resultado da chamada de sua função.
//A memorização permite que seu componente seja renderizado novamente apenas se as dependências forem alteradas.
//memorize(e o mesmo que armazenar em cache)
//armazena em cache o resultado da chamada ShippingForm para que não mude,
//a menos que onSubmit tenha mudado
const ShippingForm = memo(function ShippingForm({
  onSubmit,
}: {
  onSubmit: (orderDetails: OrderDetails) => void;
}) {
  const [count, setCount] = useState(1);

  console.log("[ARTIFICIALMENTE LENTO] Renderização <ShippingForm />]");

  //pode comentar este techo do codigo abaixo para poder ver a falta do useCallback no componente superior
  const startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Não faça nada por 500 ms para emular código extremamente lento
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const orderDetails = {
      ...Object.fromEntries(formData),
      count,
    } as OrderDetails;
    onSubmit(orderDetails);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <b>
          Note: <code>ShippingForm</code> is artificially slowed down!
        </b>
      </p>
      <label>
        Number of items:
        <button
          type="button"
          title="To decrease"
          aria-label="To decrease"
          onClick={() => setCount(count - 1)}
        >
          –
        </button>
        {count}
        <button
          type="button"
          title="Increase"
          aria-label="Increase"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </label>
      <label>
        Street:
        <input name="street" type="text" placeholder="Enter a street" />
      </label>
      <label>
        City:
        <input name="city" type="text" placeholder="Enter a city" />
      </label>
      <label>
        Postal code:
        <input
          name="zipCode"
          type="text"
          placeholder="Enter a postal code ex 00000-000"
        />
      </label>
      <button type="submit" title="Submit" aria-label="Submit">
        Submit
      </button>
    </form>
  );
});

export default ShippingForm;
