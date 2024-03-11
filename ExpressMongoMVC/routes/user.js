const express = require("express");

const { getAllUsers, getUserById, postUserById, updateUserById, deleteUserById } = require("../controllers/user");

const router = express.Router();

router.get('/',getAllUsers);
router.get('/:id',getUserById);
router.post('/',postUserById);
router.patch('/:id',updateUserById);
router.delete('/:id',deleteUserById);

module.exports = router;