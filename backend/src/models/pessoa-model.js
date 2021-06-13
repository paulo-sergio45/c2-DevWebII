const mongose = require('mongoose');

const pessoa = mongose.Schema({
    
    unisaude_id: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'unidade de saude'
    }, nome: {
        type: mongose.Schema.Types.String,
        required: true
    },
    cpf: {
        type: mongose.Schema.Types.String,
        required: true
    },
    data_nasci: {
        type: mongose.Schema.Types.String,
        required: true
    },
    telefone: {
        type: mongose.Schema.Types.String,
        required: true
    },
    grupo_priori: {
        type: mongose.Schema.Types.Boolean,
        required: true
    },
    endereco: {
        type: mongose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongose.Schema.Types.String,
        required: true
    }

});


let Pessoa = module.exports = mongose.model('pessoa', pessoa);

module.exports.get = function (callback, limit) {
    Pessoa.find(callback).limit(limit);
}