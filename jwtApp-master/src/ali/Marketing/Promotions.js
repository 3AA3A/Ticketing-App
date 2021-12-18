import React, { useState, useEffect } from 'react';
import db from '../../db';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Promo from './Promo';

import Promotion from './Promotion';

function Promotions() {

  const [promotions, setPromotions] = useState([])
  const [users, setUsers] = useState([])
  const [events, setEvents] = useState([])
  
//   const [promotion, setPromotion] = useState([])
//   useEffect(() => (async () => setPromotion(await db.Promotion.findAll()))(), [])
  const [id, setId] = useState(0)
  const [discountamount, setDiscountamount] = useState(0)
  const [datefrom, setDatefrom] = useState(new Date())
  const [dateto, setDateto] = useState(new Date())
  const [eventid, setEventid] = useState(0)
  
  useEffect(() => (async () => setPromotions(await db.Promotion.findAll()))(), [])
  useEffect(() => (async () => setUsers(await db.Users.findAll()))(), [])
  useEffect(() => (async () => setEvents(await db.Events.findAll()))(), [])

  const create = async () => {
    await db.Promotion.create(setPromotions, { id, discountamount, datefrom, dateto, eventid})
    setId(0)
    setDiscountamount(0)
    setDatefrom(new Date())
    setDateto(new Date())
    setEventid(0)
  }

  const remove = async id =>
  await db.Promotion.remove(setPromotions, id)

  const edit = async id => {
    const promotion = await db.Promotion.findOne(id)
    setId(promotion.id)
    setDiscountamount(promotion.discountamount)
    setDatefrom(promotion.datefrom)
    setDateto(promotion.dateto)
    setEventid(promotion.eventid)
  }
  
  const update = async () => {
    await db.Promotion.update(setPromotions, { id, discountamount, datefrom, dateto, eventid })
    setId(0)
    setDiscountamount(0)
    setDatefrom(new Date())
    setDateto(new Date())
    setEventid(0)
  }

const [validCreate, setValidCreate] = useState(false)
 useEffect( () => setValidCreate(
  discountamount > 0 &&
 datefrom >= new Date() &&
 dateto >= new Date() &&
 eventid > 0 ),
  [discountamount, datefrom, dateto, eventid])
  
const [validUpdate, setValidUpdate] = useState(false)
useEffect(() => (async () => setValidUpdate(
    id > 0 &&
    discountamount > 0 &&
 datefrom >= new Date() &&
 dateto >= new Date() &&
 eventid > 0 &&
    await db.Promotion.findOne(id) !== undefined
))(), [id, discountamount, datefrom, dateto, eventid])


// const handleEmail = async () => {
//     await db.email(
//       user && user.id,
//       `Promotion & Deals!!!`,
//       `<img src="https://i0.wp.com/sociallover.net/wp-content/uploads/2017/05/congratulations-images-2.png?fit=640%2C360">
//       <br>
//       <h2>We have a New Promotion!!!<h2>
//       <p>We would like to inform you of our latest Promotion for  ${promo.discountamount}% discount coupon.</p>
//       <p> The Promotion Starts on ${promo.datefrom}. </p>
//       <p> The Promotion Ends on ${promo.dateto}. </p>
//       <p>Hurry now and get a deal to our Hottests Events available today...</p>
      
//       <a href="http://localhost:3000/mary/user/Events">
//       <em>Check out our Latest Events!!!</em>
//       </a>
//       `
//     )
//   }



  return (
    <div classDiscountamount="App">
      <header classDiscountamount="App-header">
        <h1>Promotions</h1>
        <p>Offer Deals and Price Reductions on Certain Events</p>

        <Table striped hover variant="light" size="sm">
          <thead>
            <tr>
              <th>Discount Amount</th>
              <th>Begins</th>
              <th>Ends</th>
              <th>Event Name</th>
              <th>Buttons</th>
              <th>Notify Customers</th>
            
            </tr>
          </thead>
          <tbody>
            <tr>
            
              <td><Form.Control size="sm" type="number" onChange={event => setDiscountamount(1 * event.target.value)} placeholder="Discountamount" value={discountamount} /></td>
              <td><Form.Control size="sm" type="date" onChange={event => setDatefrom(new Date(event.target.value))} placeholder="Datefrom" value={datefrom.toISOString().slice(0, 10)} /></td>
             <td><Form.Control size="sm" type="date" onChange={event => setDateto(new Date(event.target.value))} placeholder="Dateto" value={dateto.toISOString().slice(0, 10)} /></td>
              <td><Form.Control as="select" size="sm" onChange={event => setEventid(event.target.value)} >
            <option key = {""} value="">Select an Event</option>
              {
                events.map(event =>
                  <option key={event.id} value={event.id}>{event.name}</option>)
              }
            </Form.Control>
            </td>
              <td><Button variant="success" size="sm" onClick={create} disabled={!validCreate}>Create</Button>{' '}
                <Button variant="info" size="sm" onClick={update} disabled={!validUpdate}>Update</Button>{' '}</td>
            </tr>
            {
              promotions.map(promotion =>
                <Promotion key={promotion.id} promotion={promotion} edit={edit} remove={remove}/>
              )
            }
          </tbody>
        </Table>
<hr></hr>
        {/* <h1>Notify Customers</h1>


<Table striped hover variant="light" size="sm">
  <thead>
    <tr>
      <th>Customer Name</th>
      <th>Promotion</th>
      <th>Send Notification</th>
    
    </tr>
  </thead>
  <tbody>
      <tr>
      <td><Form.Control as="select" size="sm"  >
            <option key = {""} value="">Select a Customer</option>
              {
                users.filter(user => user.role == "Customer").map(user =>
                  <option key={user.id} value={user.id}>{user.name}</option>)
                  
              }
            </Form.Control>
            </td>
  
      <td><Form.Control as="select" size="sm" onChange={event => setEventid(event.target.value)} >
    <option key = {""} value="">Select an Event</option>
      {
        promotions.map(promotion =>
          <Promo key={promotion.id} promotion={promotion}/>)
      }
    </Form.Control>
    </td>
       <td><Button size="sm" variant="light" >Email Code</Button></td>
        
     </tr>
   
  </tbody>
</Table>   */}


      </header>
    </div>
  );
}

export default Promotions;
