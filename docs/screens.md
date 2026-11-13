# PetLife: telas e design

Os PNGs ficam em `docs/screens/`. Antes de implementar uma tela, abra a imagem correspondente e use-a como referência visual. Os dados nas imagens são exemplos (pet "Thor", golden retriever, tutora "Marina").
O desenho do pet (cachorro e gato) da tela de abertura está em `docs/assets/pet-illustration.svg`.
Referência completa, com as 14 telas lado a lado: `../petlife-mvp.html` (na pasta acima de PetLife-App).

## Identidade visual
- **Fundo amarelo, detalhes roxos.** Telas claras usam fundo `#FFF3C4`; telas de destaque (abertura) usam amarelo cheio `#FFC21A`.
- Cores (já em `src/shared/theme/colors.ts`): roxo uva `#5B2A9E` (ação, ícones), amarelo manga `#FFC21A`, lavanda `#CDBDF2` (apoio, chips), roxo profundo `#2A1050` (texto principal), `#6B4F00` (texto secundário sobre amarelo), branco para cartões.
- **Status** (só para estado, nunca decoração): verde `#14975F` em dia, amarelo atenção, coral `#E5484D` vencida. Chips: fundo claro da cor e texto escuro da cor.
- **Fontes:** Fredoka (títulos e números grandes) e Nunito (texto). Pesos leves: Fredoka 500 a 700, Nunito 400 a 700. Títulos de tela em Fredoka 500. **Sem sombra em texto e sem sombras fortes.**
- Botão principal: pílula roxa com texto branco, altura 46, um por tela. Botão central da barra: círculo roxo de 48 com ícone de escanear, elevado sobre a barra.
- Cartões brancos com raio 20 e borda lavanda clara; chips em pílula (raio 999); campos de texto com raio 14, borda de 2 em lavanda clara, rótulo pequeno em maiúsculas dentro do campo; cartão do pet com gradiente amarelo, raio 24 e um círculo roxo decorativo no canto inferior direito.
- Ícones de traço de 2 px, cantos arredondados.
- Tom de voz: curto, direto, ativo ("Salvar na carteira", "Já fiz"). Sem emoji como marcador.

## Navegação
- **Antes do login** (grupo `(auth)`): Abertura, Login, Criar conta. Sem barra inferior.
- **Depois do login** (grupo `(app)`): na primeira vez, Novo pet; depois, a barra inferior com 5 itens: **Início, Carteira, Escanear (central), Rotina, Plano**. O item ativo fica em roxo e os inativos em lilás.
- **Perfil** não está na barra: abre pelo avatar (inicial do nome da tutora) no topo da tela Início. Decisão: 6 itens deixariam a barra apertada, e o Plano precisa ficar visível.
- O **Plano** é uma aba. Sem plano ativo, tocar em um recurso (Escanear, Rotina, Análise de ração) abre o aviso "Recurso do plano anual" (tela 14), que leva ao Plano.
- A tela 12 é uma notificação do sistema, não uma tela do app.

## Estados do plano
- **Sem plano:** chip "Gratuito" no Plano; recursos bloqueados (tela 14).
- **Com plano:** chip "Plano ativo até DD/MM/AAAA" e botão "Gerenciar assinatura" no lugar de "Assinar por €19"; recursos liberados.
- Por enquanto o pagamento é simulado: o botão "Assinar" apenas ativa o estado "com plano" localmente. O Stripe entra depois.
- O bloqueio deve ficar em **um único ponto do código** (um hook de "pode usar este recurso?"), para mudar a regra sem refazer telas.

## As 14 telas

### 1. Abertura (`screens/01-abertura.png`)
Fundo amarelo cheio. Logo "PetLife" no topo (Pet em roxo escuro, Life em roxo), desenho do cachorro e do gato sobre um círculo lavanda, título "A carteirinha do seu pet, sempre no bolso.", subtítulo "Vacinas, lembretes e rotina em um só lugar." e botão "Continuar", que leva ao Login. É a primeira tela do app.

### 2. Login (`screens/02-login.png`)
Botão de voltar, título "Que bom te ver de novo", subtítulo, campos E-mail e Senha (com ícone para mostrar a senha), link "Esqueci a senha", botão "Entrar" e, no rodapé, "Não tem conta? Criar conta". Mostra erro abaixo do campo quando inválido.

