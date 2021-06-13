let router = require('express').Router();

const agendaControllerPg = require('../controllers/agenda-controller-pg');

router.post('/',agendaControllerPg.adicionaragendaPg);

router.get('/', agendaControllerPg.listaagendasPg);

router.get('/:id', agendaControllerPg.listaagendaPorIdPg);

router.put('/:id', agendaControllerPg.atualizaragendaPg);

router.delete('/:id', agendaControllerPg.removeragendaPg);

module.exports = router;