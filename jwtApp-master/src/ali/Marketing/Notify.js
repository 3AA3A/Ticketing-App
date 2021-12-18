import React, { useState, useEffect } from "react";
import db from "../../db";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Notify({ user }) {
  

  

  

  const handleEmail = async () => {
    await db.email(
      user.id,
      `Congratulations ${event && event.name}!!!`,
      `<img src="https://i0.wp.com/sociallover.net/wp-content/uploads/2017/05/congratulations-images-2.png?fit=640%2C360">
      <br>
      <h2>Congratulations Lucky Winner!!!<h2>
      <p>You have been randomly selected to recive a ${promotion.discount}% discount promotion.</p>
      <p> The Promotion Expires on ${promotion.datevalid}. </p>
      <p>Your Promotion Code is: ${promotion.coupcode}</p>
      <p>Hurry now and get a deal to our Hottests Events available today...</p>
      
      <a href="http://localhost:3000/mary/event/Events">
      <em>Check out our Latest Events!!!</em>
      </a>
      `
    )
  }

  return (
    event && (
      <tr key={promotion.id}>
        
        <td>{promotion.discountamount}</td>
        <td>
          {promotion.datefrom.toDateString().split(" ").splice(1).join(" ")}
        </td>
        <td>
          {promotion.dateto.toDateString().split(" ").splice(1).join(" ")}
        </td>
        <td>{event.name}</td>
        
        <td>
          <Button variant="danger" size="sm" onClick={() => remove(promotion.id)}>
            X
          </Button>
          <Button variant="warning" size="sm" onClick={() => edit(promotion.id)}>
            Edit
          </Button>
          <Button
            variant="link"
            size="sm"
            as={Link}
            to={`/registerdetail/${promotion.id}`}
          >
            Details
          </Button>{" "}
        </td>
        {
              users.map(user =>
                <Notify key={user.id} user={user}/>
              )
            }
        <td><Button size="sm" variant="light" onClick={handleEmail}>Notify Customers</Button></td>
      </tr>
    )
  );
}

export default Notify;
