// Importa o módulo http para criar um servidor HTTP
const http = require('http');

// Importa o aplicativo Node.js criado anteriormente
const app = require('./app');

// Define a porta em que o servidor irá escutar
const port = 3000;

// Cria um servidor HTTP passando o aplicativo como argumento
const server = http.createServer(app);

// Inicia o servidor e o faz escutar na porta definida anteriormente
server.listen(port);
