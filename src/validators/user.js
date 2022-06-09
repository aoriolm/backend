const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateCreate = [
    check('email')
    .exists()
    .isEmail(),
    check('nombre')
    .exists()
    .not()
    .isEmpty(),
    check('apellido1')
    .exists()
    .not()
    .isEmpty(),
    check('nacimiento')
    .exists()
    .not()
    .isEmpty(),
    check('tel1')
    .exists()
    .isNumeric(),
    check('genero')
    .exists()
    .not()
    .isEmpty(),
    check('rol')
    .exists()
    .not()
    .isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }