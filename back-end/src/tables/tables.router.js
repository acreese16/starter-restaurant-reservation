const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const reservationRouter = require("../reservations/reservations.router");

router.route("/:table_id/seat")
router.route("/:table_id")
router.route("/new")
router.route("/")