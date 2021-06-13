const mongose = require('mongoose');
const mongodb = require('../infra/mongo');

const pessoaModel = require('../models/pessoa-model');


exports.adicionarpessoa = function (req, res) {

    pessoaModel.find(function (err, pessoas) {
        if (err) {
            res.json({
                status: "error",
                message: "Não foi possível recuperar os individuos!"
            });
        }
        for (const elem of pessoas) {
            if (elem.cpf === req.body.cpf) {
                res.json({
                    status: "error",
                    message: `O individuo que possui o CPF ${req.body.cpf} já está cadastrada!`
                });
             return;
            }
           
        }

        let pessoa = new pessoaModel();
        pessoa.unisaude_id =req.body.unisaude_id;
        pessoa.nome = req.body.nome;
        pessoa.cpf = req.body.cpf;
        pessoa.data_nasci = req.body.data_nasci;
        pessoa.telefone = req.body.telefone;
        pessoa.grupo_priori = req.body.grupo_priori;
        pessoa.endereco = req.body.endereco;
        pessoa.email = req.body.email;

        pessoa.save(function (erro) {
            if (erro) {
                res.send({
                    status: "erro",
                    message: "Não foi possível inserir o individuo."
                });
            } else {
                res.json({
                    status: "sucesso",
                    message: `O individuo ${req.body.nome} protador do CPF ${req.body.cpf} inserido com sucesso!`,
                    individuo: pessoa
                });
            }
        });
    });
}

exports.listapessoas = function (req, res) {

    pessoaModel.find(function (err, pessoas) {
        if (err) {
            res.json({
                status: "error",
                message: "Não foi possível recuperar os individuos!"
            });
        } else {
            res.json({
                status: "sucesso",
                message: "A solicitação foi bem-sucedida!",
                individuo: pessoas
            })
        }
    });
}

exports.listapessoaPorId = function (req, res) {
    let pessoaId = req.params.id;

    pessoaModel.findById(pessoaId, function (err, pessoa) {
        if (err) {
            res.json({
                status: "error",
                message: `Não foi possível recuperar o individuo pelo id: ${pessoaId}`
            });
        } else {
            res.json({
                status: "sucesso",
                message: `O individuo ${pessoa.nome} recuperada com sucesso!`,
                individuo: pessoa
            })
        }
    }).populate('unidade de saude');
}

exports.atualizarpessoa = function (req, res) {
    let pessoaId = req.params.id;

    pessoaModel.findById(pessoaId, function (err, pessoa) {
        if (err) {
            res.json({
                status: "error",
                message: `Não foi possível recuperar O individuo de id: ${pessoaId}`
            });

        } else {
            pessoa.unisaude_id = req.body.unisaude_id? req.body.unisaude_id : pessoa.unisaude_id;
            pessoa.nome = req.body.nome ? req.body.nome : pessoa.nome;
            pessoa.cpf = req.body.cpf ? req.body.cpf : pessoa.cpf;
            pessoa.data_nasci = req.body.data_nasci ? req.body.data_nasci : pessoa.data_nasci;
            pessoa.telefone = req.body.telefone ? req.body.telefone : pessoa.telefone;
            pessoa.grupo_priori = req.body.grupo_priori ? req.body.grupo_priori : pessoa.grupo_priori;
            pessoa.endereco = req.body.endereco ? req.body.endereco : pessoa.endereco;
            pessoa.email = req.body.email ? req.body.email : pessoa.email;

            pessoa.save(function (erro) {
                if (erro) {
                    res.json({
                        status: "error",
                        message: "Não foi possível atualizar O individuo!"
                    });
                } else {
                    res.json({
                        status: "sucesso",
                        message: `O individuo ${pessoa.nome} atualizado com sucesso!`,
                        individuo: pessoa
                    });
                }

            })

        }

    }).populate('unidade de saude');
}

exports.removerpessoa = function (req, res) {
    let pessoaId = req.params.id;
    pessoaModel.deleteOne({ _id: pessoaId }, function (err) {
        if (err) {
            res.json({
                status: "error",
                message: "Não foi possível deletar O individuo!"
            });
        } else {
            res.json({
                status: "sucesso",
                message: "O individuo deletado com sucesso!"
            });
        }
    });
}