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

## Autenticação própria (API + app)

**O que foi feito:** criamos a PetLife-API (Node, TypeScript e Express, em `../PetLife-API`) com cadastro, login, renovação, saída e `/me`, e o app passou a usar essa API no lugar do login simulado.

**Por quê:** para aprender como a autenticação funciona de verdade, sem serviço pronto. Cada peça tem um motivo: senha só como hash (bcrypt); token de acesso curto (15 min) que prova quem é; token de renovação longo (7 dias), guardado só como hash no servidor e usado uma vez só.

**Arquivos:** API em `../PetLife-API/src` (routes, controllers, services, middlewares, repositories). App: `features/auth/api/auth.api.ts`, `shared/api/http.client.ts`, `shared/api/tokenStorage.ts`, `providers/AuthProvider.tsx`, `docs/auth.md`.

**Conceitos:** hash com sal e custo (bcrypt); JWT (cabeçalho, conteúdo e assinatura) e por que só HS256; rotação de refresh token e detecção de reuso; mensagem de erro genérica contra enumeração de contas; limite de tentativas; armazenamento seguro (Keychain e Keystore) contra AsyncStorage; renovar o token uma única vez ao tomar 401.

**Perguntas de entrevista:**
- Por que guardar hash da senha e não a senha criptografada? O que o bcrypt faz que um SHA-256 não faz?
- O que tem dentro de um JWT? Ele é criptografado? O que impede alguém de alterar o conteúdo?
- Por que o token de acesso dura 15 minutos e o de renovação 7 dias? Por que rotacionar o de renovação?
- O que acontece se um refresh token antigo for usado de novo? Como o servidor percebe um roubo?
- Por que o login responde igual para "e-mail não existe" e "senha errada"? E por que o cadastro responde 409?
- Onde guardar tokens num app mobile e por que não em AsyncStorage?
- Duas requisições recebem 401 ao mesmo tempo: como evitar renovar o token duas vezes?

