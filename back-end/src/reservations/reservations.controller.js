const reservationService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
];

async function reservationExists(req, res, next) {
  const reservation = await reservationService.read(req.params.reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: "Reservation cannot be found." });
}

async function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

async function hasValidDateTime(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const date = new Date(reservation_date);
  let today = new Date();
  const reservationDate = new Date(reservation_date).toUTCString();

  if (reservationDate.includes("Tue")) {
    return next({
      status: 400,
      message: "We're closed on Tuesday's, please select another day.",
    });
  }
  if (reservation_time < "10:30" || reservation_time > "21:30") {
    return next({
      status: 400,
      message:
        "We're closed during that time, please select a time during our business hours 10:30am - 9:30pm",
    });
  }
  if (
    date.valueOf() < today.valueOf() &&
    date.toUTCString().slice(0, 16) !== today.toUTCString().slice(0, 16)
  ) {
    return next({
      status: 400,
      message: "Reservations must be made for a future time",
    });
  }
  next();
}

// HTTP verbs
async function list(req, res) {
  const { date, mobile_number } = req.query;
  let results;

  if (date) {
    results = await reservationService.list(date);
  } else {
    results = await reservationService.search(mobile_number);
  }
  res.json({ data: results });
}

async function read(req, res) {
  const { reservation } = res.locals;
  res.json({ data: await reservationService.read(reservation.reservation_id) });
}

async function create(req, res) {
  const results = await reservationService.create(req.body.data);
  res.status(201).json({ data: results });
}

async function update(req, res, next) {
  const updatedReservation = {
    ...req.locals.reservation,
    ...req.body.data,
  };
  const results = await reservationService.update(updatedReservation);
  res.json({ data: results });
}

async function updateStatus(req, res) {
  const { reservation } = res.locals;
  const results = await reservationService.updateByStatus(
    reservation.reservation_id,
    reservation.status
  );
  res.json({ data: results });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(hasOnlyValidProperties), asyncErrorBoundary(hasValidDateTime), asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  update: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(hasOnlyValidProperties), asyncErrorBoundary(update)],
  updateStatus: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(updateStatus)],
};
