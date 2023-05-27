const express = require("express");
const { HospedeController } = require("./controller/hospedeController");
const { HospedagemController} = require("./controller/hospedagemController")


const router = express.Router();

const hospedeController = new HospedeController();
const hospedagemController = new HospedagemController();


router.get('/hospedes', hospedeController.getTodos);
router.get('/hospede/:id', hospedeController.getHospede);
router.post('/hospede/novo', hospedeController.criar);
router.delete('/hospede/:id', hospedeController.excluir);
router.put('/hospede/alterar/:id', hospedeController.alterar);
router.post('/hospede/login', hospedeController.login);

router.get('/hospedagens', hospedagemController.getTodos);
router.get('/hospedagem/:id', hospedagemController.getHospedagem);
router.post('/hospedagem/nova',hospedagemController.criar);
router.put('/hospedagem/alterar/:id', hospedagemController.alterar)
router.delete('/hospedagem/:id', hospedagemController.excluir);



module.exports = router;
