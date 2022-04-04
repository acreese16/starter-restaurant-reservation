const knex = require("../db/connection");

function list() {
    return knex("tables")
    .select("*")
    .orderBy("table_name")
}

function create(newTable) {
    return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdTable) => createdTable[0])
}

function read(table_id) {
    return knex("tables")
    .select("*")
    .where({ table_id })
    .first();
}

function update(updatedTable) {
    return knex("tables")
    .select("*")
    .where({ "table_id": updatedTable.table_id })
    .update(updatedTable.reservation_id, "*")
    .then((updatedRecord) => updatedRecord[0])
}

function destroy(reservation_id) {
    return knex("tables")
    .where({ reservation_id })
    .del()
}

module.exports = {
    list,
    create,
    read,
    update,
    delete: destroy,
}

