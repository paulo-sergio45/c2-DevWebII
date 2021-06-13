const uniSaudeModel = require('../models/unisaude-model');
const mongodb = require('../infra/mongo');

exports.listaUniSaude = function (req, res) {

    uniSaudeModel.find(function (err, uniSaudes) {
        if (err) {
            res.json({
                status: "error",
                message: "Não foi possível recuperar as unidades de saude!"
            });
        } else {
            res.json({
                status: "sucesso",
                message: "A solicitação foi bem-sucedida!",
                unidades: uniSaudes
            })
        }
    });
}

exports.adicionarUniSaude = function (req, res) {

    uniSaudeModel.find(function (err, uniSaudes) {
        if (err) {
            res.json({
                status: "error",
                message: "Não foi possível recuperar as unidades de saude!"
            });
        }
        for (const elem of uniSaudes) {
            if (elem.nome === req.body.nome) {
                res.json({
                    status: "error",
                    message: `A unidade de saude ${req.body.nome} já está cadastrada!`
                });
            return;
        }
            
        }

        let uniSaude = new uniSaudeModel();
        uniSaude.nome = req.body.nome ;
        uniSaude.descricao = req.body.descricao;
        uniSaude.endereco = req.body.endereco;
        uniSaude.telefone = req.body.telefone;
        uniSaude.email = req.body.email;
        uniSaude.latlong = req.body.latlong;

        uniSaude.save(function(erro) {
            if (erro) {
                res.send({
                    status: "erro",
                    message: "Não foi possível inserir o unidades de saude."
                });
            } else {
                res.json({
                    status: "sucesso",
                    message: `unidades de saude ${req.body.nome} inserido com sucesso!`,
                    unidade: uniSaude
                });
            }
        });
    });
}

exports.listaUniSaudePorId = function (req, res) {
    let uniSaudeId = req.params.id;

    uniSaudeModel.findById(uniSaudeId, function (err, uniSaude) {
        if (err) {
            res.json({
                status: "error",
                message: `Não foi possível recuperar a unidade de saude pelo id: ${uniSaudeId}`
            });
        } else {
            res.json({
                status: "sucesso",
                message: `unidades de saude ${uniSaude.nome} recuperada com sucesso!`,
                unidade: uniSaude
            })
        }
    });
}

exports.removerUniSaude = function (req, res)  {
    let uniSaudeId = req.params.id;
    uniSaudeModel.deleteOne({ _id: uniSaudeId }, function (err) {
        if (err) {
            res.json({
                status: "error",
                message: "Não foi possível deletar a unidade de saude!"
            });
        } else {
            res.json({
                status: "sucesso",
                message: "Unidade de saude deletado com sucesso!"
            });
        }
    });
}


exports.atualizarUniSaude = function (req, res) {
    let uniSaudeId = req.params.id;

    uniSaudeModel.findById(uniSaudeId, function (err, uniSaude) {
        if (err) {
            res.json({
                status: "error",
                message: `Não foi possível recuperar a unidade de saude de id: ${uniSaudeId}`
            });
        } else {
            uniSaude.nome = req.body.nome ? req.body.nome  : uniSaude.nome;
            uniSaude.descricao = req.body.descricao ? req.body.descricao : uniSaude.descricao;
            uniSaude.endereco = req.body.endereco ? req.body.endereco : uniSaude.endereco;
            uniSaude.telefone = req.body.telefone ? req.body.telefone : uniSaude.telefone;
            uniSaude.email = req.body.email ? req.body.email : uniSaude.email;
            uniSaude.latlong = req.body.latlong ? req.body.latlong : uniSaude.latlong;
            uniSaude.save(function (erro) {
                if (erro) {
                    res.json({
                        status: "error",
                        message: "Não foi possível atualizar a unidade de saude!"
                    });
                } else {
                    res.json({
                        status: "sucesso",
                        message: `Unidade de saude ${uniSaude.nome} atualizado com sucesso!`,
                        unidade: uniSaude
                    });
                }

            })

        }

    });

}