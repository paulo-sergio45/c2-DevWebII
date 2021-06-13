const dataTypes = require('../infra/postgres').DataTypes;
const postgres = require('../infra/postgres').sequelize;

const unisaudeModelpg = require('../models/unisaude-model-pg');


const pessoaModel = postgres.define('pessoa', {

    id:
    {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: dataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: dataTypes.STRING,
        allowNull: false
    },
    data_nasci: {
        type: dataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: dataTypes.STRING,
        allowNull: false
    },
    grupo_priori: {
        type: dataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: dataTypes.STRING,
        allowNull: false
    },
    email: {
        type: dataTypes.STRING,
        allowNull: false
    }

});

unisaudeModelpg.hasMany(pessoaModel, { foreignKey: 'unisaude_id' });

module.exports = pessoaModel;