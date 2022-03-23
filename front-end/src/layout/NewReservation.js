import React from 'react';
import { Link } from 'react-router-dom';

export default function NewReservation() {
  return (
    <div>
        <nav area-label="breadcrumb">
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <Link to={"/"}>Dashboard</Link>
                </li>
                <li className='breadcrumb-item active' area-label='page'>
                    New Reservation
                </li>
            </ol>
        </nav>
       <form className='row g-3'>
           <div className='col-md-4'>
               <label className='form-label' htmlFor='validationDefault01'>First Name</label>
               <input type='text' id='validationDefault01' className='form-control' name='first_name'  placeholder='Please input first name' required />
           </div>
           <div className='col-md-4'>
               <label className='form-label' htmlFor='validationDefault02'>Last Name</label>
               <input type='text' id='validationDefault02' className='form-control' name='last_name'  placeholder='Please input last name' required />
           </div>
           <div className='col-md-3'>
               <label className='form-label' htmlFor='validationDefault03'>Mobile Number</label>
               <input type='tel' id='validationDefault03' className='form-control' name='mobile_number'  placeholder='XXX-XXX-XXXX' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' size={20} minLength={10} maxLength={12} required />
           </div>
           <div className='col-md-2'>
               <label className='form-label' htmlFor='validationDefault04'>Date of Reservation</label>
               <input type='date' id='validationDefault04' className='form-control' name='reservation_date'  placeholder='YYYY-MM-DD' pattern="\d{4}-\d{2}-\d{2}" required />
           </div>
           <div className='col-md-2'>
               <label className='form-label' htmlFor='validationDefault05'>Time of Reservation</label>
               <input type='time' id='validationDefault05' className='form-control' name='reservation_time'  placeholder="HH:MM" pattern="[0-9]{2}:[0-9]{2}" required />
           </div>
           <div className='col-md-2'>
               <label className='form-label' htmlFor='validationDefault06'>Party Size</label>
               <input type='number' id='validationDefault06' className='form-control' name='people' min={1} placeholder='Select party size' required />
               <div id='partySizeHelp' className='form-text '>Party size minimum: 1</div>
           </div>
           <div className='col-12 mb-3'>
               <button type='submit' className='btn btn-primary '>Submit</button>
           </div>
           <div className='col-12'>
               <Link to={"/"} className='btn btn-secondary'>Cancel</Link>
           </div>
       </form> 
    </div>
  )
}
