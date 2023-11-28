# sd-atividade-2

Repositório referente a atividade 02 de Sistemas Distribuídos.

## Instruções
### Pré-Requisito
Para rodar o projeto é necessário o uso de um container docker criado com a imagem do postgresql.

### Passos
**Passo 01.** Entre nas três pastas existentes e instale as dependências usando o comando `npm i`.  
**Passo 02.** Abra 3 terminais e abra as três pastas (uma pasta em cada terminal). Em seguida use o comando `npm start` em cada terminal.  
**Passo 03.** Vá até o endereço `http://localhost:8000` para utilizar o sistema.  

## Variaveis de ambiente dotenv

#### crie um arquivo .env na raiz de cada uma das api e coloque nelas as informações ditas abaixo 

### API-books
```
JWT_SECRET = "qualquercoisa"
```

### API-comentarios

```
PG_URI="postgres://seu_usuario:senha@seu_host:porta/seu_banco"
```
### API-gateway

```
SECRET = "qualquercoisa"
```
