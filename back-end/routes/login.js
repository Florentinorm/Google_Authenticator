const express = require('express');
const speakeasy = require('speakeasy');
const commons = require('./commons');
const router = express.Router();

router.post('/login', (req, res) => {
    console.log(`DEBUG: Solicitud de inicio de sesión recibida`);

    if (commons.userObject.uname && commons.userObject.upass) {
        if (!commons.userObject.tfa || !commons.userObject.tfa.secret) {
            if (req.body.uname == commons.userObject.uname && req.body.upass == commons.userObject.upass) {
                console.log(`DEBUG: El inicio de sesión sin TFA es exitoso`);

                return res.send({
                    "status": 200,
                    "message": "success"
                });
            }
            console.log(`ERROR: El inicio de sesión sin TFA no se realizó correctamente`);

            return res.send({
                "status": 403,
                "message": "Usuario o contraseña invalido"
            });

        } else {
            if (req.body.uname != commons.userObject.uname || req.body.upass != commons.userObject.upass) {
                console.log(`ERROR: El inicio de sesión con TFA no es exitoso`);

                return res.send({
                    "status": 403,
                    "message": "usuario o contraseña invalido"
                });
            }
            if (!req.headers['x-tfa']) {
                console.log(`WARNING: El inicio de sesión fue parcial sin el encabezado TFA`);

                return res.send({
                    "status": 206,
                    "message": "Ingrese el código de autenticación"
                });
            }
            let isVerified = speakeasy.totp.verify({
                secret: commons.userObject.tfa.secret,
                encoding: 'base32',
                token: req.headers['x-tfa']
            });

            if (isVerified) {
                console.log(`DEBUG: Se verifica que el inicio de sesión con TFA sea exitoso`);

                return res.send({
                    "status": 200,
                    "message": "éxito"
                });
            } else {
                console.log(`ERROR: Código no válido`);

                return res.send({
                    "status": 206,
                    "message": "Invalid AutCódigo no válidoh Code"
                });
            }
        }
    }

    return res.send({
        "status": 404,
        "message": "Regístrese para iniciar sesión"
    });
});

module.exports = router;