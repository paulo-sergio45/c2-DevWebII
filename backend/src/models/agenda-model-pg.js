const dataTypes = require('../infra/postgres').DataTypes;
const postgres = require('../infra/postgres').sequelize;

const unisaudeModelpg = require('../models/unisaude-model-pg');
const pessoaModelpg = require('../models/pessoa-model-pg');


const agendaModel = postgres.define('agenda', {

    id: 
    { type: dataTypes.INTEGER, 
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },

    data_hora: {
        type: dataTypes.DATE,
        allowNull:false
    },
    necessidades: {
        type: dataTypes.BOOLEAN,
        
        allowNull:false
    },
    observacoes: {
        type: dataTypes.STRING,
        allowNull:false
    }

});

unisaudeModelpg.hasOne(agendaModel, { foreignKey: 'unisaude_id' });
pessoaModelpg.hasOne(agendaModel, { foreignKey: 'pessoa_id' });

module.exports = agendaModel;