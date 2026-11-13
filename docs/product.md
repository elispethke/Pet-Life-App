# PetLife: produto

## Resumo
PetLife é um app para tutores de cães e gatos. O tutor fotografa a carteirinha de vacinação de papel e o app a transforma em uma carteira digital bonita e completa, com lembretes automáticos. Extras: rotina de comida e passeio, e análise de ração.

## A dor
- Creche, hotel, banho e tosa e viagem pedem comprovante de vacina na hora, e o papel está em casa, borrado ou perdido.
- Ninguém lembra quando vence cada vacina ou vermífugo.
- Escolher ração e a porção diária é um chute.
- Vacina acontece poucas vezes por ano, então sem a rotina diária o app seria aberto raramente. A rotina de comida e passeio é o motor de retenção.

## Objetivo
Em menos de 2 minutos o tutor transforma a carteirinha de papel em carteira digital, recebe lembretes sozinho e descobre quanto de ração o pet precisa.

## Público
Tutores de cães e gatos, 22 a 45 anos. Quem leva o pet para creche, hotel ou viagem. Quem tem filhote (agenda de vacinas mais densa).

## Escopo

### v1 (MVP)
1. Perfil do pet (cão ou gato): nome, raça, nascimento, sexo, castrado, microchip, peso, foto.
2. Digitalizar a carteirinha: foto da página, IA de visão extrai vacinas, datas, lote e veterinário. Tela de revisão obrigatória, porque a leitura de letra à mão erra datas. A foto original é guardada.
3. Carteira digital: cartão visual com dados do pet e vacinas por status (em dia, atenção, vencida). Funciona offline.
4. Lembretes de vacina: notificação 7 dias e 1 dia antes de cada vencimento.
5. Rotina de comida e passeio (extra da v1): horários definidos pelo tutor; cada aviso tem botões "Já fiz", "Daqui a 30 min" e "Pular hoje"; histórico do dia; a refeição mostra a porção calculada da ração. No máximo um lembrete extra por item, depois o app para. Horário de silêncio configurável.
6. Analisar ração: código de barras primeiro, foto do rótulo como alternativa. Mostra composição, avalia adequação à fase de vida e calcula a porção diária pelo peso.
7. Plano anual de €19: botão Plano na barra inferior; sem plano ativo, os recursos ficam bloqueados. Pagamento simulado (mock) até integrar o Stripe.
8. Conta e login (e-mail e senha) com autenticação própria (API de estudo com JWT). Simulados nas primeiras etapas. Fluxo: Abertura, Login ou Criar conta, Novo pet (primeira vez), Início.

### v1.5
- Compartilhar carteirinha por link com validade e QR (creche, hotel, veterinário). Também é o motor de crescimento orgânico.
- Rotina em família: dois tutores no mesmo pet, quem alimenta ou passeia registra e o outro vê (evita comida em dobro). Exige push do servidor.

### v2 e depois
- Mapa pet friendly com avaliações.
- Encontros de pets: opt-in, localização por bairro (nunca GPS exato), só locais públicos, sem chat, piloto em uma cidade. Adiado por cold start, segurança, LGPD, moderação e responsabilidade legal.
- Outros animais, chat e marketplace ficam fora.

## Planos e monetização (preços são hipóteses a testar)
- **Sem plano:** criar conta, entrar, cadastrar o pet e ver o app com os recursos bloqueados.
- **Plano anual:** €19 por ano (cerca de €1,58 por mês). Libera digitalizar carteirinhas, lembretes de vacina e rotina, análise de ração, pets ilimitados, histórico de peso e, na v1.5, compartilhar e rotina em família. Não há plano mensal.
- Decisão a validar: bloquear tudo antes do pagamento reduz a conversão, porque a pessoa não vê o valor antes de pagar. Uma digitalização grátis ou um teste de 7 dias resolveria. O bloqueio fica em um único ponto do código para poder mudar sem refazer telas.
- Receita adicional futura: afiliados de ração e petshop (botão "Onde comprar"), B2B para estabelecimentos no mapa, leads para veterinários.
- Cada leitura por IA tem custo. Medir o custo real com 20 carteirinhas antes de fixar o preço e o uso justo.
- Pagamento: Stripe entra em uma etapa futura. Apple e Google exigem compra interna (IAP) para assinaturas de recursos digitais dentro do app, então o Stripe serve para a web e demonstração; para as lojas, avaliar IAP (por exemplo com RevenueCat).

## Regras de negócio importantes
- Nunca salvar dados lidos por IA sem revisão do tutor. Campos de baixa confiança ficam destacados.
- O app não substitui o documento oficial do veterinário. Mostrar aviso.
- Análise de ração: sem ranking de marcas nem "melhor ração para a raça" (afirmação de saúde contestável). Usar critérios objetivos e transparentes e sempre avisar para consultar o veterinário.
- A porção depende de peso, idade, atividade e se é castrado, não da raça. A raça só ajuda a estimar porte e alertar predisposições.
- Fórmula da porção: energia em repouso = 70 × peso_kg^0,75; energia diária = repouso × fator de vida; gramas por dia = energia diária ÷ (kcal_por_kg ÷ 1000). Fator de vida: adulto castrado 1,6; adulto inteiro 1,8; filhote 2,0 a 3,0; obeso em dieta 1,0. Exemplo: 28 kg, castrado, 3.800 kcal/kg dá cerca de 1.360 kcal e 360 g por dia (180 g em 2 refeições).
- Foto da carteirinha pode ter nome e telefone do tutor: bucket privado, URL assinada, tratar como dado pessoal (LGPD).
- Localização e fotos de terceiros só com consentimento explícito e recurso desligado por padrão (relevante para v2).

## Riscos e respostas
- IA erra datas: revisão obrigatória e confiança por campo.
- Custo por leitura: medir antes de fechar limites e preço.
- Base de rações incompleta: começar pela foto do rótulo e crescer a base com o uso.
- Notificações da rotina: o iOS limita cerca de 64 avisos locais pendentes (agendar janela de 7 dias e reagendar a cada abertura); o Android pode atrasar o horário exato. Testar em aparelhos reais.
- Se o tutor desligar notificações por excesso, perde também os lembretes de vacina: padrão conservador.

## Métricas de sucesso (pontos de partida, não previsões)
- Ativação: 60% concluem a primeira digitalização.
- Precisão: campos corrigidos na revisão por carteirinha.
- Retenção: abre o app em 30 dias por causa de lembrete.
- Rotina: pelo menos 3 dias por semana com registro.
- Conversão de usuário sem plano para plano anual: 3 a 5%.
- Validar antes de investir: teste com 20 carteirinhas reais e landing page com lista de espera.

## Roadmap (9 semanas)
- 1 a 2: projeto Expo, tema, Expo Router, telas de abertura, login, cadastro e plano (mock). Depois autenticação própria, API e banco.
- 3 a 4: escanear carteirinha, função de IA, tela de revisão e carteira digital.
- 5 a 6: motor de lembretes único (vacinas e rotina), tela Rotina, avisos com botões.
- 7: análise de ração (código de barras, foto, porção).
- 8: plano anual com Stripe e bloqueio dos recursos.
- 9: testes com tutores reais, ajustes e envio às lojas.
A rotina é o extra: se o prazo apertar, é o primeiro item a cortar da v1, sem prejudicar a carteirinha.
