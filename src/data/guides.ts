import type { Guide, GuideCategory } from "@/types/guide";

/**
 * Placeholder visual enquanto a imagem do passo ainda não foi adicionada.
 * Troque `imageUrl: ""` nos passos por uma URL real assim que o print/foto
 * do farm estiver hospedado.
 */
export const GUIDE_IMAGE_PLACEHOLDER_HINT =
  "Print ou foto deste passo do farm ainda não adicionado";

export const GUIDE_CATEGORIES: GuideCategory[] = [
  { id: "helm", labelPt: "Capacete", labelEn: "Helm" },
  { id: "sword", labelPt: "Espada", labelEn: "Sword" },
  { id: "axe", labelPt: "Machado", labelEn: "Axe" },
  { id: "armor", labelPt: "Armadura", labelEn: "Armor" },
  { id: "cape", labelPt: "Capa", labelEn: "Cape" },
  { id: "pet", labelPt: "Pet", labelEn: "Pet" },
  { id: "amulet", labelPt: "Amuleto", labelEn: "Amulet" },
  { id: "class", labelPt: "Classe", labelEn: "Class" },
  { id: "other", labelPt: "Outros", labelEn: "Other" },
];

/**
 * Catálogo de guias.
 * Para criar um novo: copie um bloco, mude o `slug` e preencha os campos.
 * Imagens: suba o print/foto do farm em algum host e cole a URL em
 * `imageUrl` de cada passo.
 */
