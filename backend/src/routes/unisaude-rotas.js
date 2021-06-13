let router = require('express').Router();

const uniSaudeController = require('../controllers/unisaude-controller');

router.post('/',uniSaudeController.adicionarUniSaude);

router.get('/', uniSaudeController.listaUniSaude);

router.get('/:id', uniSaudeController.listaUniSaudePorId);

router.put('/:id', uniSaudeController.atualizarUniSaude);

router.delete('/:id', uniSaudeController.removerUniSaude);

module.exports = router;