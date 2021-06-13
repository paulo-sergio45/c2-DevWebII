const mongose = require('mongoose');

const agenda = mongose.Schema({
    unisaude_id: [
        { type: mongose.Schema.Types.ObjectId,
             ref: 'unidade de saude' }
    ],
    pessoa_id: [
        { type: mongose.Schema.Types.ObjectId, 
            ref: 'pessoa' }
    ],
    data_hora: {
        type: mongose.Schema.Types.Date,
        required: true
    },
    necessidades: {
        type: mongose.Schema.Types.Boolean,
        required: true
    },
    observacoes: {
        type: mongose.Schema.Types.String,
        required: true
    }

});

let Agenda = module.exports = mongose.model('agenda', agenda);

module.exports.get = function (callback, limit) {
    Agenda.find(callback).limit(limit);
}