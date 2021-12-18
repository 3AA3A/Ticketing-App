import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../UserContext';

import db from '../../db'
import Table from 'react-bootstrap/Table';
import Promo from './Promo'
import Coup from './Coup'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";

export default function Marketers() {

const { user } = useContext(UserContext)
  

  const [coupons, setCoupons] = useState([])
  const [promotions, setPromotions] = useState([])

  useEffect(() => (async () => setCoupons(await db.Coupon.findAll()))(), [])

  useEffect(() => (async () => setPromotions(await db.Promotion.findAll()))(), [])


  return (
    user &&
    <>
      <Jumbotron>
        <h1>Welcome, {user.name}!</h1>
        <p>View and manage coupons & promotions and keep track of customer favorites.</p>
      </Jumbotron>
      
      <h4>Coupons</h4>
      <Table striped hover variant="light" size="sm">
        <thead>
          <tr>
            <th>Email</th>
            <th>Discount Percentage</th>
            <th>DateValid</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
         
          {
            coupons.map((coupon) => <Coup key={coupon.id} coupon={coupon} />)
          }
        </tbody>
      </Table>

      <h4>Promotions</h4>
      <Table striped hover variant="light" size="sm">
        <thead>
          <tr>
          <th>Discount Amount</th>
            <th>Date From</th>
            <th>Date To</th>
            <th>Event Name</th>
            
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            promotions.map(promotion => <Promo key={promotion.id} promotion={promotion} />)
          }
        </tbody>
      </Table>
    </>
  )
}