# Autenticação do app (com a PetLife-API)

O login é **real e próprio**: o app conversa com a PetLife-API (projeto ao lado, `../PetLife-API`). O fluxo completo, com diagrama e as decisões de segurança, está em `../PetLife-API/docs/auth.md`.

## Como funciona no app
- `features/auth/api/auth.api.ts`: cadastro, login, saída e restauração da sessão. As telas só conhecem `signInWithEmail`, `signUpWithEmail` e `signOut`.
- `shared/api/http.client.ts`: o único cliente HTTP. Manda o token de acesso (`Authorization: Bearer`); se a API responder 401, renova **uma vez** (`POST /auth/refresh`) e repete o pedido; se a renovação falhar, apaga os tokens e a sessão acaba (volta para a Abertura).
- `shared/api/tokenStorage.ts`: guarda os dois tokens no **expo-secure-store** (Keychain no iOS, Keystore no Android). Nunca em AsyncStorage.
- `providers/AuthProvider.tsx`: ao abrir o app restaura a sessão (lê os tokens, chama `GET /me`, renova se preciso). A tela de abertura do sistema (splash) só some quando isso termina.

## Rodar a API e o app juntos
1. **API** (um terminal):
   ```
   cd ../PetLife-API
   cp .env.example .env     # preencha JWT_ACCESS_SECRET (openssl rand -base64 48)
   npm install
   npm run dev              # http://localhost:3333
   ```
2. **App** (outro terminal): `npm start` e abra no simulador ou emulador.
3. **Endereço da API por plataforma** (variável `EXPO_PUBLIC_API_URL`, modelo em `.env.example`):

   | Onde o app roda | Endereço |
   |---|---|
   | Simulador iOS | `http://localhost:3333` (padrão) |
   | Emulador Android | `http://10.0.2.2:3333` (padrão) |
   | Celular físico (Expo Go) | IP do computador na rede, por exemplo `EXPO_PUBLIC_API_URL=http://192.168.0.10:3333` em `.env.local` (celular e computador na mesma rede) |

   Depois de mudar o `.env.local`, reinicie o Metro com `npx expo start --clear`.

## Mensagens e erros
- Credencial errada: "E-mail ou senha incorretos." (a API nunca revela se o e-mail existe).
- E-mail já cadastrado: "Este e-mail já está em uso."
- Servidor fora do ar ou sem internet: "Não foi possível conectar ao servidor. Verifique a internet e tente de novo."
- Se a API estiver desligada ao abrir o app, ele abre na Abertura (os tokens salvos só são apagados quando a API os recusa).

## Limites desta etapa
Só a autenticação é real. Pets, vacinas, rotina e plano continuam simulados em memória até a API ganhar o banco.
