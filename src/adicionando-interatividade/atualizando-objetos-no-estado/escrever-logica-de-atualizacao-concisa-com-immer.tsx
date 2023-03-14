/**
 * * ESCREVER LÓGICA DE ATUALIZAÇÃO CONCISA COM IMMER
 * 
 *  Se o seu estado estiver profundamente aninhado, considere achatá-lo. Mas, se você não quiser alterar sua estrutura de estado, talvez prefira um atalho para spreads aninhados. Immer é uma biblioteca popular que permite escrever usando a sintaxe conveniente, mas mutante, e se encarrega de produzir as cópias para você. Com o Immer, o código que você escreve parece que você está “quebrando as regras” e transformando um objeto:
*/

/*
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});

 * 
 * Mas ao contrário de uma mutação regular, ela não sobrescreve o estado passado!
*/

