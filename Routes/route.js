const express = require("express");
const router = express.Router();
const {validate} = require("../middleware/validation");
const userController = require("../controllers/user");
const {auth} = require("../middleware/auth");

const registrationSchema = {
    name: 'required | string',
    email: 'required | email',
    password: 'required | min:6',
};

const loginSchema = {
    email: 'required | email', 
    password: 'required: min:6'
}

router.post("/register", validate, userController.register);
router.get("/login",  userController.login);
router.get("/getAll", userController.getAll);
router.put("/update", auth, userController.updateProfile);
router.delete("/delete", userController.deleteProfile);




module.exports = router;