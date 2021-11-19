const express = require('express');
const commons = require('./commons');
const router = express.Router();

router.post('/register', (req, res) => {
    console.log(`DEBUG: Solicitud recibida para registrar usuario`);

    const result = req.body;

    if ((!result.uname && !result.upass) || (result.uname.trim() == "" || result.upass.trim() == "")) {
        return res.send({
            "status": 400,
            "message": "Se requiere nombre de usuario / contraseña"
        });
    }

    commons.userObject.uname = result.uname;
    commons.userObject.upass = result.upass;
    delete commons.userObject.tfa;

    return res.send({
        "status": 200,
        "message": "El usuario se registró correctamente"
    });
});

module.exports = router;