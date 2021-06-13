const pessoaModelPg = require('../models/pessoa-model-pg');


exports.adicionarpessoaPg = async function (req, res) {
    const pessoa = req.body;

    const pessoaExiste = await pessoaModelPg.findAll({
        where: {
            cpf: pessoa.cpf
        }
    });


    if (pessoaExiste.length > 0) {
        res.json({
            status: "error",
            resultado: `O individuo que possui o CPF ${pessoa.cpf} já está cadastrada!`
        })
    } else {
        const pessoaInserida = await pessoaModelPg.create({
            unisaude_id: pessoa.unisaude_id,
            nome: pessoa.nome,
            cpf: pessoa.cpf,
            data_nasci: pessoa.data_nasci,
            telefone: pessoa.telefone,
            grupo_priori: pessoa.grupo_priori,
            endereco: pessoa.endereco,
            email: pessoa.email

        });
        res.json({
            status: "sucesso",
            message: `O individuo ${pessoa.nome} protador do CPF ${pessoa.cpf} inserido com sucesso!`,
            pessoa: pessoaInserida
        })
    }
}

exports.listapessoasPg = async function (req, res) {

    try {
        const pessoas = await pessoaModelPg.findAll();
        res.json({
            status: 'sucesso',
            message: "A solicitação foi bem-sucedida!",
            pessoas: pessoas
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: 'Não foi possível recuperar as pessoas!'
        })
    }
}

exports.listapessoaPorIdPg = async function (req, res) {
    let pessoaId = req.params.id;

    try {
        const pessoaEspecifico = await pessoaModelPg.findByPk(pessoaId);
        console.log(pessoaEspecifico);
        if (pessoaEspecifico) {
            res.json({
                status: "sucesso",
                message: "pessoa recuperada com sucesso!",
                pessoa: pessoaEspecifico
            })
        } else {
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a pessoa pelo id: ${pessoaId}`
            })
        }
    } catch (erro) {
        console.log(erro);
        res.json({
            status: "erro",
            message: `Erro ao recuperar a pessoa pelo id ${pessoaId}`
        })
    }
}

exports.atualizarpessoaPg = async function (req, res) {
    const pessoa = req.body;
    let pessoaId = req.params.id;

    let novapessoa = {
        nome: pessoa.nome,
        cpf: pessoa.cpf,
        data_nasci: pessoa.data_nasci,
        telefone: pessoa.telefone,
        grupo_priori: pessoa.grupo_priori,
        endereco: pessoa.endereco,
        email: pessoa.email
    }

    if (pessoaId) {

        let pessoaAtualizado = await pessoaModelPg.update(novapessoa, { where: { id: pessoaId } })

        if (pessoaAtualizado) {
            res.json({
                status: "sucesso",
                message: `O individuo ${pessoa.nome} atualizado com sucesso!`,
                novapessoa: novapessoa
            })
        } else {
            res.json({
                status: "erro",
                message: `Erro ao atualizar o pessoa de id ${pessoaId}`
            })
        }
    } else {
        console.log('Sem id');
    }

}

exports.removerpessoaPg = async function (req, res) {
    let pessoaId = req.params.id;
    if (pessoaId) {
        try {
            let pessoaDeletado = await pessoaModelPg.destroy({ where: { id: pessoaId } });
            if (pessoaDeletado) {
                res.json({
                    status: "sucesso",
                    message: `O individuo deletado com sucesso!`
                })
            } else {
                res.json({
                    status: "erro",
                    message: `Não foi possível deletar O individuo!`
                })

            }
        } catch (erro) {
            res.json({
                status: "erro",
                message: `Não foi possível deletar O individuo!`
            })
        }
    }
}