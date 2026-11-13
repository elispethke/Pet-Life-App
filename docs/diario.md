# Diário de aprendizado do PetLife

Registro de cada etapa, para estudar, preparar entrevistas e montar o curso. O Claude adiciona uma entrada ao concluir cada passo.

Modelo de entrada:
- **O que foi feito:** em poucas linhas.
- **Por quê:** a decisão e as alternativas que descartamos.
- **Arquivos:** onde ficou cada coisa.
- **Conceitos:** o que aprender com este passo.
- **Perguntas de entrevista:** o que alguém poderia perguntar sobre isso.

---

## Etapa 0: projeto e base

**O que foi feito:** criamos o projeto Expo com TypeScript (`PetLife-App`), definimos StyleSheet como forma de estilizar, criamos os tokens de tema e carregamos as fontes Fredoka e Nunito.

**Por quê:**
- StyleSheet em vez de NativeWind: é o padrão do React Native, o que mais se pede em vagas, e combina com a arquitetura de um arquivo `.styles.ts` por componente.
- Tokens de tema (cores, fontes, espaços): um único lugar para mudar a identidade visual, sem números soltos nas telas.
- Em React Native cada peso de fonte customizada é uma família própria (`Fredoka_600SemiBold`), por isso `fontFamily` é separado por peso e não existe `fontWeight` nos tokens.

**Arquivos:**
- `src/shared/theme/colors.ts`, `typography.ts`, `spacing.ts`, `fonts.ts`, `index.ts`
- `App.tsx` (placeholder que carrega as fontes)

**Conceitos:** Expo e Expo Go, TypeScript em React Native, StyleSheet, design tokens, carregamento de fontes com `useFonts` e tela de abertura (`expo-splash-screen`), importar cada peso de fonte pelo caminho próprio para reduzir o tamanho do app.

**Perguntas de entrevista:**
- Por que não usar `fontWeight` com uma fonte customizada no React Native?
- O que são design tokens e que problema resolvem?
- Qual a diferença entre StyleSheet e uma biblioteca como NativeWind, e quando você escolheria cada uma?

## Etapa 0.5: produto, telas e arquitetura (documentação)

**O que foi feito:** documentamos o produto, desenhamos 14 telas, definimos a arquitetura por feature, o modelo de dados e a API, e decidimos a autenticação própria, o backend próprio e o plano anual de €19.

**Por quê:** decidir antes de codar evita retrabalho e serve de material de entrevista e de curso. Escolhemos criar nosso próprio backend e banco para mostrar o sistema completo no portfólio.

**Arquivos:** `docs/product.md`, `docs/screens.md`, `docs/architecture.md`, `docs/screens/*.png`, `docs/assets/pet-illustration.svg`, `CLAUDE.md`.

**Conceitos:** arquitetura por feature, separação de responsabilidades (tela, hook, api), regras de dependência entre pastas, mock com a mesma interface da versão real.

**Perguntas de entrevista:**
- Por que organizar por feature e não por tipo de arquivo (components, hooks, screens na raiz)?
- Por que a API precisa validar o token em toda requisição, e não confiar no app?
- O que é IAP e por que não dá para usar só o Stripe numa assinatura dentro do app nas lojas?
