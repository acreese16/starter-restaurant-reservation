import React, { useState } from "react";
import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { Link } from "react-router-dom";

export default function NewReservation() {
  const [newForm, setNewForm] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  const [error, setError] = useState(null);
  const history = useHistory();

  const formChangeHandler = ({ target }) => {
    setNewForm({ ...newForm, [target.name]: target.value });
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const abortControl = new AbortController();

    const response = await createReservation(newForm, abortControl.signal);
    history.push(`/dashboard?date=${newForm.reservation_date}`);
    return response;
  };

  return (
    <div>
      {/* Navigation */}
      <nav area-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Dashboard</Link>
          </li>
          <li className="breadcrumb-item active" area-label="page">
            New Reservation
          </li>
        </ol>
      </nav>
      {/* New Reservation Picture */}
      <div>
        <img
          src="../media/steak-asparagus.jpg"
          className="img-fluid rounded d-block mx-auto"
          alt="steak-asparagus"
        />
      </div>
      <ErrorAlert error={error} />
      <ReservationForm
        submitFormHandler={submitFormHandler}
        formChangeHandler={formChangeHandler}
        newForm={newForm}
        history={history}
      />
    </div>
  );
}
