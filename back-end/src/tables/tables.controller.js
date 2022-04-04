const tableService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const tablesService = require("./tables.service");

// Middleware

const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  let table = await tableService.read(table_id);

  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: `${table_id} cannot be found.` });
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

async function tableSeated(req, res, next) {
  const { table_id } = req.params;
  const seated = await tablesService.read(table_id);

  if (seated.reservation_id) {
    res.locals.table = seated;
    return next();
  }
  next({ status: 404, message: `Table ${table_id} does not exist, please choose a valid table.`})
}

// HTTP verbs
async function list(req, res) {
    const results = await tableService.list();
    res.json({ data: results });
}

async function create(req, res, next) {
    const results = tableService.create(req.body.data);
    res.status(201).json({ data: results });
}

async function update(req, res) {
    const updatedTable = {
        ...req.body.data,
        table_id: res.locals.table.table_id,
    };
    const result = await tableService.update(updatedTable);
    res.json({ data: result });
}

async function destroy(req, res) {
    const { table_id, reservation_id } = req.params;
    await tableService.read(table_id);
    await tableService.delete(reservation_id);
    res.sendStatus(204);
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    create: [asyncErrorBoundary(hasOnlyValidProperties), asyncErrorBoundary(create)],
    update: [asyncErrorBoundary(hasOnlyValidProperties), asyncErrorBoundary(tableExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(tableExists), asyncErrorBoundary(destroy)],
}