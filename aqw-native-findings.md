# AQW native player findings

A página oficial `https://account.aq.com/CharPage?id=Alina` foi aberta na sessão autenticada do navegador. Ela apresenta um objeto de player no bloco principal e os controles nativos do AQW associados ao visualizador, incluindo a interação de aparência/cosméticos e o recurso de imagem de perfil. A implementação da Guild Origem não deve criar controles externos equivalentes.

A captura deve ser feita a partir do mecanismo real do player, não assumindo que um `<canvas>` comum exista no DOM: o Ruffle pode encapsular a renderização em Shadow DOM e o SWF pode desenhar em uma superfície interna. A validação precisa cobrir Alina e ZRH em desktop e mobile.
