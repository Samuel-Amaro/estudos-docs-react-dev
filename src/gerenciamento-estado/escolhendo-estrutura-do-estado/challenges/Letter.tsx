import { DataLetter } from "./corrigir-selecao-desaparecendo";
import "./test.css";

type PropsLetter = {
  letter: DataLetter;
  isHighlighted: boolean;
  onHover: (letterId: number) => void;
  onToggleStar: (starredId: number) => void;
};

export default function Letter({
  letter,
  isHighlighted,
  onHover,
  onToggleStar,
}: PropsLetter) {
  return (
    <li
      className={isHighlighted ? "highlighted" : ""}
      onFocus={() => {
        onHover(letter.id);
      }}
      onPointerMove={() => {
        onHover(letter.id);
      }}
    >
      <button
        onClick={() => {
          onToggleStar(letter.id);
        }}
      >
        {letter.isStarred ? "Unstar" : "Star"}
      </button>
      {letter.subject}
    </li>
  );
}
