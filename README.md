# MS-Challenge - Catálogo de Filmes e Séries

Este projeto onde o usuário pode buscar por um título, visualizar informações detalhadas sobre ele (como sinopse e avaliações) e marcar como favorito.
O projeto foi construído com **Next.js**, **API OMDb**, **Tailwind CSS** e **Jest**.

## Funcionalidades Entregues

- Campo de busca pelo título.
- Informações detalhadas de cada título.
- Favoritos (ícone de coração).
- Responsividade.
- Estados de loading, erro, e quando não há resultados.
- Testes unitários com Jest.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização e construção de páginas dinâmicas.
- **Tailwind CSS**: Utilizado para estilização da interface.
- **Axios**: Biblioteca para fazer requisições HTTP à API do OMDb.
- **Jest**: Framework de testes para garantir a qualidade do código.
- **React Icons**: Ícones para representar ações como "favoritar".

## Pré-requisitos

- Node.js v14+ e npm ou yarn instalado.

## Instalação
1. Clone este repositório:
```bash
git clone https://github.com/seu-usuario/ms-challenge.git
```

2. Acesse o diretório do projeto:
```bash
cd ms-challenge
```
3. Instale as dependências:
```bash
npm install ou yarn install
```

## Configuração
Crie um arquivo .env.local na raiz do projeto com as seguintes variáveis de ambiente:
```bash
NEXT_PUBLIC_APIURL=https://www.omdbapi.com/
NEXT_PUBLIC_APIKEY=sua_chave_api_aqui
```

# Scripts Disponíveis

```bash
npm run dev / yarn dev 
```
Inicia o servidor de desenvolvimento. Abra http://localhost:3000 para ver a aplicação no navegador.

```bash
npm run build / yarn build   
```
Cria a versão de produção da aplicação na pasta .next.

```bash
npm run test / yarn test   
```
Executa os testes unitários com Jest.

## Estrutura do Projeto

```
├── components     # Componentes reutilizáveis
│   ├── Card       # Componente Card
│   ├── SearchBar  # Barra de pesquisa
│   └── Skeleton   # Skeleton para estado de loading
├── pages          # Páginas da aplicação
│   ├── single     # Página de detalhes de cada filme
│   ├── _app.jsx   # Componente principal do Next.js
│   └── index.jsx  # Página inicial
├── services       # Serviços para conexão com a API e Favoritar
├── styles         # Estilo para iniciar o Tailwind no projeto
│   └── globals.css
├── tests          # Testes unitários
│   ├── components # Testes dos componentes
│   └── services   # Testes dos serviços
├── .env           # Variáveis de ambiente (API Key, etc)
├── jest.config.js # Configuração do Jest
├── tailwind.config.ts # Configuração do Tailwind CSS
└── tsconfig.json  # Configuração do TypeScript

```