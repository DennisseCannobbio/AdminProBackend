/*
    Medicos
    ruta: '/api/medico'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    getMedicoById,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos')


const router = Router();

router.get( '/', validarJWT, getMedicos );

router.get('/:id', 
    validarJWT,
    getMedicoById
)

router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearMedico 
);

router.put( '/:id',
    [  
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser válido').isMongoId(),
    ],
    actualizarMedico
);

router.delete( '/:id',
    validarJWT,
    borrarMedico
);




module.exports = router;



