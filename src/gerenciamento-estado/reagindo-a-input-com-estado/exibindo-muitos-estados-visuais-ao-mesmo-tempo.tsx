/**
 * * EXIBINDO MUITOS ESTADOS VISUAIS AO MESMO TEMPO
 * 
 * Se um componente tiver muitos estados visuais, pode ser conveniente mostrá-los todos em uma página:
*/
 import Form3 from "./form";

const statuses = ["empty", "typing", "submitting", "success", "error"];

export default function WrapperForm() {
  return (
    <>
      {statuses.map((status) => (
        <section key={status}>
          <h4>Form ({status}):</h4>
          <Form3 status={status} />
        </section>
      ))}
    </>
  );
}