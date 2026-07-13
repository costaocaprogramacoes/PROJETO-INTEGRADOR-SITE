# Backend PHP — NexusGG

Este backend foi criado a partir da análise do front-end enviado (páginas
Login, Main, Setup, Jogos, Loja, Carrinho, Checkout). **Nenhum arquivo
original do front-end foi alterado** — todos foram apenas copiados sem
modificação para dentro de `site/`, e os arquivos PHP novos foram
adicionados nos caminhos exatos que o front-end já espera.

## O que o front-end realmente chama

Foi feita uma busca por `fetch()`, `axios`, `XMLHttpRequest` e
`<form action="...">` em todos os arquivos `.js` e `.html/.php`
enviados. Resultado: **o site não usa fetch/axios em nenhum lugar** — toda
a "autenticação" hoje é simulada no navegador via `localStorage`
(arquivo `auth.js`, que já vem com um aviso disso no topo). Os únicos dois
pontos de integração com um back-end são os dois `<form>` da tela de
login/cadastro (`Login_Page/login_page.php`):

| Formulário | action | Método | Backend criado |
|---|---|---|---|
| `#formLogin` | `../backend/auth/login.php` | POST | `backend/auth/login.php` |
| `#formCadastro` | `php/cadastro.php` | POST | `Login_Page/php/cadastro.php` |

Nenhuma outra página (Main, Setup, Jogos, Loja, Carrinho, Checkout) possui
`<form>`, `fetch` ou `axios` — elas são puramente estáticas/JS no
navegador, então não precisam de backend.

## Estrutura criada

```
site/
  backend/
    config/database.php   # conexão PDO + SQLite, cria a tabela "usuarios"
    auth/login.php         # recebe o POST de #formLogin
    data/                  # onde o arquivo .sqlite é criado (gitignored)
  Login_Page/
    php/cadastro.php       # recebe o POST de #formCadastro
    ... (arquivos originais, intocados)
  Main_Page/, Loja_Page/, Jogos_Page/, Setup_Page/,
  Carrinho_Page/, Checkout_Page/, fonts/   (arquivos originais, intocados)
```

O banco usado é **SQLite** (arquivo local em `backend/data/nexusgg.sqlite`,
criado automaticamente no primeiro request) para não depender de um
servidor MySQL configurado. Se preferir usar o MySQL/MariaDB do seu
provedor de hospedagem, basta trocar o DSN em `backend/config/database.php`.

A conta de administrador da demo (`admin@nexusgg.com` / `nexusgg@admin`,
vista em `auth.js`) foi semeada automaticamente no banco para continuar
funcionando com o login real.

## Ponto de atenção encontrado (não corrigido, pois é um arquivo de front-end)

Os campos do formulário de cadastro (`#formCadastro`) **não têm o atributo
`name`** no HTML original — só `id`. O navegador só envia ao servidor os
campos que têm `name`, então, com um `<form>` tradicional (sem
`e.preventDefault()`/fetch), o `cadastro.php` receberia um POST vazio.

`cadastro.php` já foi escrito esperando os nomes corretos (`nome`, `email`,
`senha`, `confirmar_senha`), com fallback para os nomes usados nos `id`
(`emailCadastro`, `senhaCadastro`, `confirmarSenha`), então, quando você
adicionar os atributos `name` correspondentes no seu HTML (ou passar a
enviar os dados via `fetch`/`FormData`), o cadastro passará a funcionar
sem precisar tocar no PHP.

O formulário de login (`#formLogin`) já tem `name="email"` e `name="senha"`
corretamente, então já funciona de ponta a ponta como está — foi testado
com `curl` simulando o envio do formulário (cadastro, login válido, login
do admin e login com senha errada).

## Como testar localmente

```
php -S 127.0.0.1:8999 -t site
```

Depois abra `http://127.0.0.1:8999/Login_Page/login_page.php` no navegador.
