const agendaModel = require('../models/agenda-model');
const mongodb = require('../infra/mongo');

exports.adicionaragenda = function (req, res) {

    agendaModel.find(function (err, agendas) {
        if (err) {
            res.json({
                status: "error",
                message: "Não foi possível recuperar as agendas!"
            });
        }
        for (const elem of agendas) {
            if (elem.pessoa_id === req.body.pessoaId) {
                res.json({
                    status: "error",
                    message: `O individua ja esta agendado para a data ${req.body.data_hora}!`
                });
            return;
        }
            
        }

        let agenda = new agendaModel();
        agenda.unisaude_id = req.body.unisaude_id;
        agenda.pessoa_id = req.body.pessoa_id;
        agenda.data_hora = req.body.data_hora;
        agenda.necessidades = req.body.necessidades;
        agenda.observacoes = req.body.observacoes;

        agenda.save(function (erro) {
            if (erro) {
                res.send({
                    status: "erro",
                    message: "Não foi possível inserir o agenda."
                });
            } else {
                res.json({
                    status: "sucesso",
                    message: `Agendado para a data ${req.body.data_hora}!`,
                    agenda: agenda
                });
            }
        });
    });
}

exports.listaagendas = function (req, res) {

    agendaModel.find(function (err, agendas) {
        if (err) {
            res.json({
                status: "error",
                message: "Não foi possível recuperar as agendas!"
            });
        } else {
            res.json({
                status: "sucesso",
                message: "A solicitação foi bem-sucedida!",
                agenda: agendas
            })
        }
    });
}

exports.listaagendaPorId = function (req, res) {
    let agendaId = req.params.id;

    agendaModel.findById(agendaId, function (err, agenda) {
        if (err) {
            res.json({
                status: "error",
                message: `Não foi possível recuperar a agenda pelo id: ${agendaId}`
            });
        } else {
            res.json({
                status: "sucesso",
                message: `Agenda recuperada com sucesso!`,
                agenda: agenda
            })

        }
    }).populate('unidade de saude').populate('pessoa');
}

exports.atualizaragenda = function (req, res) {
    let agendaId = req.params.id;

    agendaModel.findById(agendaId, function (err, agenda) {
        
        if (err) {
            res.json({
                status: "error",
                message: `Não foi possível recuperar a agenda pelo id: ${agendaId}`
            });
        } else {
            agenda.unisaude_id = req.body.unisaude_id ? req.body.unisaude_id : agenda.unisaude_id;
            agenda.pessoa_id = req.body.pessoa_id ? req.body.pessoa_id : agenda.pessoa_id;
            agenda.data_hora = req.body.data_hora ? req.body.data_hora : agenda.data_hora;
            agenda.necessidades = req.body.necessidades ? req.body.necessidades : agenda.necessidades;
            agenda.observacoes = req.body.observacoes ? req.body.observacoes : agenda.observacoes;


            agenda.save(function (erro) {
                if (erro) {
                    res.json({
                        status: "error",
                        message: "Não foi possível atualizar a agenda!"
                    });
                } else {
                    res.json({
                        status: "sucesso",
                        message: `A agenda foi atualizado com sucesso!`,
                        agenda: agenda
                    });
                }

            })

        }

    }).populate('unidade de saude').populate('pessoa');
}

exports.removeragenda = function (req, res) {
    let agendaId = req.params.id;
    agendaModel.deleteOne({ _id: agendaId }, function (err) {
        if (err) {
            res.json({
                status: "error",
                message: "Não foi possível deletar a agenda!"
            });
        } else {
            res.json({
                status: "sucesso",
                message: "Agenda deletado com sucesso!"
            });
        }
    });
}

