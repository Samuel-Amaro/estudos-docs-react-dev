/**
 * * REMOVER UM ITEM DO CARRINHO DE COMPRAS
 *
 *  Este carrinho de compras tem um botão "+" funcionando, mas o botão "-" não faz nada. Você precisa adicionar um manipulador de eventos a ele para que pressioná-lo diminua o countdo produto correspondente. Se você pressionar ”–” quando a contagem for 1, o produto deve ser automaticamente removido do carrinho. Certifique-se de que nunca mostra 0.
 */

import { useState } from "react";

const initialProducts = [
  {
    id: 0,
    name: "Baklava",
    count: 1,
  },
  {
    id: 1,
    name: "Cheese",
    count: 5,
  },
  {
    id: 2,
    name: "Spaghetti",
    count: 2,
  },
];

export default function ShoppingCart2() {
  const [products, setProducts] = useState(initialProducts);

  function handleIncreaseClick(productId: number) {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            count: product.count + 1,
          };
        } else {
          return product;
        }
      })
    );
  }

  function handleDecrementClick(productId: number) {
    setProducts(
      products.map((product) => {
        if (product.id === productId && product.count >= 1) {
          return {
            ...product,
            count: product.count - 1,
          };
        } else {
          return product;
        }
      }).filter((product) => {
        return product.count > 0;
      })
    );
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} (<b>{product.count}</b>)
          <button
            onClick={() => {
              handleIncreaseClick(product.id);
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              handleDecrementClick(product.id);
            }}
          >
            –
          </button>
        </li>
      ))}
    </ul>
  );
}
