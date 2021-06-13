let router = require('express').Router();

const uniSaudeControllerPg = require('../controllers/unisaude-controller-pg');

router.post('/',uniSaudeControllerPg.adicionarUniSaudePg);

router.get('/', uniSaudeControllerPg.listaUniSaudePg);

router.get('/:id', uniSaudeControllerPg.listaUniSaudePorIdPg);

router.put('/:id', uniSaudeControllerPg.atualizarUniSaudePg);

router.delete('/:id', uniSaudeControllerPg.removerUniSaudePg);

module.exports = router;