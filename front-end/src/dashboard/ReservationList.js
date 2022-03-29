import React, { useState, useEffect } from "react";
import { previous, today, next } from "../utils/date-time";
import axios from "axios"


export default function ReservationList({ date, setDate }) {
    const [reservations, setReservations] = useState([]);
    const [currentPage, setCurrentPage] = useState("Today");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const abortControl = new AbortController();

        const fetchReservations = async () => {
            setLoading(true);
            const response = await fetch("https://jsonplaceholder.typicode.com/users",  {signal: abortControl.signal});
            setReservations(response.data);
            setLoading(false);
        }

        fetchReservations();

        return () => {
            abortControl.abort()
        }
    }, [])
    
    console.log(reservations);
  
  return (
    <nav className="d-flex justify-content-center" aria-label="page navigation">
      <ul className="pagination">
        <li>
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo; Previous</span>
          </a>
        </li>
        <li>
          <a className="page-link" href="#" aria-label="Today" >
            <span aria-hidden="true">Today</span>
          </a>
        </li>
        <li>
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">Next &raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
