const agendaModelPg = require('../models/agenda-model-pg');

exports.adicionaragendaPg = async function (req, res) {
    const agenda = req.body;


    const agendaExiste = await agendaModelPg.findAll({
        where: {
            pessoa_id: agenda.pessoa_id
        }
    });


    if (agendaExiste.length > 0) {
        res.json({
            status: "error",
            resultado: `O individua ja esta agendado!`
        })
    } else {
        console.log(agenda.unisaude_id);
        const agendaInserida = await agendaModelPg.create({

            data_hora: agenda.data_hora,
            necessidades: agenda.necessidades,
            observacoes: agenda.observacoes,
            unisaude_id: agenda.unisaude_id,
            pessoa_id: agenda.unisaude_id
        });
        res.json({
            status: "sucesso",
            message: `Agendado para a data ${agenda.data_hora}!`,
            agenda: agendaInserida
        })
    }


}

exports.listaagendasPg = async function (req, res) {

    try {
        const agenda = await agendaModelPg.findAll();
        res.json({
            status: "sucesso",
            message: "A solicitação foi bem-sucedida!",
            agenda: agenda
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: 'Não foi possível recuperar as agendas!'
        })
    }
}

exports.listaagendaPorIdPg = async function (req, res) {
    let agendaId = req.params.id;

    try {
        const agendaEspecifico = await agendaModelPg.findByPk(agendaId);
        console.log(agendaEspecifico);
        if (agendaEspecifico) {
            res.json({
                status: "sucesso",
                message: "Agenda recuperada com sucesso!",
                agenda: agendaEspecifico
            })
        } else {
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a agenda pelo id: ${agendaId}`
            })
        }
    } catch (erro) {
        console.log(erro);
        res.json({
            status: "erro",
            message: `Erro ao recuperar a agenda pelo id ${agendaId}`
        })
    }
}

exports.atualizaragendaPg = async function (req, res) {
    const agenda = req.body;
    let agendaId = req.params.id;

    let novaagenda = {
        
        data_hora: agenda.data_hora,
        necessidades: agenda.necessidades,
        observacoes: agenda.observacoes,
        unisaude_id: agenda.unisaude_id,
        pessoa_id: agenda.unisaude_id
    }

    if (agendaId) {

        let agendaAtualizado = await agendaModelPg.update(novaagenda, { where: { id: agendaId } })

        if (agendaAtualizado) {
            res.json({
                status: "sucesso",
                message: "agenda atualizado com sucesso!",
                novaagenda: novaagenda
            })
        } else {
            res.json({
                status: "erro",
                message: `Erro ao atualizar o agenda de id ${agendaId}`
            })
        }
    } else {
        console.log('Sem id');
    }
}

exports.removeragendaPg = async function (req, res) {
    let agendaId = req.params.id;
    if (agendaId) {
        try {
            let agendaDeletado = await agendaModelPg.destroy({ where: { id: agendaId } });
            if (agendaDeletado) {
                res.json({
                    status: "sucesso",
                    message: `Agenda deletado com sucesso!`
                })
            } else {
                res.json({
                    status: "erro",
                    message: `Não foi possível deletar o agenda pelo id ${agendaId}`
                })

            }
        } catch (erro) {
            res.json({
                status: "erro",
                message: `Não foi possível deletar a agenda!`
            })
        }
    }
}

