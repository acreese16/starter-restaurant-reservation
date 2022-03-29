import React from 'react';
import { Link } from 'react-router-dom';
import ReservationForm from './ReservationForm';
import ErrorAlert from '../layout/ErrorAlert';

export default function EditReservation() {
  return (
    <div>
      {/* Navigation */}
      <nav area-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Dashboard</Link>
          </li>
          <li className='breadcrumb-item'>
              <Link to={"/reservations/:reservationId"}>Reservation: Id</Link>
          </li>
          <li className="breadcrumb-item active" area-label="page">
            Edit Reservation
          </li>
        </ol>
      </nav>

      <ReservationForm />
      <ErrorAlert />
    </div>
  )
}
