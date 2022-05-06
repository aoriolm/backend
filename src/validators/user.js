const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateCreate = [
    check('email')
    .exists()
    .not()
    .isEmpty(),
    check('nombre')
    .exists()
    .not()
    .isEmpty(),
    check('apellido1')
    .exists()
    .not()
    .isEmpty(),
    check('apellido2')
    .exists()
    .not()
    .isEmpty(),
    check('nacimiento')
    .exists()
    .not()
    .isEmpty(),
    /*check('age')
    .exists()
    .isNumeric()
    .custom((value, { req }) => {
        if (value < 18 || value > 40) {
            throw new Error('Rango de edad debe estar comprendido entre 18 y 40')
        }
        return true
    }),*/
    check('tel1')
    .exists()
    .isNumeric(),
    check('tel2')
    .isNumeric(),
    check('genero')
    .exists()
    .not()
    .isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }