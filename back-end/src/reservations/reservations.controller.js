const reservationService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

// Middleware

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
  "created_at",
  "updated_at",
];

const hasRequiredFields = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await reservationService.read(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: `Reservation ${reservation_id} cannot be found.` });
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
        "We're closed during that time, please select a time during 10:30am - 9:30pm",
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

async function hasValidStatus(req, res, next) {
  const { status } = req.body.data;
  const validStatus = [
    "booked",
    "seated",
    "finished",
    "cancelled",
  ];

  if (!validStatus.includes(status)) {
    return next({ status: 400, message: `${status} unknown, please select a valid status: ${validStatus.join(", ")}`}) 
  }
  next();
}

// if the fields are missing then
function hasMissingValues(req, res, next) {
  const { 
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people  } = req.body.data;

    const verifyTime = reservation_time.match(/([01]?[0-9]|2[0-3]):[0-5][0-9]/);

    if (!first_name) {
      return next({ status: 400, message: "first_name is missing, please complete" });
    }
    if (!last_name) {
      return next({ status: 400, message: "last_name is missing, please complete" });
    }
    if (!mobile_number) {
      return next({ status: 400, message: "mobile_number is missing, please complete" });
    }
    if (!people || !Number.isInteger(people) || people === 0) {
      return next({ status: 400, message: "people is missing or invalid, please complete" });
    }
    if (!reservation_date || new Date(reservation_date).toString() === "Invalid Date" ) {
      return next({ status: 400, message: "reservation_date is missing or invalid, please update" });
    }
    if (!reservation_time || verifyTime === null) {
      return next({ status: 400, message: "reservation_time is missing or invalid, please update" });
    }
    
  next();
}


// HTTP verbs
async function list(req, res) {
  const { date, mobile_number } = req.query;
  let results;

  if (date) {
    results = await reservationService.listByDate(date);
  } else if (mobile_number) {
    results = await reservationService.search(mobile_number);
  } else {
    results = await reservationService.list();
    
  }
  res.json({ data: results });
}

async function read(req, res) {
  res.json({ data: res.locals.reservation });
}

async function create(req, res) {
  const newReservation = await reservationService.create(req.body.data);
  res.status(201).json({ data: newReservation });
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
  const updatedStatus = {
    ...reservation, ...req.body.data
  }
  res.json({ data: results });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(hasOnlyValidProperties), hasRequiredFields, asyncErrorBoundary(hasMissingValues), asyncErrorBoundary(hasValidDateTime), asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  update: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(hasOnlyValidProperties), asyncErrorBoundary(hasMissingValues), asyncErrorBoundary(update)],
  updateStatus: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(hasValidStatus), asyncErrorBoundary(updateStatus)],
};
