import React, { useState, useEffect } from "react";
import db from "../../db";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Promo({ promotion}) {
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(
    () => (async () => setUser(await db.Users.findAll()))(),
    []
  );

  useEffect(
    () => (async () => setEvent(await db.Events.findOne(promotion.eventid)))(),
    [promotion.eventid]
  );

  const handleEmail = async () => {
    await user.filter(use=> use.role=="Customer").map(use => db.email(
      use.id,
      `New Promotion !!!`,
      `<img src="http://sts-crm.com/storage/app/public/ArticlesPics/sales-promotions.jpg">
      <br>
      <h2>Hello ${use.name}</h2>
      <h2>Check out our latest Promotion for ${event && event.name}!!!<h2>
      <p>We are providing a discount of ${promotion.discountamount}%.</p>
      <p>This Promotion Starts on ${promotion.datefrom}. </p>
      <p>This Promotion Ends on ${promotion.dateto}. </p>
      <p>Keep up-to-date of our Latest Promotions & Deals to the Hottests Events in town...</p>
      
      <a href="http://localhost:3000/mary/user/Events">
      <em>Check out our Discounted Prices!!!</em>
      </a>
      `
    ))
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
        
       
        
      </tr>
    )
  );
}

export default Promo;
