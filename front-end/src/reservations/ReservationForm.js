import React from "react";
import { Link } from "react-router-dom";

export default function ReservationForm({
  submitFormHandler,
  formChangeHandler,
  newForm,
  history,
}) {
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

  return (
    <div>
      <main>
        {/* New Reservation Form */}
        <div className="d-flex card border-dark mb-3">
          <div className="card-header text-center">
            <strong>Reservation</strong>
          </div>
          <form className="row g-3 mt-2 ml-3 needs-validation" noValidate>
            <div className="col-md-3">
              <label className="form-label" htmlFor="validationCustom01">
                First Name
              </label>
              <input
                type="text"
                id="validationCustom01"
                className="form-control"
                name="first_name"
                placeholder="Please input first name"
                required
              />
              <div className="valid-feedback alert alert-success">Looks good!</div>
              <div className="invalid-feedback alert alert-danger">
                Must add customer's first name
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label" htmlFor="validationCustom02">
                Last Name
              </label>
              <input
                type="text"
                id="validationCustom02"
                className="form-control"
                name="last_name"
                placeholder="Please input last name"
                required
              />
              <div className="valid-feedback alert alert-success">Looks good!</div>
              <div className="invalid-feedback alert alert-danger">
                Please add customer's last name
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label" htmlFor="validationCustom03">
                Mobile Number
              </label>
              <input
                type="tel"
                id="validationCustom03"
                className="form-control"
                name="mobile_number"
                placeholder="xxx-xxx-xxxx"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                maxLength={12}
                required
              />
              <div className="valid-feedback alert alert-success">Looks good!</div>
              <div className="invalid-feedback alert alert-danger">
                Please add valid customer phone number
              </div>
            </div>

            <br />
            
            <div className="col-md-4">
              <label className="form-label" htmlFor="validationCustom04">
                Date of Reservation
              </label>
              <input
                type="date"
                id="validationCustom04"
                className="form-control"
                name="reservation_date"
                placeholder="YYYY-MM-DD"
                pattern="\d{4}-\d{2}-\d{2}"
                min={new Date().toUTCString().split("T")[0]}
                required
              />
              <div className="valid-feedback alert alert-success">Looks good!</div>
              <div className="invalid-feedback alert alert-danger">Please select a valid date</div>
            </div>
            <div className="col-md-3">
              <label className="form-label" htmlFor="validationCustom05">
                Time of Reservation
              </label>
              <input
                type="time"
                id="validationCustom05"
                className="form-control"
                name="reservation_time"
                placeholder="HH:MM"
                pattern="[0-9]{2}:[0-9]{2}"
                min="10:30"
                max="21:30"
                step="900"
                required
              />
              <div className="valid-feedback alert alert-success">Looks good!</div>
              <div className="invalid-feedback alert alert-danger">Please select a valid time</div>
            </div>
            <div className="col-md-2">
              <label className="form-label" htmlFor="validationCustom06">
                Party Size
              </label>
              <input
                type="number"
                id="validationCustom06"
                className="form-control"
                name="people"
                min={1}
                step="1"
                placeholder="Select party size"
                required
              />
              <div className="valid-feedback alert alert-success">Looks good!</div>
              <div className="invalid-feedback alert alert-danger">Party minimum: 1</div>
            </div>
            <div className="col-12 mb-3 mt-3">
              <button type="submit" className="btn btn-primary ">
                Submit
              </button>
            </div>
            <div className="col mb-3 mt-3">
              <Link to={"/"} className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
