const express = require('express');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const commons = require('./commons');
const router = express.Router();

router.post('/tfa/setup', (req, res) => {
    console.log(`DEBUG: Solicitud de configuración de TFA recibida`);

    const secret = speakeasy.generateSecret({
        length: 10,
        name: commons.userObject.uname,
        issuer: 'SICORE'
    });
    var url = speakeasy.otpauthURL({
        secret: secret.base32,
        label: commons.userObject.uname,
        issuer: 'SICORE',
        encoding: 'base32'
    });
    QRCode.toDataURL(url, (err, dataURL) => {
        commons.userObject.tfa = {
            secret: '',
            tempSecret: secret.base32,
            dataURL,
            tfaURL: url
        };
        return res.json({
            message: 'Se debe verificar la autenticación de TFA',
            tempSecret: secret.base32,
            dataURL,
            tfaURL: secret.otpauth_url
        });
    });
});

router.get('/tfa/setup', (req, res) => {
    console.log(`DEBUG: Se recibió la solicitud FETCH TFA`);

    res.json(commons.userObject.tfa ? commons.userObject.tfa : null);
});

router.delete('/tfa/setup', (req, res) => {
    console.log(`DEBUG: Se recibió la solicitud DELETE TFA`);

    delete commons.userObject.tfa;
    res.send({
        "status": 200,
        "message": "éxito"
    });
});

router.post('/tfa/verify', (req, res) => {
    console.log(`DEBUG: Se recibió la solicitud de verificación de TFA`);

    let isVerified = speakeasy.totp.verify({
        secret: commons.userObject.tfa.tempSecret,
        encoding: 'base32',
        token: req.body.token
    });

    if (isVerified) {
        console.log(`DEBUG: Se verifica que TFA esté habilitado`);

        commons.userObject.tfa.secret = commons.userObject.tfa.tempSecret;
        return res.send({
            "status": 200,
            "message": "La autenticación de dos factores se habilitó correctamente"
        });
    }

    console.log(`ERROR: Se verifica que TFA es incorrecto`);

    return res.send({
        "status": 403,
        "message": "Código de autorización no válido, la verificación falló."
    });
});

module.exports = router;