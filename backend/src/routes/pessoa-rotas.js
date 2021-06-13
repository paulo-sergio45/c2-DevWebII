let router = require('express').Router();

const pessoaController = require('../controllers/pessoa-controller');

router.post('/',pessoaController.adicionarpessoa);

router.get('/', pessoaController.listapessoas);

router.get('/:id', pessoaController.listapessoaPorId);

router.put('/:id', pessoaController.atualizarpessoa);

router.delete('/:id', pessoaController.removerpessoa);

module.exports = router;
