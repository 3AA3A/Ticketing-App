import React, { useContext, useState, useEffect } from 'react';
import db from '../../db';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UserContext from '../../UserContext'
import MyCoupon from './MyCoupon';

function Coupons() {
    const { user } = useContext(UserContext)
    const userxid = user && user.id
  const [coupons, setCoupons] = useState([])
  
  
//   const [coupon, setCoupon] = useState([])
//   useEffect(() => (async () => setCoupon(await db.Coupon.findAll()))(), [])
  
  
  
  useEffect(() => (async () => setCoupons(await db.Coupon.findAll()))(), [])
  

  

  

  return (
    <div classDiscount="App">
      <header classDiscount="App-header">
        <h1>My Coupons</h1>
        <p>Check out your coupons</p>

        <Table striped hover variant="light" size="sm">
          <thead>
            <tr>
            <th>Coupon code</th>
              <th>Discount</th>
              <th>Datevalid</th>
              
              
              
            </tr>
          </thead>
          <tbody>
            
            {
              coupons.filter(coupon => coupon.userid == userxid).map(coupon =>
                <MyCoupon key={coupon.id} coupon={coupon}/>
              )
            }
          </tbody>
        </Table>

      </header>
    </div>
  );
}

export default Coupons;
