import "../ignorando-nova-renderizacao-com-callback-memo/styles.css";

/**
 * Sempre renerizando novamente uum componente
 *
 * Neste exemplo, a ShippingForm implementação também é desacelerada artificialmente para que você possa ver o que acontece quando algum componente React que você está renderizando é genuinamente lento. Tente incrementar o contador e alternar o tema.
 *
 * Ao contrário do exemplo anterior, alternar o tema também é lento agora! Isso ocorre porque não há useCallback chamada nesta versão, portanto handleSubmit, há sempre uma nova função e o componente desacelerado ShippingForm não pode pular a nova renderização.
 * @returns
 */

import { useState } from "react";
import ProductPage from "./ProductPage";

export default function AppExample2() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <ProductPage
        referrerId="wizard_of_oz"
        productId={123}
        theme={isDark ? "dark" : "light"}
      />
    </>
  );
}
