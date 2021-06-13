let router = require('express').Router();

const agendaController = require('../controllers/agenda-controller');

router.post('/',agendaController.adicionaragenda);

router.get('/', agendaController.listaagendas);

router.get('/:id', agendaController.listaagendaPorId);

router.put('/:id', agendaController.atualizaragenda);

router.delete('/:id', agendaController.removeragenda);

module.exports = router;