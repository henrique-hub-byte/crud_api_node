// Importa o módulo express
const express = require('express');
// Importa o módulo bodyParser
const bodyParser = require('body-parser');
// Importa o módulo de rotas para a rota '/posts'
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const imageRoute = require('./routes/images')
//const commmetsRoute = require('./routes/comments')

const app = express();

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))
// Usa o módulo de rotas para a rota '/posts'
app.use('/posts', postsRoute);
// Define uma rota '/blog' que envia uma resposta
app.use('/users', usersRoute);
//app.use('/comments', commmetsRoute);
app.use('/images', imageRoute);

app.get('/blog', (req, res) => {
    res.send('agua mole pedra dura tanto bate até que e nóis');  
});

// Exporta a instância do Express para ser usada em outros arquivos
module.exports = app;
