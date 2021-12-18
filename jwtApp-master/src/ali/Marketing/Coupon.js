import React, { useState, useEffect } from "react";
import db from "../../db";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Coupon({ coupon, edit, remove }) {
  const [user, setUser] = useState(null);

  useEffect(
    () => (async () => setUser(await db.Users.findOne(coupon.userid)))(),
    [coupon.userid]
  );

  const handleEmail = async () => {
    await db.email(
      user && user.id,
      `Congratulations ${user && user.name}!!!`,
      `<img src="https://i0.wp.com/sociallover.net/wp-content/uploads/2017/05/congratulations-images-2.png?fit=640%2C360">
      <br>
      <h2>Congratulations Lucky Winner!!!<h2>
      <p>You have been randomly selected to recive a ${coupon.discount}% discount coupon.</p>
      <p> The Coupon Expires on ${coupon.datevalid}. </p>
      <p>Your Coupon Code is: ${coupon.coupcode}</p>
      <p>Hurry now and get a deal to our Hottests Events available today...</p>
      
      <a href="http://localhost:3000/mary/user/Events">
      <em>Check out our Latest Events!!!</em>
      </a>
      `
    )
  }

  return (
    user && (
      <tr key={coupon.id}>
        <td>{user.name}</td>
        <td>{coupon.discount}%</td>
        <td>
          {coupon.datevalid.toDateString().split(" ").splice(1).join(" ")}
        </td>
        <td>{coupon.coupcode}</td>
        
        <td>
          <Button variant="danger" size="sm" onClick={() => remove(coupon.id)}>
            X
          </Button>{' '}
          <Button variant="warning" size="sm" onClick={() => edit(coupon.id)}>
            Edit
          </Button>{' '}
         
        </td>
        <td><Button size="sm" variant="light" onClick={handleEmail}>Email Code</Button></td>
      </tr>
    )
  );
}

export default Coupon;
