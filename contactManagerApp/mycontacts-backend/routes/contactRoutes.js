const express = require("express");
const router = express.Router();
const {getContacts, createContact, getContact, updateContact, deleteContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// this makes all routes private by adding thz handler
// here only we use .route() method, remember
router.use(validateToken);

router.route('/').get(getContacts).post(createContact);

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);


module.exports = router;