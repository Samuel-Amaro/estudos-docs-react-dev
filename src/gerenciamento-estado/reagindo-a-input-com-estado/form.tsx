import { PropsForm } from "./passo1-identifique-os-diferentes-estados-visuais-do-seu-componente";

export default function Form3({ status } : PropsForm) {
  if (status === "success") {
    return <h1>Thats right!</h1>;
  }
  return (
    <form>
      <textarea disabled={status === "submitting"} />
      <br />
      <button disabled={status === "empty" || status === "submitting"}>
        Submit
      </button>
      {status === "error" && (
        <p className="Error">Good guess but a wrong answer. Try again!</p>
      )}
    </form>
  );
}
