let router = require('express').Router();

const pessoaControllerPg = require('../controllers/pessoa-controller-pg');

router.post('/',pessoaControllerPg.adicionarpessoaPg);

router.get('/', pessoaControllerPg.listapessoasPg);

router.get('/:id', pessoaControllerPg.listapessoaPorIdPg);

router.put('/:id', pessoaControllerPg.atualizarpessoaPg);

router.delete('/:id', pessoaControllerPg.removerpessoaPg);

module.exports = router;
