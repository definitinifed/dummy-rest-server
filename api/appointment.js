const express = require('express');
const router = express.Router();
const appointment = require('../repository/dummy-repository')('appointment');
module.exports = router;


/**
 * @swagger
 *
 * definitions:
 *   appointment:
 *     type: object
 *     required:
 *       - startTime
 *       - endTime
 *     properties:
 *       _id:
 *         type: string
 *       startTime:
 *         type: string
 *         format: date-time
 *       endTime:
 *         type: string
 *         format: date-time
 *       phoneOne:
 *         type: string
 *       phoneTwo:
 *         type: string
 */

/**
 * @swagger
 * /appointment:
 *    get:
 *      description: retrieves all appointments
 *      produces:
 *      responses:
 *        200:
 *          description: appointments
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/appointment'
 */
router.get('/appointment', function (req, res) {
  res.send(appointment.findAll());
});

/**
 * @swagger
 * /appointment/:id:
 *    get:
 *      description: retrieves snigle appointment object with the _id as :id
 *    responses:
 *      200:
 *        description: appointment object
 *        schema:
 *          $ref: '#/definitions/appointment'
 */
router.get('/appointment/:id', function (req, res) {
  res.send(appointment.findById(req.params.id));
});

/**
 * @swagger
 * /appointment:
 *    post:
 *      description: Inserts appointment. Not idempotent. It will stay for max 30min.
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: appointment
 *          description: appointment object, any _id field will be replaced by new id
 *          in:  body
 *          required: true
 *          type: string
 *          schema:
 *            $ref: '#/definitions/appointment'
 *      responses:
 *        200:
 *          description: saved appointment with _id included
 *          schema:
 *            $ref: '#/definitions/appointment'
 */
router.post('/appointment', function (req, res) {
  res.send(appointment.insert(req.body));
});

/**
 * @swagger
 * /appointment/:id:
 *    put:
 *      description: Upates appointment.Idempotent. It will stay for max 30min.
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: _id of appointment object. Should be an uuid.v1
 *          in: params
 *        - name: appointment
 *          description: appointment object
 *          in:  body
 *          required: true
 *          type: string
 *          schema:
 *            $ref: '#/definitions/appointment'
 *      responses:
 *        200:
 *          description: saved appointment
 *          schema:
 *            $ref: '#/definitions/appointment'
 */
router.patch('/appointment/:id', function (req, res) {
  res.send(appointment.update(req.params.id, req.body));
});