# Guild Origem

Site da comunidade brasileira de **AdventureQuest Worlds (AQW)**. O projeto reúne a apresentação da guilda, convite para o Discord, guias de farm, busca pública de personagens, badges, inventário e visualização do avatar via Ruffle.

> Guild Origem é uma comunidade independente de jogadores. AdventureQuest Worlds e seus personagens são marcas registradas da Artix Entertainment, LLC. Este projeto não é afiliado à Artix Entertainment.

## Funcionalidades

- Página inicial com apresentação da guilda e seção de comunidade.
- Link de convite para o Discord: [discord.gg/mrEyu2UmVu](https://discord.gg/mrEyu2UmVu).
- Roster dos membros informados pela guilda, com rank e level.
- Catálogo de guias de farm em português e inglês, com busca por nome, categoria e aliases.
- Guias detalhados de itens, classes, armaduras, armas, capas e aprimoramentos.
- Catálogo complementar sincronizado com o AQWorlds Wiki.
- Busca de personagem por nome através da página pública da AQW.
- Exibição de resumo, badges e inventário do personagem.
- Visualização do avatar com o player nativo da AQW emulado pelo Ruffle.
- Captura do personagem pelo botão de câmera, com captura direta do canvas e fallback para compartilhamento da aba.
- Rate limit em memória e validação dos parâmetros da API.

## Requisitos

- Node.js 20 ou superior recomendado.
- npm 10 ou superior recomendado.
- Uma conta GitHub com acesso ao repositório, caso deseje publicar alterações.

## Instalação local

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/pavionadm/guildorigem.git
cd guildorigem
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Next.js. |
| `npm run build` | Gera o build otimizado de produção. |
| `npm run start` | Inicia o build de produção. |
| `npm run lint` | Executa a verificação de lint do Next.js. |

## Deploy na Vercel

O projeto não exige variáveis de ambiente para funcionar com a configuração atual.

1. Importe `pavionadm/guildorigem` na Vercel.
2. Selecione o framework **Next.js**.
3. Mantenha o comando de build padrão (`next build`).
4. Use a branch `main` como branch de produção.
5. Inicie o deploy.

Também é possível publicar pela CLI da Vercel:

```bash
npm install
npm run build
npx vercel
npx vercel --prod
```

A integração da Vercel deve usar a mesma conta/proprietário do repositório privado (`pavionadm`). No plano Hobby, evite conectar commits de colaboradores que não tenham acesso ao projeto.

## Estrutura do projeto

```text
middleware.ts
next.config.mjs
tailwind.config.ts
src/
  app/
    layout.tsx                         # Fontes, Navbar e Footer
    page.tsx                           # Página principal
    globals.css                        # Estilos globais e contenção do player
    personagem/page.tsx                # Busca de personagens
    api/personagem/route.ts            # API de busca e parsing
    guia/page.tsx                      # Catálogo de guias
    guia/[slug]/page.tsx               # Página individual de guia
    novidades/page.tsx                 # Novidades da comunidade
  components/
    GuildHero.tsx                      # Hero da página inicial
    GuildInfo.tsx                      # Apresentação da guilda
    DiscordCommunity.tsx               # Convite Discord e roster
    Navbar.tsx / Footer.tsx             # Navegação e rodapé
    personagem/
      CharacterSearch.tsx              # Estado da busca
      CharacterSearchForm.tsx          # Formulário de busca
      CharacterCard.tsx                # Card do personagem
      CharacterViewer.tsx              # Ruffle, estabilização e captura
      BadgeList.tsx                    # Badges com fundo #e6d6b4
      InventoryList.tsx                # Inventário
    guia/                               # Componentes do catálogo e detalhes
    novidades/                          # Cards de novidades
    ui/                                 # Loading e mensagens de erro
  data/
    guides.ts                          # Guias escritos manualmente
  lib/
    aqw.ts                             # Busca e parsing de dados da AQW
    aqwwiki.ts                         # Catálogo do AQWorlds Wiki
    guides.ts                          # Filtros e acesso aos guias
    sanitize.ts                        # Validação de nomes
    rate-limit.ts                      # Limitação de requisições
  types/
    aqw.ts / guide.ts / news.ts / wikiItem.ts
```

## Busca de personagens

A rota usada pelo front-end é:

```text
GET /api/personagem?nome=NOME_DO_PERSONAGEM
```

O fluxo atual é:

1. O nome é validado e sanitizado antes da requisição.
2. O servidor busca `https://account.aq.com/CharPage?id=NOME`.
3. O parser extrai o `ccid` e os `FlashVars` do player da AQW.
4. O servidor consulta as páginas públicas de badges e inventário.
5. O front-end renderiza os dados encontrados e inicializa o Ruffle com o SWF oficial do player.

A busca depende da disponibilidade da página pública da AQW. Mudanças no HTML da Artix, proteção anti-bot, indisponibilidade externa ou exigência de sessão podem exigir ajustes em `src/lib/aqw.ts`.

## Captura do personagem

O botão de captura no canto superior do visualizador tenta salvar diretamente o canvas renderizado pelo Ruffle como PNG. Quando o navegador bloqueia essa leitura por CORS, o sistema usa `navigator.mediaDevices.getDisplayMedia` como fallback.

Nesse segundo caso, o navegador solicitará permissão para compartilhar a aba ou janela. Para obter o resultado correto:

1. Clique no ícone de captura.
2. Selecione a aba atual do site.
3. Confirme o compartilhamento.
4. O PNG será baixado automaticamente.

A captura depende do suporte e das permissões do navegador. Chrome e Edge oferecem o suporte mais consistente para o fallback de compartilhamento.

## Guias de farm

Os guias escritos manualmente ficam em `src/data/guides.ts`. Cada guia contém:

- slug;
- nome em português e inglês;
- categoria;
- aliases para busca;
- resumo;
- quest principal;
- requisitos;
- passos com título, descrição e texto alternativo de imagem.

Para adicionar um guia, inclua uma nova entrada no array `GUIDES`, respeitando o tipo definido em `src/types/guide.ts`.

O catálogo complementar do Wiki é buscado por `src/lib/aqwwiki.ts` e exibido separadamente na página `/guia`.

## Segurança e limites

- A API aceita somente parâmetros previstos pelo middleware.
- Nomes de personagens são validados por regex e limitados antes da consulta externa.
- Existe um limite de 20 requisições por minuto por IP em memória.
- Em ambientes com múltiplas instâncias, o rate limit deve ser movido para um armazenamento compartilhado, como Redis ou outro serviço durável.
- Não existem credenciais ou chaves privadas necessárias no código atual.

## Desenvolvimento e contribuição

Antes de enviar alterações, execute:

```bash
npm run lint
npm run build
git diff --check
```

Fluxo sugerido:

```bash
git checkout -b minha-alteracao
# faça as alterações
npm run lint
npm run build
git add .
git commit -m "Descreva a alteração"
git push -u origin minha-alteracao
```

## Licença e créditos

O site é um projeto comunitário independente da Guild Origem. Dados de itens sincronizados são provenientes do [AQWorlds Wiki](https://aqwwiki.wikidot.com), respeitando a licença e os créditos informados pelo próprio Wiki.

© 2026 Guild Origem / Gabriel Pavion. Todos os direitos reservados.
