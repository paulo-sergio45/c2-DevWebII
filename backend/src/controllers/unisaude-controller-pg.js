const uniSaudeModelPg = require('../models/unisaude-model-pg');

exports.adicionarUniSaudePg = async function (req, res) {
    const UniSaude = req.body;


    const UniSaudeExiste = await uniSaudeModelPg.findAll({
        where: {
            latlong: UniSaude.latlong
        }
    });

    if (UniSaudeExiste.length > 0) {
        res.json({
            status: "error",
            resultado: `ja existe a Unidade de Saude cadrastrada!`
        })
    } else {
        const UniSaudeInserida = await uniSaudeModelPg.create({
            nome: UniSaude.nome,
            descricao: UniSaude.descricao,
            endereco: UniSaude.endereco,
            telefone: UniSaude.telefone,
            email: UniSaude.email,
            latlong: UniSaude.latlong
        });
        res.json({
            status: "sucesso",
            message: "A solicitação foi bem-sucedida!",
            UniSaude: UniSaudeInserida
        })
    }
}

exports.listaUniSaudePg = async function (req, res) {
    try {
        const UniSaude = await uniSaudeModelPg.findAll();
        res.json({
            status: 'sucesso',
            UniSaude: UniSaude
        })
    } catch (error) {
        res.json({
            status: 'erro',
            message: 'Não foi possível recuperar as unidades de saude!'
        })
    }
}


exports.listaUniSaudePorIdPg = async function (req, res) {

    let UniSaudeId = req.params.id;

    try {
        const UniSaudeEspecifico = await uniSaudeModelPg.findByPk(UniSaudeId);
        if (UniSaudeEspecifico) {
            res.json({
                status: "sucesso",
                message: "unidade de saude recuperada com sucesso!",
                UniSaude: UniSaudeEspecifico
            })
        } else {
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a unidades de saude pelo id: ${UniSaudeId}`
            })
        }
    } catch (erro) {
        res.json({
            status: "erro",
            message: `Erro ao recuperar a unidade de saude pelo id ${UniSaudeId}`
        })
    }
}


exports.atualizarUniSaudePg = async function (req, res) {
    const UniSaude = req.body;
    let UniSaudeId = req.params.id;

    let novaUniSaude = {
        nome: UniSaude.nome,
        descricao: UniSaude.descricao,
        endereco: UniSaude.endereco,
        telefone: UniSaude.telefone,
        email: UniSaude.email,
        latlong: UniSaude.latlong
    }

    if (UniSaudeId) {

        let UniSaudeAtualizado = await uniSaudeModelPg.update(novaUniSaude, { where: { id: UniSaudeId } })

        if (UniSaudeAtualizado) {
            res.json({
                status: "sucesso",
                message: `Unidade de saude ${UniSaudeId.nome} atualizado com sucesso!`,
                novaUniSaude: novaUniSaude
            })
        } else {
            res.json({
                status: "erro",
                message: `Não foi possível atualizar a unidade de saude!`
            })
        }
    } else {
        console.log('Sem id');
    }

}

exports.removerUniSaudePg = async function (req, res) {
    let UniSaudeId = req.params.id;
    if (UniSaudeId) {
        try {
            let uniSaudeDeletado = await uniSaudeModelPg.destroy({ where: { id: UniSaudeId } });
            if (uniSaudeDeletado) {
                res.json({
                    status: "sucesso",
                    message: `Unidade de saude deletado com sucesso!`
                })
            } else {
                res.json({
                    status: "erro",
                    message: `Não foi possível deletar o unidade de saude pelo id ${UniSaudeId}`
                })

            }
        } catch (erro) {
            res.json({
                status: "erro",
                message: `Não foi possível deletar a uniSaude!`
            })
        }
    }
}
