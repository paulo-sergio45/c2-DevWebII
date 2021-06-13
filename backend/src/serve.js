//instaciando o expres e bibiotecas
require('dotenv').config({
    path: process.env.NODE_ENV === "development" ? ".env.development" : ".env"
});

console.log(process.env.APP_NAME);

const express = require('express');
const server = express();

//definindo a porta e o hostnao
const port = process.env.APP_PORT ;
const hostname = process.env.APP_HOSTNAME ;

const sync = require('./infra/postgres').sincronizarPostgres;

//chamando as classes das rotas
const pessoa = require('./routes/pessoa-rotas');
const agenda = require('./routes/agenda-rotas');
const uniSaude = require('./routes/unisaude-rotas');
const pessoaPg = require('./routes/pessoa-rotas-pg');
const agendaPg = require('./routes/agenda-rotas-pg');
const uniSaudePg = require('./routes/unisaude-rotas-pg');


server.use(express.urlencoded({ extended: true }));
server.use(express.json());


//passando as rotas para as classes responsaveis
server.use('/api/pessoa/', pessoa);
server.use('/api/agenda/', agenda);
server.use('/api/unisaude/', uniSaude);
server.use('/api/pessoaPg/', pessoaPg);
server.use('/api/agendaPg/', agendaPg);
server.use('/api/uniSaudePg/', uniSaudePg);

server.get('/', function (req, res) {
    res.json({
        status: "ok",
        message: "Servidor rodando"
    });
});


(async () => await sync())() //sincroniza com postgres


server.listen(port, hostname, function () {
    console.log(`Servidor rodando https://${hostname}:${port}`);
});