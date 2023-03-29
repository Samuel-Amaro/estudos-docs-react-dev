/**
 * * PASSO 1: IDENTIFIQUE OS DIFERENTES ESTADOS VISUAIS DO SEU COMPONENTE
 *
 * Na ciência da computação, você pode ouvir sobre uma “máquina de estado” estar em um dos vários “estados”. Se você trabalha com um designer, já deve ter visto maquetes para diferentes “estados visuais”. O React está na interseção do design e da ciência da computação, então ambas as ideias são fontes de inspiração.
 *
 * Primeiro, você precisa visualizar todos os diferentes “estados” da IU que o usuário pode ver:
 *
 * Vazio : o formulário tem um botão "Enviar" desativado.
 *
 * Digitação : O formulário tem um botão “Enviar” ativado.
 *
 * Enviando : O formulário está completamente desativado. Spinner é mostrado.
 *
 * Sucesso : A mensagem “Obrigado” é exibida em vez de um formulário.
 *
 * Erro : Igual ao estado de digitação, mas com uma mensagem de erro extra.
 *
 *  Assim como um designer, você vai querer “simular” ou criar “simulações” para os diferentes estados antes de adicionar a lógica. Por exemplo, aqui está uma simulação apenas para a parte visual do formulário. Esta simulação é controlada por um prop chamado statuscom um valor padrão de 'empty':
 */

export type PropsForm = {
  status?: string;
};

export default function Form({ status = "empty" }: PropsForm) {
  if (status === "sucess") {
    return <h1>That&apos;s right!</h1>;
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea />
        <br />
        <button>Submit</button>
      </form>
    </>
  );
}

/**
 * Você pode chamar esse suporte do que quiser, a nomenclatura não é importante. Tente editar status = 'empty' para status = 'success'ver a mensagem de sucesso. A zombaria permite iterar rapidamente na interface do usuário antes de conectar qualquer lógica. Aqui está um protótipo mais desenvolvido do mesmo componente, ainda “controlado” pelo statussuporte:
 */

export function Form2({ status = "empty" }: PropsForm) {
  if (status === "sucess") {
    return <h1>That&apos;s right!</h1>;
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea disabled={status === "submitting"} />
        <br />
        <button
          type="submit"
          disabled={status === "empty" || status === "submitting"}
        >
          Submit
        </button>
      </form>
      {status === "error" && (
        <p className="Error">Good guess but a wrong answer. Try again!</p>
      )}
    </>
  );
}
