## Sobre o Projeto

Esse é um projeto de aplicação web da [Rocketseat](https://www.rocketseat.com.br/) desenvolvido de forma colaborativa durante a NLW Heat. A aplicação tem por objetivo a possibilidade dos usuários entrarem na plataforma usando sua conta no GitHub e enviarem uma mensagem, que será carregada em tempo real na aplicação, sobre suas expectativas para o evento [DoWhile2021](https://dowhile.io/inscricao). 

## Tecnologias utilizadas

- Node
- Vite
- React
- SQlite
- Prisma

## Como executar o projeto

### Execução do Back-End

- Após clonar o repositório entre na pasta node-heat.
- Crie um arquivo `.env` e configure os valores de suas variáveis ambiente, de acordo com suas credenciais cadastradas no Github.
    - O arquivo `.env-example` foi deixado como template.
- Instale as dependências do projeto usando o `yarn`.
- Execute as migrations geradas com o prisma com o seguinte comando: `yarn prisma migrate dev`.
- Inicie o servidor com `yarn dev`.

### Execução do Front-End

- Instale as dependências do projeto usando o `yarn`
- Inicie o servidor usando o `yarn dev`
