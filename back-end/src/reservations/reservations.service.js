const knex = require("../db/connection");


// list all reservations according to their date
function listByDate(date) {
    return knex("reservations")
    .select("*")
    .where({ "reservation_date": date })
    .orderBy([{ column: "reservation_date" }, { column: "reservation_time" }])
}

// create a new reservation, given an input
function create(newReservation) {
    return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0])
}

// read a reservation's details given its id
function read(reservation_id) {
    return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .first()
}

// update a reservation's details
function update(updatedReservation) {
    return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
}

// update a resservation given it's status 
function updateByStatus(reservation_id, status) {
    return knex("reservations")
    .where({ reservation_id })
    .update("status", status)
    .returning("*")
    .then((updatedStatus) => updatedStatus[0])
}



//function provided by instructions
function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
    listByDate,
    create,
    read,
    update,
    updateByStatus,
    search,
}