### 3. Criar conta (`screens/03-criar-conta.png`)
Botão de voltar, título "Crie sua conta", subtítulo "Leva menos de um minuto.", campos Nome, E-mail e Senha (dica "Mínimo de 8 caracteres."), caixa de aceite "Aceito os Termos de Uso e a Política de Privacidade." (obrigatória), botão "Criar conta" e "Já tem conta? Entrar". O aceite é necessário por causa de LGPD e GDPR (os preços são em euros, então há usuários na Europa).

### 4. Novo pet (`screens/04-novo-pet.png`)
Aparece depois do login, só na primeira vez (usuário sem pet). Fundo amarelo cheio. Logo, título "Quem é o seu companheiro?", seleção Cachorro/Gato (selecionado em roxo), campo "Nome do pet" e botão "Continuar".

### 5. Início (`screens/05-inicio.png`)
Saudação "Oi, Marina / Como está o Thor?" e avatar da tutora (abre o Perfil). Cartão do pet (foto, nome, raça, idade, peso, chips "Vacinas em dia" e "1 lembrete"). Seção "Próximos lembretes" com cartões (ícone, título, data, chip de prazo). Barra inferior.

### 6. Escanear carteirinha (`screens/06-escanear-carteirinha.png`)
Fundo amarelo, moldura de câmera com cantos roxos, texto guia "Enquadre a página inteira, com boa luz e sem reflexo.", chip "1 de 3" (várias páginas), botão de captura roxo e link "Escolher da galeria". Recurso do plano.

### 7. Revisar leitura (`screens/07-revisar-leitura.png`)
Título "Confira antes de salvar", subtítulo "Lemos 6 vacinas. 1 precisa da sua atenção." Lista de campos editáveis (vacina, aplicada em, próxima, lote). Campo de baixa confiança destacado (borda roxa, chip "Revise a data", link "Toque para ver a foto"). Aviso de que a foto original é guardada. Botão "Salvar na carteira". Etapa obrigatória.

### 8. Carteira digital (`screens/08-carteira-digital.png`)
Cartão amarelo do pet: avatar, nome, espécie e raça, grade com nascimento, peso, sexo, castrado e microchip, chip de status geral, QR code. Abaixo, cartões por vacina com chip da próxima data (verde em dia, amarelo atenção). Botão "Compartilhar". Funciona offline.

### 9. Vacinas e lembretes (`screens/09-vacinas-lembretes.png`)
Título "Saúde do Thor", segmentos Vacinas, Vermífugo, Consultas. Lista de cartões com nome, data de aplicação e chip de status (em dia, vence em N dias, vencida). Opção "Avisar 7 dias antes" com horário da notificação.

### 10. Análise da ração (`screens/10-analise-racao.png`)
Produto lido (nome, marca, tamanho, código), cartão "Porção diária para o Thor" com número grande (≈ 360 g), refeições, kcal e dados do pet usados. Barras de proteína, gordura e fibra. Chips "1º ingrediente: frango" e "Fase: adulto". Aviso "Orientação geral. Converse com o veterinário do Thor." Botão "Onde comprar" (afiliado). Recurso do plano.

### 11. Rotina (`screens/11-rotina.png`)
"Rotina do Thor", data de hoje e chip de progresso (2 de 4). Linha do tempo de cartões: horário, nome (café da manhã, passeio, jantar), detalhe (180 g de ração, 30 minutos) e chip (feito, adiado, pendente). Cartões concluídos ficam com opacidade reduzida. Nota de que os 180 g vêm da porção calculada na análise da ração. Botão "Novo horário". Recurso do plano.

### 12. Aviso com ações (`screens/12-aviso-com-acoes.png`)
Notificação do sistema na tela de bloqueio: "Hora do passeio do Thor / Ele já passeou à tarde?" com três ações: "Já fiz", "Daqui a 30 min", "Pular hoje". O tutor responde sem abrir o app. Se adiar, o aviso volta no horário novo; no máximo um lembrete extra por item.

### 13. Plano (`screens/13-plano.png`)
Aba Plano da barra inferior. "Seu plano / PetLife anual" e chip de estado ("Gratuito"). Cartão amarelo com "€19 /ano" e "cerca de €1,58 por mês". Lista de benefícios com check roxo. Botão "Assinar por €19" e a nota "Pagamento simulado nesta versão. Cancele quando quiser." Só existe o plano anual; não há plano mensal.

### 14. Recurso bloqueado (`screens/14-recurso-bloqueado.png`)
Tela de fundo escurecida e uma folha branca subindo de baixo: ícone de cadeado em círculo amarelo, "Recurso do plano anual", "Digitalizar a carteirinha é liberado com o plano PetLife de €19 por ano.", botão "Ver o plano" e link "Agora não". O texto muda conforme o recurso tocado.
