const express = require('express');
const router = express.Router();
const { addNewUser, updateUser, getUserByAccessToken } = require("../controllers/mongoDB")

router.get('/userInfo', getUserByAccessToken)

router.post('/newUser', addNewUser)

router.put('/update', updateUser)


module.exports = router;