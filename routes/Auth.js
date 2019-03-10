const express = require("express");

const router = express.Router();

const modelController = require("../controllers/forAuth");

router.get("/sign-up", modelController.getSignUp);

router.post("/sign-up", modelController.postSignUp);

router.get("/log-in", modelController.getLogIn);

router.post("/log-in", modelController.postLogIn);

router.get("/log-out", modelController.getLogOut);

router.get("/reset", modelController.getReset);

router.get("/reset/:token", modelController.getResetPassword);

router.post("/reset", modelController.postReset);

router.post("/resetPassword", modelController.postResetPassword);

module.exports = router;
