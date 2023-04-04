// Importa o módulo express
const express = require('express');
// Importa o módulo bodyParser
const bodyParser = require('body-parser');

// Cria uma instância do Express
const app = express();

// Importa o módulo de rotas para a rota '/posts'
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');



app.use(bodyParser.json());
// Usa o módulo de rotas para a rota '/posts'
app.use('/posts', postsRoute);
// Define uma rota '/blog' que envia uma resposta
app.use('/users', usersRoute);

app.get('/blog', (req, res) => {
    res.send('agua mole pedra dura tanto bate até que e nóis');  
});

// Exporta a instância do Express para ser usada em outros arquivos
module.exports = app;
