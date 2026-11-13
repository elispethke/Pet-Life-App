# PetLife: navegação (fonte única das rotas)

Atualize esta tabela sempre que criar ou mudar uma rota. Rotas em inglês e minúsculas; textos da tela em português.

## Como a navegação funciona
- **Uma única proteção por login**, na raiz (`src/app/_layout.tsx`): com sessão só existe o grupo `(app)`; sem sessão só o grupo `(auth)`.
- **Um único redirecionamento de destino**, na rota `/` (`src/app/index.tsx`): sem sessão vai para `/welcome`; com sessão e sem pet vai para `/new-pet`; com sessão e pet vai para `/home`. Ao entrar ou sair, o Router volta para `/` e ela decide.
- "Ainda não tem pet" não é proteção: ao salvar o pet, `NewPet` faz `router.replace('/home')`.
- Abas (`(app)/(tabs)`): `/home`, `/wallet`, `/routine`, `/plan`. A barra inferior tem 5 itens; **Escanear** (central) não é uma aba: abre `/scan-card` pelo `useFeatureGate`.
- Telas por cima das abas (`(app)`): `/scan-card`, `/review-scan`, `/vaccines`, `/food-analysis`, cada uma com botão de voltar. Modais: `/routine-new` e `/feature-locked`.
- Bloqueio por plano: `useFeatureGate` (único ponto). Nesta fase está desligado (`PLAN_ENFORCED = false`), então tudo está liberado.

## Rotas

| Tela | Caminho | Grupo | Quem leva até ela | Para onde ela vai |
|---|---|---|---|---|
| (entrada) | `/` | raiz | abrir o app; entrar ou sair da conta | `/welcome`, `/new-pet` ou `/home` (redirecionamento) |
| Abertura | `/welcome` | `(auth)` | `/` sem sessão | "Continuar" → `/login` |
| Login | `/login` | `(auth)` | Abertura ("Continuar"); Criar conta ("Entrar") | "Criar conta" → `/signup` (replace); voltar → `/welcome`; entrar → `/` (→ `/new-pet` ou `/home`) |
| Criar conta | `/signup` | `(auth)` | Login ("Criar conta") | "Entrar" → `/login` (replace); voltar; criar conta → `/` (→ `/new-pet`) |
| Novo pet | `/new-pet` | `(app)` | `/` com sessão e sem pet | "Continuar" → `/home` (replace) |
| Início | `/home` | `(app)` aba | `/`; Novo pet; aba Início | cartão de lembrete → `/vaccines`; atalho "Escanear carteirinha" → `/scan-card`; atalho "Analisar ração" → `/food-analysis` |
| Carteira digital | `/wallet` | `(app)` aba | aba Carteira; Revisar leitura ("Salvar na carteira") | cartão de vacina → `/vaccines`; "Compartilhar" → `/feature-locked` (com bloqueio ligado) |
| Rotina | `/routine` | `(app)` aba | aba Rotina | "Novo horário" → `/routine-new`; cartão de nota → `/food-analysis`; tocar no cartão marca como feito |
| Plano | `/plan` | `(app)` aba | aba Plano; Recurso bloqueado ("Ver o plano") | "Assinar por €19" liga o plano (simulado) |
| Escanear carteirinha | `/scan-card` | `(app)` por cima das abas | botão central da barra; atalho do Início | captura ou galeria → `/review-scan`; voltar |
| Revisar leitura | `/review-scan` | `(app)` por cima das abas | Escanear carteirinha | "Salvar na carteira" → `/wallet`; voltar |
| Vacinas e lembretes | `/vaccines` | `(app)` por cima das abas | Início (lembretes); Carteira (cartões) | voltar |
| Análise da ração | `/food-analysis` | `(app)` por cima das abas | Início (atalho); Rotina (nota) | voltar |
| Novo horário | `/routine-new` | `(app)` modal | Rotina ("Novo horário") | "Salvar" e voltar → `/routine` |
| Recurso bloqueado | `/feature-locked` | `(app)` modal | `useFeatureGate` (com bloqueio ligado): aba Rotina, botão central, atalhos do Início, nota da Rotina, Compartilhar | "Ver o plano" → `/plan`; "Agora não" e toque fora fecham |
