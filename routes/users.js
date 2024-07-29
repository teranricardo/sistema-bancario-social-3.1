var express = require('express');
var router = express.Router();
var usersController = require("../controllers/users.c");
const { verifyToken, verifyRole } = require('../middlewares/auth');

/* GET listar usuarios */
router.get('/', (req, res) => usersController.show(req, res));

/* GET mostrar usuario por id */
router.get('/:id', (req, res) => usersController.showByID(req, res, edit = false));

/* GET mostrar usuario por id */
router.get('/:id/edit', verifyToken, verifyRole('admin'), (req, res) => usersController.showByID(req, res, edit = true));

/* PUT editar usuario */
router.put('/:id', verifyToken, verifyRole('admin'), (req, res) => usersController.edit(req, res));

/* GET confirmación de eliminación */
router.get('/:id/delete', verifyToken, verifyRole('admin'), (req, res) => {
  const userId = req.params.id;
  res.render('users/delete', { userId });
});

/* DELETE eliminar usuario */
router.delete('/:id', verifyToken, verifyRole('admin'), (req, res) => usersController.delete(req, res));

/* GET cuentas del usuario */
router.get('/:id/accounts', verifyToken, verifyRole('admin'), (req, res) => usersController.getAccounts(req, res));

/* GET resumen de cuentas del usuario */
router.get('/:id/accounts/summary', verifyToken, verifyRole('admin'), (req, res) => usersController.summaryAccounts(req, res));

module.exports = router;