import { useState } from "react";
import ProductPage from "./ProductPage";
import "./styles.css";

/**
 * Ignorando a nova renderização com useCallback e memo
 *
 * @returns
 */

export default function AppExample1() {
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
