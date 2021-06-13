const dataTypes = require('../infra/postgres').DataTypes;
const postgres = require('../infra/postgres').sequelize;


const uniSaudeModel = postgres.define('unidade de saude', {
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
    descricao: {
        type: dataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: dataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: dataTypes.STRING,
        allowNull: false
    },
    email: {
        type: dataTypes.STRING,
        allowNull: false
    },
    latlong: {
        type: dataTypes.STRING,
        allowNull: false
    }},
    {   postgres,
        tableName: 'unidade de saude'

      });


module.exports = uniSaudeModel;