export const GUIDES: Guide[] = [
  {
    slug: "necrotic-sword-of-doom",
    namePt: "Espada Necrótica da Perdição",
    nameEn: "Necrotic Sword of Doom",
    category: "sword",
    aliases: ["nsod", "necrotic"],
    summary:
      "Guia de farm da Necrotic Sword of Doom (NSoD). Siga os passos na ordem: prepare os requisitos de reputação e itens diários, acumule as Void Auras e realize o merge final no NPC Braeus.",
    quest:
      "Quests do NPC Braeus em /shadowfall e Diária 'Mine Crafting' em /necropolis",
    requirements: [
      "Personagem Level 80+ recomendado",
      "Rank 10 Evil e Rank 10 Doomwood",
      "Saga Doomwood (Partes 1 e 2) concluída",
      "Classe Necromancer (Rank 10) no inventário",
      "Mínimo de 4 Barium (obtidos na quest diária 'Mine Crafting')",
      "Pelo menos 20 espaços livres no inventário",
    ],
    steps: [
      {
        title: "Passo 1 — Preparação e Itens Diários",
        description:
          "Alcance Rank 10 em Evil e Doomwood e complete a saga de Doomwood. Vá até /necropolis e faça a quest diária 'Mine Crafting' com o Artix todos os dias até obter 4 Barium, pois esse metal é limitado por tempo real.",
        imageUrl: "",
        imageAlt:
          "Preparação da conta, reputações e farm diário de Barium na Necropolis",
      },
      {
        title: "Passo 2 — O Grande Farm de Void Auras",
        description:
          "Acumule as 7.500 Void Auras necessárias. Se você for Free-to-Play, use a quest 'Retrieving Void Auras' em /shadowfall. Se possuir a armadura SDKA, use a quest 'Commanding Shadow Essays' para acelerar drasticamente o processo.",
        imageUrl: "",
        imageAlt: "Farm intenso de Void Auras com ou sem a armadura SDKA",
      },
      {
        title: "Passo 3 — Itens Secundários e Chefes",
        description:
          "Farm 10.000 Undead Energy e 5.100 Bone Dust em /battleunderb. Em seguida, derrote os chefes específicos para pegar os drops raros: Cavern Celestite (/battleundere), Primarch's Hilt (/bosschallenge) e Doom Heart (/netherlair).",
        imageUrl: "",
        imageAlt:
          "Derrotando bosses e monstros undead para coletar materiais secundários",
      },
      {
        title: "Passo 4 — Forja dos Componentes e Merge Final",
        description:
          "Com os materiais básicos, use o NPC Braeus em /shadowfall para criar as essências da lâmina, empunhadura e aura. Una todos os componentes criados para finalmente dar merge na sua Necrotic Sword of Doom.",
        imageUrl: "",
        imageAlt:
          "Merge final dos componentes da espada no NPC Braeus em Shadowfall",
      },
    ],
  },
  {
    slug: "blinding-light-of-destiny",
    namePt: "Luz Cegante do Destino",
    nameEn: "Blinding Light of Destiny",
    category: "axe",
    aliases: ["blod", "blinding light", "luz cegante"],
    summary:
      "Guia de farm da Blinding Light of Destiny (BLoD). Siga os passos na ordem: libere as quests em Necropolis, farme os metais diários, crie as armas do destino e junte os Orbs para o merge final.",
    quest:
      "The Blinding Light of Destiny (Cadeia clássica do NPC Artix em /necropolis)",
    requirements: [
      "Rank 10 DoomWood (altamente recomendado)",
      "Metais da quest diária 'Mine Crafting' (Barium, Copper, Silver, Gold, Iron, Platinum)",
      "10.500 Bone Dust e 10.500 Undead Energy para as armas intermediárias",
      "Espaço livre no inventário para os eixos, lâminas e punhos do destino",
    ],
    steps: [
      {
        title: "Passo 1 — Começo em Necropolis e Quests Diárias",
        description:
          "Vá até /necropolis e complete as quests introdutórias do Artix. Ative a quest diária 'Mine Crafting' todos os dias para acumular os metais sagrados. Você precisará de Copper, Silver e Barium para criar as primeiras armas modificadas.",
        imageUrl: "",
        imageAlt:
          "Início da cadeia da BLoD com Artix em Necropolis e farm diário de metais",
      },
      {
        title: "Passo 2 — O Farm de Bone Dust e Undead Energy",
        description:
          "Vá para /battleunderb e derrote esqueletos sem parar. Você precisará acumular milhares de Bone Dust e Undead Energy para purificar seus metais em 'Ultimate Weapon Kits' e criar as versões básicas do machado, adaga e arco.",
        imageUrl: "",
        imageAlt:
          "Farm intenso de Undead Energy e Bone Dust nas catacumbas de Battleunderb",
      },
      {
        title: "Passo 3 — Criando as Armas do Destino e Farm de Orbs",
        description:
          "Use os metais para forjar armas como a 'Blinding Bow' ou 'Blinding Dagger'. Equipe essas armas para liberar quests especiais que dropam 'Loyal Spirit Orbs' e 'Bright Aura' muito mais rápido. Use-as até juntar 25.000 Brilliant Aura.",
        imageUrl: "",
        imageAlt:
          "Utilizando as armas intermediárias para acelerar o farm de Spirit Orbs",
      },
      {
        title: "Passo 4 — Conclusão e o Merge do Machado",
        description:
          "Com 1 Blindingshard, 1 Blinding Aura e todos os Orbs necessários em mãos, complete a quest final 'The Blinding Light of Destiny' com o NPC Artix para receber o machado lendário no seu inventário.",
        imageUrl: "",
        imageAlt:
          "Entrega da quest final e resgate da Blinding Light of Destiny em Necropolis",
      },
    ],
  },
  {
    slug: "void-highlord",
    namePt: "Altivo do Vazio",
    nameEn: "Void Highlord",
    category: "class",
    aliases: ["vhl", "void high lord", "highlord"],
    summary:
      "Guia da Void Highlord (VHL), uma das classes de farming e solo mais poderosas do jogo. O grind exige a entrega repetitiva de itens raros da Nulgath Nation.",
    quest: "Void HighLord's Challenge em /tercessuinotlim",
    requirements: [
      "Personagem Level 80",
      "Hadean Onyx of Nulgath",
      "Voucher of Nulgath (non-member)",
      "Pelo menos 15 dias de farm real devido ao item diário Elders' Blood",
    ],
    steps: [
      {
        title: "Passo 1 — Acesso e Itens de Ativação",
        description:
          "Vá para /citadel e complete as quests de portal para acessar /tercessuinotlim. Farme o item Hadean Onyx derrotando o Shadow of Nulgath e obtenha o Voucher (non-member) girando as roletas da Nation.",
        imageUrl: "",
        imageAlt: "Acessando Tercessuinotlim e farmando itens de ativação da quest",
      },
      {
        title: "Passo 2 — O Limite Diário de Elders' Blood",
        description:
          "Vá diariamente até /arcangrove e faça a missão com a NPC Reens para obter Elders' Blood. Você precisará de 15 unidades no total (uma para cada Roentgenium), limitando o farm a pelo menos 15 dias.",
        imageUrl: "",
        imageAlt: "Farm diário da quest com a cientista Reens em Arcangrove",
      },
      {
        title: "Passo 3 — Coleta de Reagentes de Nulgath",
        description:
          "Acumule uma quantidade massiva de recursos da Nation: Tainted Gems, Gems of Nulgath, Unidentified 13 e Emblems. Repita o 'Void HighLord's Challenge' 15 vezes para juntar os 15 Roentgeniums necessários.",
        imageUrl: "",
        imageAlt: "Farm intensivo de recursos através de pets ou quests globais",
      },
      {
        title: "Passo 4 — Cristais do Vazio e Merge Final",
        description:
          "Junte materiais adicionais para comprar o Void Crystal A e o Void Crystal B na Merge Shop. Com os dois cristais e os 15 Roentgeniums prontos, resgate a sua classe Void Highlord.",
        imageUrl: "",
        imageAlt: "Compra dos cristais e desbloqueio final da classe VHL",
      },
    ],
  },
  {
    slug: "verus-doomknight",
    namePt: "Cavaleiro da Perdição Verdadeiro",
    nameEn: "Verus DoomKnight",
    category: "class",
    aliases: ["vdk", "verus doomknight", "verus dk"],
    summary:
      "Guia da classe Verus DoomKnight (VDK), uma das classes tanques e debuffers de elite mais fortes para lutas em grupo e Ultra Bosses. O farm exige sintonizar-se com a escuridão coletando relíquias e enfrentando forças lendárias.",
    quest: "Quests do NPC Mysterious Stranger em /techfortress",
    requirements: [
      "Personagem Level 80+",
      "Rank 10 Evil",
      "Sepulchure's Original Helm ou Arch DoomKnight Helm",
      "ShadowReaper of Doom no inventário",
      "Grandes coleções de itens temáticos de Doom espalhados por Lore",
    ],
    steps: [
      {
        title: "Passo 1 — Sintonização Corporal e Almas",
        description:
          "Vá para /techfortress e inicie as missões de sintonização. Você precisará coletar fragmentos corporais pesados derrotando o Titanic Doomknight em /titanattack, as placas de armadura em /valleyofdoom e ossos no /underrealm.",
        imageUrl: "",
        imageAlt: "Coletando componentes corporais e essências ósseas nos mapas iniciais da chain",
      },
      {
        title: "Passo 2 — A Capa e Equipamentos Sombrios",
        description:
          "Avance para a coleta de equipamentos icônicos. Você precisará caçar itens específicos de chefes como o Mask of the Skulls do Dracolich em /necrodungeon, a Doom Worshipper's Blade em /lumafortress e a Asherion Armor em /stonewooddeep.",
        imageUrl: "",
        imageAlt: "Derrotando chefes clássicos do submundo para resgatar equipamentos de Doom",
      },
      {
        title: "Passo 3 — Fragmentação da Alma e Luz Refratada",
        description:
          "Parta para os testes mais severos de combate. Farme grandes quantidades de materiais nos mapas /shadowoff e /fiendshard, e enfrente os testes de fratura de alma derrotando versões ultra e chefes em /ultraalteon, /ultradrakath e /shadowstrike.",
        imageUrl: "",
        imageAlt: "Enfrentando grandes potências e generais lendários para quebrar fragmentos de alma",
      },
      {
        title: "Passo 4 — O Exército de Mortos-Vivos e Fusão",
        description:
          "Complete os desafios finais acumulando dentes de criaturas em /xyfrag e reunindo as insígnias dos itens de Sepulchure. Entregue os reagentes finais para fundir seu poder e resgatar a classe Verus DoomKnight.",
        imageUrl: "",
        imageAlt: "Entrega do exército de mortos-vivos e resgate definitivo da classe Verus DoomKnight",
      },
    ],
  },
  {
    slug: "arcana-invoker",
    namePt: "Invocador dos Arcanos",
    nameEn: "Arcana Invoker",
    category: "class",
    aliases: ["ai", "arcana invoker", "arcana"],
    summary:
      "Guia da classe Arcana Invoker (AI), uma das classes mágicas solo mais poderosas do jogo focada nos Arcanos Maiores do Tarô. O farm exige a coleta de todas as 22 cartas em uma longa jornada global.",
    quest: "Quests da NPC Rayst em /arcana",
    requirements: [
      "Personagem Level 80+",
      "Rank 10 Spellcrafting",
      "Sagas de Lore e Ashray totalmente concluídas",
      "Múltiplos reagentes raros e o item diário 'The Fool' (O Louco)",
      "Pelo menos 25 espaços livres no inventário para as cartas",
    ],
    steps: [
      {
        title: "Passo 1 — Os Primeiros Arcanos e a Diária",
        description:
          "Vá para /arcana e aceite as quests iniciais com Rayst. Sua maior prioridade é fazer a quest diária para coletar a carta 'The Fool', que servirá de base e limitador de tempo para os próximos passos.",
        imageUrl: "",
        imageAlt: "Iniciando as pesquisas de Tarô com o NPC Rayst em Arcana",
      },
      {
        title: "Passo 2 — A Jornada pelas Cartas do Destino",
        description:
          "Complete as chains 'The Magician' até 'The Wheel of Fortune'. Você precisará rodar Lore derrotando chefes elementais em /natatorium, /volcano e mapas clássicos de Chaos para coletar as primeiras 10 cartas dos Arcanos Maiores.",
        imageUrl: "",
        imageAlt: "Caçando chefes elementais pelo mundo para dropar as cartas de Tarô",
      },
      {
        title: "Passo 3 — Os Desafios Sombrios e da Morte",
        description:
          "Avance nas missões de 'Justice' até 'The Judgment'. Esta etapa exige drops de alta dificuldade em mapas como /underworld, /graveyard e chefes de alto nível das sagas mais recentes do jogo para purificar as cartas da morte e do diabo.",
        imageUrl: "",
        imageAlt: "Enfrentando criaturas das trevas e chefes do submundo para coletar arcanos avançados",
      },
      {
        title: "Passo 4 — O Mundo e o Desbloqueio Supremo",
        description:
          "Complete a 22ª carta 'The World' em uma missão de fusão massiva. Com o baralho de Arcanos Maiores totalmente completo no seu inventário, entregue o desafio final para habilitar o shop e resgatar a classe Arcana Invoker.",
        imageUrl: "",
        imageAlt: "Fusão do baralho completo de Arcanos Maiores e resgate da classe Arcana Invoker",
      },
    ],
  },
  {
    slug: "lord-of-order",
    namePt: "Senhor da Ordem",
    nameEn: "Lord of Order",
    category: "class",
    aliases: ["loo", "lord of order", "lord order"],
    summary:
      "Guia da Lord of Order (LoO), a classe de suporte mais indispensável do jogo para desafios de grupo e Ultra Bosses. O farm é estruturado através de 10 quests diárias consecutivas com a NPC Mirror Mirror.",
    quest: "Quests diárias da NPC Mirror Mirror em /battleoff",
    requirements: [
      "Personagem Level 50+",
      "História de /battleoff totalmente concluída",
      "Acesso a múltiplos mapas das sagas de Chaos e Queen of Monsters",
      "Pelo menos 10 dias reais disponíveis para completar o ciclo diário",
    ],
    steps: [
      {
        title: "Passo 1 — Começando os Desafios Diários",
        description:
          "Vá até /battleoff, fale com a NPC Mirror Mirror e complete a história do mapa se ainda não fez. Aceite a primeira quest diária. Cada dia exigirá que você viaje a mapas diferentes da história do Chaos para coletar insígnias de ordem.",
        imageUrl: "",
        imageAlt: "Iniciando a linha de quests diárias com a Mirror Mirror em Battleoff",
      },
      {
        title: "Passo 2 — Coleta de Armas e Essências de Chefes",
        description:
          "Entre os dias 2 e 6, as quests exigirão drops específicos de chefes icônicos. Você precisará derrotar o Chaos Lord Alteon em /altontower, o Grand Inquisitor em /citadel e coletar armas temáticas como a Hanzamune Blade em /kitsune.",
        imageUrl: "",
        imageAlt: "Enfrentando Senhores do Caos para coletar essências e armas purificadas",
      },
      {
        title: "Passo 3 — Testes de Alinhamento e Espelhos",
        description:
          "Nos dias 7 a 9, o farm foca em espelhos e energias de universos paralelos. Você precisará derrotar monstros em mapas do Mirror Realm, como /overworld e /timelibrary, acumulando as runas necessárias para estabilizar o poder da ordem.",
        imageUrl: "",
        imageAlt: "Viajando pelo Mirror Realm para coletar energias do alinhamento reverso",
      },
      {
        title: "Passo 4 — O Teste do Destino e Fusão Final",
        description:
          "No 10º dia, aceite a missão final 'The Final Challenge'. Derrote o Ultra Alteon em /chaosboss para pegar o último drop. Com todos os 10 tokens diários acumulados, faça o merge e resgate a sua classe Lord of Order.",
        imageUrl: "",
        imageAlt: "Entrega do décimo token e desbloqueio definitivo da classe Lord of Order",
      },
    ],
  },
  {
    slug: "archmage",
    namePt: "Arquimago",
    nameEn: "ArchMage",
    category: "class",
    aliases: ["am", "archmage", "arch mage"],
    summary:
      "Guia da classe ArchMage, a classe de farm definitivo baseada em magia elemental e manipulação de mana. O grind exige a coleta de livros sagrados, relíquias elementais e a derrota de chefes ultra de guilda.",
    quest: "Quests do NPC Warlic em /archmage",
    requirements: [
      "Personagem Level 80+",
      "Rank 10 Spellcrafting",
      "Saga de Shadows of War totalmente concluída",
      "Acesso aos mapas /elemental, /sandsea e zonas de chefes finais",
      "Grandes quantidades de ouro para a compra de catalisadores",
    ],
    steps: [
      {
        title: "Passo 1 — Os Livros de Magia Elemental",
        description:
          "Vá para /archmage e fale com Warlic. Complete as missões de estudo para criar os tomos mágicos iniciais: Book of Fire, Book of Ice, Book of Earth e Book of Aether, coletando essências elementais e derrotando criaturas da natureza.",
        imageUrl: "",
        imageAlt: "Coletando tomos e essências elementais clássicas com Warlic",
      },
      {
        title: "Passo 2 — Providências do Caos e Cosmos",
        description:
          "Avance para as quests intermediárias 'Book of Magus' e 'Book of Arcana'. Você precisará coletar drops raros de chefes em mapas como /streamwar, /shatterwar e /timespace, além de decifrar runas com o uso da sua habilidade de Spellcrafting.",
        imageUrl: "",
        imageAlt: "Farmando runas astrais e enfrentando generais da guerra cósmica",
      },
      {
        title: "Passo 3 — As Insígnias e Relíquias Supremas",
        description:
          "Complete a missão 'Archmage's Trust'. Esta etapa exige relíquias de alta complexidade e a derrota de chefes poderosos como o Prismata em /thegorge e o Flibbitiestick em /lab. Certifique-se de acumular os Unbound Essence.",
        imageUrl: "",
        imageAlt: "Enfrentando chefes de elite para obter as essências desvinculadas",
      },
      {
        title: "Passo 4 — A Ascensão e Encantamento Final",
        description:
          "Reúna todos os livros purificados, a Calamitous Core e os catalisadores de mana comprados. Entregue a missão de fusão suprema em /archmage para registrar a classe ArchMage e liberar o shop cosmético extra.",
        imageUrl: "",
        imageAlt: "Fusão de todos os livros elementais e resgate da classe ArchMage",
      },
    ],
  },
  {
    slug: "legion-revenant",
    namePt: "Retornado da Legião",
    nameEn: "Legion Revenant",
    category: "class",
    aliases: ["lr", "legion revenant", "revenant"],
    summary:
      "Guia da Legion Revenant (LR), uma das melhores classes de farm e utilidade geral do jogo. O grind consiste em completar as três exaustivas feiras de almas (Fealty) do NPC Dage the Evil.",
    quest: "Quests de Legion Fealty com o NPC Dage the Evil em /underworld",
    requirements: [
      "Personagem Level 80+",
      "Fazer parte da Undead Legion (ter a classe Undead Warrior)",
      "Possuir 2.000 Legion Tokens para liberar a linha inicial",
      "Pelo menos 15 a 20 espaços livres no inventário para gerenciar os drops",
    ],
    steps: [
      {
        title: "Passo 1 — Legion Fealty 1 (As Almas)",
        description:
          "Aceite a quest 'Legion Fealty 1: Cause' em /underworld. Derrote consecutivamente monstros em /revenant, /aegis e /lostvilla até juntar as quantidades exigidas de Tethered Souls, Forgotten Souls e Bleak Souls para obter 20 Revenant Spellscrolls.",
        imageUrl: "",
        imageAlt: "Farm massivo de almas nos mapas da linha Revenant",
      },
      {
        title: "Passo 2 — Legion Fealty 2 (A Conquista)",
        description:
          "Ative a quest 'Legion Fealty 2: Conquest' com Dage. Você deve viajar por vários mapas de chefes e coletar insígnias de vitória de monstros em /foreshore, /mummies, /binky e outros, repetindo o ciclo até acumular 20 Conquest Wreaths.",
        imageUrl: "",
        imageAlt: "Derrotando chefes pelo mundo de Lore para juntar os Conquest Wreaths",
      },
      {
        title: "Passo 3 — Legion Fealty 3 (Os Contratos)",
        description:
          "Inicie a quest 'Legion Fealty 3: Exalted Crown'. Esse passo exige juntar recursos clássicos da Legião: acumule 40.000 Legion Tokens, Hooded Crowns, Dage's Favors e Dark Tokens até conseguir produzir as 10 Exalted Crowns necessárias.",
        imageUrl: "",
        imageAlt: "Acumulando Legion Tokens e coroas sombrias em Underworld",
      },
      {
        title: "Passo 4 — O Recrutamento Final",
        description:
          "Com os 20 Revenant Spellscrolls, 20 Conquest Wreaths e 10 Exalted Crowns estocados no seu inventário, ative a quest final 'Legion Fealty 4: An Oath' com Dage para resgatar a sua classe Legion Revenant.",
        imageUrl: "",
        imageAlt: "Entrega do juramento final para Dage the Evil e resgate da classe LR",
      },
    ],
  },
  {
    slug: "kings-echo",
    namePt: "Eco do Rei",
    nameEn: "King's Echo",
    category: "class",
    aliases: ["kings echo", "king echo", "alteon class"],
    summary:
      "Guia da classe King's Echo, uma poderosa classe temática do Rei Alteon focada em dano mágico e alta sobrevivência. O farm exige a conclusão de histórias específicas da Lore e o resgate do set real.",
    quest: "Quests da NPC Victoria e Tara em /terminatemple",
    requirements: [
      "Personagem Level 80+",
      "Rank 10 Good e Rank 10 Swordhaven",
      "Saga 'Rumbling of Cold Thunder' totalmente concluída",
      "Armadura 'Alden's Liberation Armor' no inventário",
      "Cerca de 50.000.000 de Gold recomendados para os custos da chain",
    ],
    steps: [
      {
        title: "Passo 1 — Requisitos de Facção e Saga",
        description:
          "Alcance Rank 10 nas reputações Good e Swordhaven. Certifique-se de ter concluído toda a linha de missões da saga Cold Thunder e consiga a Alden's Liberation Armor no merge shop de /blacksmithsanctum.",
        imageUrl: "",
        imageAlt: "Verificação de reputações, progresso na saga Cold Thunder e armadura de liberação",
      },
      {
        title: "Passo 2 — Iniciando em Termina Temple",
        description:
          "Vá para /terminatemple e fale com a Queen Victoria à direita. Complete a quest introdutória 'Familial Blessing' para desbloquear a missão principal 'Echo of the King' com a NPC Tara.",
        imageUrl: "",
        imageAlt: "Aceitando as quests iniciais com Victoria e Tara em Termina Temple",
      },
      {
        title: "Passo 3 — Coleta do Equipamento Real",
        description:
          "Aceite as missões na aba 'Alteon's Gear' com a Victoria. Você precisará forjar e coletar quatro itens fundamentais: a Royal Dragon Sword, o Alden's Mace, a King Alteon's Crown e a Alteon's Reforged Armor através de desafios pelo mapa.",
        imageUrl: "",
        imageAlt: "Farmando os componentes do set real derrotando chefes e completando desafios",
      },
      {
        title: "Passo 4 — Entrega Final e Desbloqueio",
        description:
          "Com todos os quatro equipamentos reais em mãos, complete a quest final 'Echo of the King' com a Tara. Isso liberará permanentemente o shop da classe King's Echo e a badge de conquista.",
        imageUrl: "",
        imageAlt: "Concluindo a missão final e resgatando a classe King's Echo no shop",
      },
    ],
  },
  {
    slug: "yami-no-ronin",
    namePt: "Ronin das Sombras",
    nameEn: "Yami no Ronin",
    category: "class",
    aliases: ["ynr", "yami no ronin", "ronin"],
    summary:
      "Guia da classe Yami no Ronin (YnR), uma das classes de esquiva (dodge) mais poderosas do jogo, excelente para solar chefes que dão dano fatal. O farm é focado em treinamento samurai e itens do submundo.",
    quest: "Quests do NPC Dage the Evil em /underworld",
    requirements: [
      "Personagem Level 80+",
      "Rank 10 Yokai",
      "Classe Bladerunner ou Katanas específicas de farm no inventário",
      "Grandes quantidades de Legion Tokens (caso escolha a rota da Legião)",
    ],
    steps: [
      {
        title: "Passo 1 — O Caminho da Lâmina e Treinamento",
        description:
          "Vá para /yokaiwar e alcance Rank 10 na reputação de Yokai se ainda não tiver. Compre ou farme as katanas clássicas exigidas pelo instrutor, como a Orochi Katana em /orochitower, para provar sua maestria com a espada.",
        imageUrl: "",
        imageAlt: "Alcançando o topo da reputação Yokai e obtendo as katanas de treino",
      },
      {
        title: "Passo 2 — Medalhas e Insígnias de Honra",
        description:
          "Viaje para /shadowfortress e enfrente os samurais sombrios. Complete as quests repetitivas para acumular centenas de Yokai War Medals e Obsidian Katanas, que servirão como base para forjar o aço negro.",
        imageUrl: "",
        imageAlt: "Farmando insígnias de guerra e medalhas com os samurais em Shadowfortress",
      },
      {
        title: "Passo 3 — Selos da Escuridão e Almas",
        description:
          "Seja pela rota de não-membro da Legião ou fazendo as quests de Dage em /underworld, junte Dark Tokens, Legion Tokens e os preciosos Yami Medals derrotando criaturas sombrias e acumulando a energia do submundo.",
        imageUrl: "",
        imageAlt: "Coletando moedas e medalhas da escuridão nas catacumbas do submundo",
      },
      {
        title: "Passo 4 — O Juramento do Ronin e Fusão",
        description:
          "Com todas as katanas purificadas, medalhas Yokai e insígnias do submundo estocadas, entregue a quest de maestria final para receber o selo sombrio e resgatar a classe Yami no Ronin.",
        imageUrl: "",
        imageAlt: "Fusão das lâminas lendárias e desbloqueio da classe Yami no Ronin",
      },
    ],
  },
  {
    slug: "dragon-of-time",
    namePt: "Dragão do Tempo",
    nameEn: "Dragon of Time",
    category: "class",
    aliases: ["dot", "dragon of time", "dragon time"],
    summary:
      "Guia da classe Dragon of Time (DoT), uma classe mágica de Tier 2 com mecânicas únicas baseadas em vida máxima (HP) e dano temporal. O farm reconstrói as memórias do Eternal Dragon of Time.",
    quest: "Quests de Kroto em /chronohub",
    requirements: [
      "Personagem Level 75+",
      "Saga dos 13 Chaos Lords totalmente concluída",
      "Saga de QoM (Queen of Monsters) avançada",
      "Acesso a múltiplos mapas e instâncias de chefes finais do jogo",
    ],
    steps: [
      {
        title: "Passo 1 — Reconstruindo o Passado Cósmico",
        description:
          "Vá para /chronohub e fale com Kroto para abrir as quests de memórias. As primeiras missões exigirão que você viaje no tempo derrotando os Chaos Lords clássicos para coletar fragmentos de suas respectivas essências caóticas.",
        imageUrl: "",
        imageAlt: "Iniciando a linha temporal com Kroto e revisitando os Senhores do Caos",
      },
      {
        title: "Passo 2 — Confluência de Linhas Temporais",
        description:
          "Avance para as quests intermediárias de distorção. Você precisará enfrentar criaturas em mapas de universos alternativos e fendas no tempo como /timespace, /streamwar e /lostruins, acumulando runas e areias do tempo.",
        imageUrl: "",
        imageAlt: "Enfrentando anomalias temporais e monstros nas ruínas do tempo",
      },
      {
        title: "Passo 3 — O Desafio do Sangue e Dragões",
        description:
          "Complete as etapas avançadas caçando grandes dragões elementais de Lore. Farme itens raros derrotando chefes em /dragonplane, /lair e /volcano para infundir o sangue draconiano ancestral no seu amuleto do tempo.",
        imageUrl: "",
        imageAlt: "Caçando dragões anciões para coletar o sangue elemental exigido",
      },
      {
        title: "Passo 4 — Despertar do Dragão Eterno",
        description:
          "Junte os fragmentos de alma purificados do dragão eterno com os catalisadores cósmicos. Complete o nono e último livro de missões com Kroto para desbloquear permanentemente a classe Dragon of Time.",
        imageUrl: "",
        imageAlt: "Concluindo a fusão das memórias e resgatando a classe Dragon of Time",
      },
    ],
  },
  {
    slug: "cryomancer",
    namePt: "Criomante",
    nameEn: "Cryomancer",
    category: "class",
    aliases: ["cryo", "cryomancer", "gelo"],
    summary:
      "Guia da classe Cryomancer, uma classe clássica focada em dano de gelo, redução de velocidade e escudos de proteção. O farm é feito através de quests diárias rápidas em Glacera.",
    quest: "Quests diárias da NPC Syrrus em /northstar ou /frozenpeak",
    requirements: [
      "Personagem Level 30+",
      "História inicial de Glacera concluída",
      "Acesso aos mapas de gelo do continente congelado",
      "Pelo menos 7 dias reais para acumular os tokens diários",
    ],
    steps: [
      {
        title: "Passo 1 — Introdução ao Continente Gelado",
        description:
          "Vá para /frozenpeak ou /northstar e conclua a linha de história local se ainda não tiver feito. Fale com o mago Syrrus para liberar a interface de missões de criomancia.",
        imageUrl: "",
        imageAlt: "Falando com Syrrus nos picos congelados para liberar as missões",
      },
      {
        title: "Passo 2 — O Farm Diário dos Glaceran Tokens",
        description:
          "Aceite a quest diária de Syrrus. Você precisará derrotar monstros de gelo locais ou coletar cristais congelados pelo mapa. Cada conclusão garante um Glaceran Token (limitado a um por dia).",
        imageUrl: "",
        imageAlt: "Derrotando elementais de gelo para cumprir a missão diária",
      },
      {
        title: "Passo 3 — Acumulando os Recursos da Forja",
        description:
          "Repita a missão diária por 7 dias seguidos até acumular 7 Glaceran Tokens. Aproveite para juntar um pouco de ouro extra, necessário para a taxa de merge na loja do NPC.",
        imageUrl: "",
        imageAlt: "Estocando os tokens congelados no inventário ao longo da semana",
      },
      {
        title: "Passo 4 — Congelamento e Merge Final",
        description:
          "Abra a Merge Shop do Syrrus com os 7 tokens em mãos. Selecione a classe Cryomancer, confirme a troca e adicione o poder do zero absoluto permanentemente ao seu inventário.",
        imageUrl: "",
        imageAlt: "Realizando a troca dos tokens na loja para resgatar a classe Cryomancer",
      },
    ],
  },
  {
    slug: "radiant-goddess-of-war",
    namePt: "Radiante Deusa da Guerra",
    nameEn: "Radiant Goddess of War",
    category: "armor",
    aliases: ["rgow", "radiant goddess", "goddess of war"],
    summary:
      "Guia da Radiant Goddess of War (RGoW), a armadura end-game suprema que concede o maior bônus de dano geral do jogo (50% contra todas as tags) e bônus de utilidade. O farm exige derrotar semanalmente os Ultra Bosses mais difíceis de Lore.",
    quest: "Quests de Forge e Customização da NPC Tara em /battleon",
    requirements: [
      "Personagem Level 100",
      "Goddess of War Armor (versão base obtida em /gargoyle)",
      "Múltiplas Insígnias Semanais de Ultra Bosses (Ultra Speaker, Ultra Malgor, Ultra Drago, etc.)",
      "Grandes quantidades de materiais de Forge (Aura de Ambição, Determinação e Domínio)",
      "Pelo menos 30 espaços livres no inventário para gerenciar os reagentes",
    ],
    steps: [
      {
        title: "Passo 1 — A Conquista da Armadura Base",
        description:
          "Vá até /gargoyle ou complete a linha de história da Deusa da Guerra para liberar o acesso ao shop básico. Junte os recursos elementais iniciais e o ouro necessário para comprar a versão padrão da Goddess of War Armor.",
        imageUrl: "",
        imageAlt: "Obtendo a armadura de base da Deusa da Guerra nos mapas de história",
      },
      {
        title: "Passo 2 — O Grind Semanal de Ultra Insígnias",
        description:
          "Monte grupos estratégicos para enfrentar os Ultra Bosses semanais mais difíceis do jogo. Você precisará coletar dezenas de Malgor Insignias (/ultramalgor), Speaker Insignias (/ultraspeaker) e Drago Insignias (/ultradrago) ao longo de várias semanas reais.",
        imageUrl: "",
        imageAlt: "Enfrentando Ultra Malgor e Ultra Speaker com times coordenados para pegar insígnias",
      },
      {
        title: "Passo 3 — Desbloqueando as Forjas de Elite",
        description:
          "Complete as linhas de quests de 'Forge' de alto nível com a NPC Tara em /battleon. Você precisará converter suas insígnias e recursos globais nas três essências divinas: o Fragment of Ambition, Fragment of Determination e Fragment of Dominion.",
        imageUrl: "",
        imageAlt: "Purificando as insígnias semanais em fragmentos de virtudes de forja",
      },
      {
        title: "Passo 4 — A Ascensão Radiante Final",
        description:
          "Reúna a armadura base da Goddess of War, as essências divinas de Forge e o montante final de ouro exigido. Acesse o menu de merge final para forjar a Radiant Goddess of War e liberar os maiores buffs de combate do AQW.",
        imageUrl: "",
        imageAlt: "Fusão de todas as insígnias e fragmentos divinos para resgatar a RGoW",
      },
    ],
  },
  {
    slug: "vibrant-valor-high-halo",
    namePt: "Auréola Suprema do Valor Vibrante",
    nameEn: "Vibrant Valor High Halo",
    category: "helm",
    aliases: ["vibrant valor halo", "vibrant halo"],
    summary:
      "Guia da Vibrant Valor High Halo. Esta é a versão aprimorada e animada do elmo original, obtida através de uma receita de merge que consome a versão base do baú.",
    quest: "Quests de Customização Divina da NPC Tara em /battleon",
    requirements: [
      "Valor High Halo no inventário (obtido nos Treasure Chests do Twilly)",
      "Essências elementais e moedas de alta patente exigidas no shop",
      "Aproximadamente 500.000 de Gold para a taxa de fusão",
    ],
    steps: [
      {
        title: "Passo 1 — Garanta o Elmo de Base",
        description:
          "Antes de tudo, você precisa ter conquistado o Valor High Halo padrão abrindo os baús de tesouro com as Magic Keys no NPC Twilly.",
        imageUrl: "",
        imageAlt: "Verificando a posse do Valor High Halo original no inventário",
      },
      {
        title: "Passo 2 — Acesse o Shop da Tara",
        description:
          "Vá para /battleon e abra as opções de customização com a NPC Tara. Localize a receita da versão Vibrante na lista de merges celestiais.",
        imageUrl: "",
        imageAlt: "Abrindo a interface de troca divina com a NPC Tara",
      },
      {
        title: "Passo 3 — Fusão e Upgrade do Item",
        description:
          "Entregue o seu elmo base junto com o ouro exigido para realizar o upgrade. O item antigo será consumido para gerar a nova versão com animações exclusivas na auréola.",
        imageUrl: "",
        imageAlt: "Confirmando o merge e recebendo a versão Vibrant Valor High Halo",
      },
    ],
  },
  {
    slug: "dark-high-halo",
    namePt: "Auréola Suprema das Sombras",
    nameEn: "Dark High Halo",
    category: "helm",
    aliases: ["dark halo", "dark high halo", "black friday halo"],
    summary:
      "Guia do Dark High Halo. Uma variante sombria e de cabelos customizáveis lançada originalmente em eventos de Black Friday. O farm é feito derrotando um chefe específico na Celestial Arena.",
    quest: "Missões de Rank com a NPC Aranx em /celestialarena",
    requirements: [
      "Personagem Level 55+ recomendado",
      "Progresso nas quests iniciais da arena (liberar até a quest 11-20)",
      "Status do item: Seasonal Rare (disponível por tempo limitado durante eventos especiais)",
    ],
    steps: [
      {
        title: "Passo 1 — Acesso à Celestial Arena",
        description:
          "Digite /join celestialarena no chat. Passe pela porta principal, fale com o NPC Aranx e acesse a aba de missões do bloco intermediário (quests 11 a 21).",
        imageUrl: "",
        imageAlt: "Acessando os painéis de missões avançadas com Aranx na Celestial Arena",
      },
      {
        title: "Passo 2 — Aceitando o Desafio de Carrick",
        description:
          "Selecione e aceite a missão 'Battle Blessed Carrick'. Atravesse o portal de luz da arena para ser teleportado diretamente para a sala de combate C.",
        imageUrl: "",
        imageAlt: "Aceitando o desafio do boss Carrick para liberar o portal de entrada",
      },
      {
        title: "Passo 3 — O Farm do Drop Sombrio",
        description:
          "Derrote o monstro Blessed Carrick repetidamente. Ele possui cerca de 26.000 HP e o Dark High Halo dropa diretamente dele com uma taxa de drop moderada.",
        imageUrl: "",
        imageAlt: "Batalhando contra o Blessed Carrick na Arena C até que o elmo drope",
      },
    ],
  },
  {
    slug: "mirror-dark-high-halo",
    namePt: "Auréola Suprema do Espelho Sombrio",
    nameEn: "Mirror Dark High Halo",
    category: "helm",
    aliases: ["mirror dark halo", "mirror halo"],
    summary:
      "Guia do Mirror Dark High Halo. Variante espelhada com mechas invertidas lançada junto com a linha de Black Friday. Compartilha a mesma rota de farm de chefes da arena celestial.",
    quest: "Missões de Rank com a NPC Aranx em /celestialarena",
    requirements: [
      "Personagem Level 55+ recomendado",
      "Acesso liberado às lutas da Arena C",
      "Status do item: Seasonal Rare (disponível por tempo limitado durante eventos especiais)",
    ],
    steps: [
      {
        title: "Passo 1 — Preparação da Rota de Combate",
        description:
          "Vá para /celestialarena e ative novamente a missão do Blessed Carrick com o NPC Aranx. Certifique-se de que o seu inventário tem espaço para o drop.",
        imageUrl: "",
        imageAlt: "Ativando a quest de boss com o painel da arena celestial",
      },
      {
        title: "Passo 2 — O Grind do Drop Invertido",
        description:
          "Entre no portal e enfrente o Blessed Carrick. O Mirror Dark High Halo faz parte da mesma pool de recompensas do chefe anterior, exigindo insistência nas eliminações consecutivas.",
        imageUrl: "",
        imageAlt: "Derrotando o Blessed Carrick na Arena C focando no drop espelhado",
      },
    ],
  },
  {
    slug: "valor-high-halo",
    namePt: "Auréola Suprema do Valor",
    nameEn: "Valor High Halo",
    category: "helm",
    aliases: ["valor halo", "high halo", "valor high"],
    summary:
      "Guia para obter o Valor High Halo. Este elmo clássico com cabelo customizável e auréola prateada animada é uma recompensa aleatória e exclusiva obtida ao abrir os Baús de Tesouro lendários do Twilly.",
    quest: "Open Treasure Chests! com o NPC Twilly em /battleon ou /8bitbattleon",
    requirements: [
      "Treasure Chests no inventário (dropados aleatoriamente por qualquer monstro global)",
      "Magic Keys (compradas por 200 ACs cada com o Twilly ou gratuitas mensais para Members)",
      "Espaço livre no inventário para receber as pools de drops do baú",
    ],
    steps: [
      {
        title: "Passo 1 — Acumular os Treasure Chests",
        description:
          "Derrote monstros comuns por toda Lore. Praticamente qualquer criatura do jogo possui uma chance global de dropar o item de inventário 'Treasure Chest'. Junte uma boa quantidade deles.",
        imageUrl: "",
        imageAlt: "Farmando monstros comuns pelo mundo para coletar Treasure Chests globais",
      },
      {
        title: "Passo 2 — Adquirir as Magic Treasure Chest Keys",
        description:
          "Fale com o NPC Twilly na cidade principal. Acesse a Key Shop para comprar suas 'Magic Keys' por 200 ACs cada. Caso você seja jogador Member, lembre-se de resgatar suas chaves gratuitas do mês.",
        imageUrl: "",
        imageAlt: "Comprando as chaves Magic Keys ou resgatando o benefício mensal com o Twilly",
      },
      {
        title: "Passo 3 — Aceitar a Quest com o Twilly",
        description:
          "Clique no Twilly em /battleon ou /8bitbattleon e selecione a aba de quests de baús. Ative a missão repetitiva 'Open Treasure Chests!', que consumirá exatamente uma chave e um baú do seu inventário por entrega.",
        imageUrl: "",
        imageAlt: "Ativando a missão repetitiva de abertura de baús com o NPC Twilly",
      },
      {
        title: "Passo 4 — Rodar a Roleta até Dropar",
        description:
          "Complete a missão consecutivamente. Como o Valor High Halo é uma das dezenas de recompensas com drop rate baseado em sorte dentro do baú, continue entregando a quest até que o elmo seja enviado para seu inventário.",
        imageUrl: "",
        imageAlt: "Entrega consecutiva de chaves e resgate aleatório do Valor High Halo",
      },
    ],
  },
  {
    slug: "scion-of-flames",
    namePt: "Herdeiro das Chamas",
    nameEn: "Scion of Flames",
    category: "class",
    aliases: ["scion of flames", "sof", "scion flames"],
    summary:
      "Guia da classe Scion of Flames, uma variante end-game escalada da classe Pyromancer potencializada pelas quatro forjas da Magnum Opus. O farm exige completar a saga Flame of the Beyond e forjar quatro armaduras elementais exclusivas.",
    quest: "Quest de Aleister em /rubedopeak",
    requirements: [
      "Personagem Level 80+",
      "Saga 'Flame of the Beyond' totalmente concluída",
      "Rank 10 Yew Mountains e Rank 10 Embersea",
      "Classe Pyromancer (Rank 10) e o item Flame Sigil obtido em /fireforge",
      "Cerca de 7.500.000 de Gold para os Gold Vouchers das armaduras",
    ],
    steps: [
      {
        title: "Passo 1 — Pré-requisitos de Saga e Reputação",
        description:
          "Conclua toda a história principal de 'Flame of the Beyond'. Alcance o Rank 10 nas reputações de Embersea e Yew Mountains, e certifique-se de possuir a classe Pyromancer no seu inventário para comprar o Flame Sigil com o NPC em /fireforge.",
        imageUrl: "",
        imageAlt: "Verificação da história de chamas concluída, reputações e posse da classe Pyromancer",
      },
      {
        title: "Passo 2 — Coleta das Chamas Elementais",
        description:
          "Viaje por Lore completando quests repetitivas para acumular as essências das quatro forjas mágicas: colete a White Flame em /forgealbedo, a Yellow Flame em /fortluma, a Black Flame em /mountmaleno e a Red Flame em Warwick Forest.",
        imageUrl: "",
        imageAlt: "Viajando e farmando as chamas coloridas de Albedo, Citrinitas, Maleno e Rubedo",
      },
      {
        title: "Passo 3 — A Forja das Quatro Armaduras",
        description:
          "Use as chamas elementais coletadas junto com materiais adicionais (Steel Ingots em /thelima, Aiwass Diamonds e Yew Embers) combinados com Gold Vouchers para comprar as armaduras: Flame of Maleno, Flame of Albedo, Flame of Citrinitas e Flame of Rubedo.",
        imageUrl: "",
        imageAlt: "Forjando os quatro conjuntos de armaduras elementais necessários para o desafio",
      },
      {
        title: "Passo 4 — O Sacrifício e Conclusão",
        description:
          "Vá para /rubedopeak e derrote o chefe final para obter as insígnias 'Flame of the Magnum Opus'. Com a armadura Aleister the Dawnseeker e as quatro armaduras elementais em mãos, entregue a quest final com Aleister para receber a classe Scion of Flames.",
        imageUrl: "",
        imageAlt: "Entrega das armaduras rituais em Rubedo Peak e desbloqueio da classe Scion of Flames",
      },
    ],
  },
  {
    slug: "helm-of-the-highlord",
    namePt: "Elmo do Altivo",
    nameEn: "Helm of the Highlord",
    category: "helm",
    aliases: ["vhl helm", "helm of highlord", "elmo vhl"],
    summary:
      "Guia do Helm of the Highlord. Este elmo cosmético oficial faz parte do conjunto temático da Void Highlord e é obtido simultaneamente no mesmo desafio da classe.",
    quest: "Void HighLord's Challenge em /tercessuinotlim",
    requirements: [
      "Mesmos requisitos da quest da classe Void Highlord",
      "Hadean Onyx of Nulgath e Voucher (non-member) no inventário",
    ],
    steps: [
      {
        title: "Passo 1 — Ativação do Desafio do Highlord",
        description:
          "Entre na sala do NPC Void Highlord em /tercessuinotlim. Certifique-se de preencher os requisitos iniciais de level 80 e os itens fixos para conseguir abrir a interface de missões.",
        imageUrl: "",
        imageAlt: "Interface da quest com os requerimentos do elmo e da armadura",
      },
      {
        title: "Passo 2 — Coleta e Drop do Elmo",
        description:
          "Entregue os materiais da quest (Elders' Blood, Unidentified 13, Gold, e moedas da Nation). Ao completar qualquer uma das tentativas da missão, o Helm of the Highlord dropará como uma das recompensas garantidas da pool.",
        imageUrl: "",
        imageAlt: "Entrega da quest coletando os cosméticos da armadura e do elmo",
      },
    ],
  },
  {
    slug: "hood-of-awe",
    namePt: "Capuz de Awe",
    nameEn: "Hood of Awe",
    category: "helm",
    aliases: ["hood of awe", "capuz de awe", "helm awe"],
    summary:
      "Guia para obter o Hood of Awe. Parte do icônico set de Awe, concede bônus permanentes de experiência, reputação, ouro e classe quando equipado.",
    quest: "Quests de Valencia em /museum",
    requirements: [
      "Rank 10 Blade of Awe",
      "Acesso ao Museum e insígnias completas da espada",
      "Aproximadamente 1.500.000 de Gold",
    ],
    steps: [
      {
        title: "Passo 1 — Obter os fragmentos do Elmo",
        description:
          "Converse com a NPC Valencia em /museum e abra a linha de missões 'Armor of Awe'. Aceite o desafio do elmo e derrote monstros específicos indicados na quest até dropar os Helm Fragments.",
        imageUrl: "",
        imageAlt: "Falando com Valencia no Museum para ativar a linha Awe",
      },
      {
        title: "Passo 2 — Forja no Museum Shop",
        description:
          "Com os fragmentos coletados e o ouro necessário, compre a peça base e dê o merge final para adicionar o Hood of Awe permanentemente ao seu inventário.",
        imageUrl: "",
        imageAlt: "Loja de merge da Valencia fabricando o item cosmético com bônus",
      },
    ],
  },

  {
    slug: "archfiend-doomlord",
    namePt: "Armadura ArchFiend DoomLord",
    nameEn: "ArchFiend DoomLord",
    category: "armor",
    aliases: ["afdl", "archfiend doomlord", "armadura 35%", "nulgath", "oblivion"],
    summary:
      "Guia da ArchFiend DoomLord, armadura Epic de Tercessuinotlim que concede 35% de dano contra qualquer monstro e 25% a mais de class points, XP, gold e reputation. A cadeia exige nível 75, Contract With the Abyss e uma longa lista de reagentes de Nulgath.",
    quest:
      "Oblivion's Quests — /tercessuinotlim — NPC Oblivion (Willpower Extraction → Nulgath Demands Work → Enough DOOM for an Archfiend)",
    requirements: [
      "Nível 75 e Contract With the Abyss concluído",
      "Shadow Lich, Facebreakers of Nulgath, Mystic Tribal Sword, Nulgath's Approval x50 e Totem of Nulgath",
      "Unidentified 34 x10, Unidentified 13, Unidentified 27, Voucher of Nulgath, Gem of Nulgath x15, Blood Gem of the Archfiend x2 e Golden Hanzo Void",
      "Para a etapa final: Unidentified 35, Blood Gem of the Archfiend x10, Archfiend's Favor x5.000, Undead Essence x1.000, Essence of Nulgath x100, Essence of Klunk, Chaorruption Essence x75, Essence Potion x5, Living Star Essence x100 e Aelita's Emerald",
      "Confira as quantidades no Wiki antes de começar: drops variáveis e boosts podem alterar o total efetivo",
    ],
    steps: [
      {
        title: "Passo 1 — Desbloqueie Oblivion",
        description:
          "Entre em /tercessuinotlim, fale com Oblivion e abra Oblivion's Quests. Confirme o nível 75 e Contract With the Abyss antes de investir tempo nos reagentes.",
        imageUrl: "",
        imageAlt: "Oblivion em Tercessuinotlim, ponto de início da cadeia ArchFiend DoomLord",
      },
      {
        title: "Passo 2 — Complete Willpower Extraction",
        description:
          "Reúna Shadow Lich, Koi Fish in a Sphere, Necrot x5, Chaoroot x5, Doomatter x5, Facebreakers of Nulgath, Mystic Tribal Sword, Nulgath's Approval x50 e Totem of Nulgath. A recompensa inclui Unidentified 34 em quantidade variável, então não presuma um total fixo.",
        imageUrl: "",
        imageAlt: "Lista de materiais de Willpower Extraction e Unidentified 34",
      },
      {
        title: "Passo 3 — Complete Nulgath Demands Work",
        description:
          "Entregue Unidentified 34 x10 junto de Unidentified 13, Unidentified 27, Voucher of Nulgath, Gem of Nulgath x15, Blood Gem of the Archfiend x2 e Golden Hanzo Void. Escolha uma das quatro recompensas de equipamento e repita até ter Doomblade of Destruction, DoomLord's War Mask, ShadowFiend Cloak e Locks of the DoomLord.",
        imageUrl: "",
        imageAlt: "Quatro recompensas de equipamento de Nulgath Demands Work",
      },
      {
        title: "Passo 4 — Entregue Enough DOOM for an Archfiend",
        description:
          "Com Unidentified 35 e os reagentes finais reunidos, conclua Enough DOOM for an Archfiend para receber a armadura. A atualização oficial de julho de 2026 alterou requisitos antigos; confira a versão atual da quest antes do farm.",
        imageUrl: "",
        imageAlt: "Quest Enough DOOM for an Archfiend concedendo a armadura",
      },
      {
        title: "Passo 5 — Obtenha o badge",
        description:
          "Mantenha a armadura e os quatro equipamentos escolhíveis no inventário. Entregue Essence of Nulgath x1 na quest ArchFiend DoomLord Badge para registrar o badge na Character Page.",
        imageUrl: "",
        imageAlt: "ArchFiend DoomLord Badge de Character Page",
      },
    ],
  },
  {
    slug: "awe-enhancements-awethurs-accoutrements",
    namePt: "Acessórios de Awethur",
    nameEn: "Awethur's Accoutrements",
    category: "other",
    aliases: ["awethur", "gear of awe", "awe enhancements", "blade of awe", "enhancements of awe"],
    summary:
      "Guia da progressão da Blade of Awe em Valencia para liberar Awethur's Accoutrements e as lojas de Awe Enhancements. O fluxo passa pelas cinco quests Find da cadeia e exige Rank 6 Blade of Awe para a compra.",
    quest:
      "Valencia's Quests — /museum — NPC Valencia (Find the Stonewrit! → Find the Handle! → Find the Hilt! → Find the Blade! → Find the Runes!)",
    requirements: [
      "Acesso ao mapa /museum e interação com Valencia",
      "Completar em ordem Find the Stonewrit!, Find the Handle!, Find the Hilt!, Find the Blade! e Find the Runes!",
      "Rank 6 Blade of Awe para comprar Awethur's Accoutrements e as Awe Enhancements",
      "Para a rota opcional doméstica: Apocryphal Blade Of The Truth e a quest Awe Enhancements At Home",
    ],
    steps: [
      {
        title: "Passo 1 — Vá ao Museum",
        description:
          "Abra /museum e interaja com Valencia. Use a opção To The CrossRoads quando ela aparecer para iniciar a cadeia da Blade of Awe.",
        imageUrl: "",
        imageAlt: "NPC Valencia no Museum de AQWorlds",
      },
      {
        title: "Passo 2 — Faça a cadeia da Blade of Awe",
        description:
          "Complete Find the Stonewrit! contra Dragons of Lore, Find the Handle! contra Elementals of Lore, Find the Hilt! contra Undead of Lore, Find the Blade! contra Chaos Beasts of Lore e Find the Runes! contra Chaos Lords of Lore. Cada etapa exige a anterior.",
        imageUrl: "",
        imageAlt: "Sequência das cinco quests da Blade of Awe no painel de Valencia",
      },
      {
        title: "Passo 3 — Desbloqueie as lojas de Awe",
        description:
          "Depois de concluir Find the Runes!, acesse Gear of Awe e as lojas Fighter, Healer, Hybrid, Lucky, Thief e Wizard Awe Enh em Valencia — Museum. O Rank 6 Blade of Awe é o requisito de compra informado pelo Wiki.",
        imageUrl: "",
        imageAlt: "Lojas Gear of Awe e Awe Enhancements no Museum",
      },
      {
        title: "Passo 4 — Compre Awethur's Accoutrements",
        description:
          "Na Gear of Awe, selecione Awethur's Accoutrements. A listagem atual informa Rank 6 Blade of Awe e preço de 0 AC; equipado, o item concede 15% de bônus a Class Points, EXP, Gold e Reputation.",
        imageUrl: "",
        imageAlt: "Awethur's Accoutrements listado entre as armas da Gear of Awe",
      },
      {
        title: "Passo 5 — Escolha sua Awe Enhancement",
        description:
          "Com as lojas abertas, compre a enhancement Fighter, Healer, Hybrid, Lucky, Thief ou Wizard adequada à sua build. A rota Awe Enhancements At Home é opcional e usa o Apocryphal Blade Of The Truth para obter um Wall Awe Plaque.",
        imageUrl: "",
        imageAlt: "Painel de Awe Enhancements e Wall Awe Plaque em uma casa",
      },
    ],
  },
  {
    slug: "forge-enhancements",
    namePt: "Aprimoramentos Forge",
    nameEn: "Forge Enhancements",
    category: "other",
    aliases: ["forge", "blacksmithing", "forge enhancements", "cysero's forge", "traits"],
    summary:
      "Guia da reputação Blacksmithing para desbloquear e aplicar aprimoramentos Forge em armas, capacetes e capas. O processo envolve subir a facção, concluir a quest do slot e depois fazer os traits individualmente.",
    quest:
      "Cysero's Forge's Quests — /forge — Cysero's Forge (Forge Weapon Enhancement, Forge Cape Enhancement e Forge Helmet Enhancement)",
    requirements: [
      "Nível 30",
      "Rank 4 de Blacksmithing para Weapon e Cape conforme a documentação atual; confirme o rank exibido no jogo, pois anúncios antigos citam Rank 3",
      "Para Weapon: 1st Lord Of Chaos Helm, Chaos Dragonlord Helm, Chaos Shogun Helmet e Wolfwing Mask",
      "Para Cape: Prismatic Celestial Wings, Broken Wings, Shadow's Wings e Wings Of Destruction",
      "Para Helmet: 1st Lord of Chaos Staff, Chaos Dragonlord Axe, Hanzamune Dragon Koi Blade e Wrath of the Werepyre",
    ],
    steps: [
      {
        title: "Passo 1 — Chegue à Forge",
        description:
          "Vá ao mapa /forge e procure Cysero's Forge. É ali que ficam as quests-base e as lojas dos aprimoramentos Forge.",
        imageUrl: "",
        imageAlt: "Cysero's Forge e a bigorna no mapa Forge",
      },
      {
        title: "Passo 2 — Suba a reputação Blacksmithing",
        description:
          "Faça as quests disponíveis de Blacksmithing com Cysero's Forge/Cysero's Quests até alcançar o rank necessário. Use a página da facção como checklist e confirme o rank no cliente, porque a documentação histórica mudou.",
        imageUrl: "",
        imageAlt: "Painel de reputação da facção Blacksmithing",
      },
      {
        title: "Passo 3 — Escolha o slot",
        description:
          "Aceite Forge Weapon Enhancement, Forge Cape Enhancement ou Forge Helmet Enhancement. Os quatro itens exigidos mudam de acordo com o slot; não misture as listas de entrega.",
        imageUrl: "",
        imageAlt: "Janela de quest de desbloqueio de um aprimoramento Forge",
      },
      {
        title: "Passo 4 — Conclua o desbloqueio",
        description:
          "Entregue os quatro itens da quest escolhida e finalize com Cysero's Forge. A recompensa libera a loja/padrão daquele slot, mas não concede automaticamente todos os traits avançados.",
        imageUrl: "",
        imageAlt: "Recompensa de conclusão de uma quest Forge",
      },
      {
        title: "Passo 5 — Faça os traits e aplique",
        description:
          "Para Lacerate, Smite, Praxis, Valiance, Arcana's Concerto, Dauntless, Ravenous e outros traits, verifique a quest individual, o rank e a saga exigidos. Depois aplique o aprimoramento na loja correspondente; a aplicação usa Gold.",
        imageUrl: "",
        imageAlt: "Loja de Forge Enhancements para aplicar um trait ao equipamento",
      },
    ],
  },

];
