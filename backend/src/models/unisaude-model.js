const mongose = require('mongoose');

const uniSaudeSchema = mongose.Schema({
    nome: {
        type: mongose.Schema.Types.String,
        required: true
    },
    descricao: {
        type: mongose.Schema.Types.String,
        required: true
    },
    endereco: {
        type: mongose.Schema.Types.String,
        required: true
    },
    telefone: {
        type: mongose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongose.Schema.Types.String,
        required: true
    },
    latlong: {
        type: mongose.Schema.Types.String,
        required: true
    }
});

let uniSaude = module.exports = mongose.model('unidade de saude',uniSaudeSchema);

module.exports.get = function(callback, limit) {
    uniSaude.find(callback).limit(limit);
}