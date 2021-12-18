import React, { useState, useEffect } from 'react';
import db from '../../db';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Coupon from './Coupon';

function Coupons() {

  const [coupons, setCoupons] = useState([])
  const [users, setUsers] = useState([])
  
//   const [coupon, setCoupon] = useState([])
//   useEffect(() => (async () => setCoupon(await db.Coupon.findAll()))(), [])
  const [id, setId] = useState(0)
  const [userid, setUserid] = useState("")
  const [discount, setDiscount] = useState(0)
  const [coupcode, setCoupcode] = useState("")
  const [datevalid, setDatevalid] = useState(new Date())
  
  
  useEffect(() => (async () => setCoupons(await db.Coupon.findAll()))(), [])
  useEffect(() => (async () => setUsers(await db.Users.findAll()))(), [])

  const create = async () => {
    await db.Coupon.create(setCoupons, { id, userid, discount, datevalid, coupcode})
    setId(0)
    setUserid("")
    setDiscount(0)
    setDatevalid(new Date())
    setCoupcode("")
  }

  const remove = async id =>
  await db.Coupon.remove(setCoupons, id)

  const edit = async id => {
    const coupon = await db.Coupon.findOne(id)
    setId(coupon.id)
    setUserid(coupon.userid)
    setDiscount(coupon.discount)
    setDatevalid(coupon.datevalid)
    setCoupcode(coupon.coupcode)
  }
  
  const update = async () => {
    await db.Coupon.update(setCoupons, { id, userid, discount, datevalid, coupcode })
    setId(0)
    setUserid("")
    setDiscount(0)
    setDatevalid(new Date())
    setCoupcode("")
  }

const [validCreate, setValidCreate] = useState(false)
 useEffect( () => setValidCreate(userid != "" &&
  discount > 0 &&
 datevalid >= new Date() &&
 coupcode !== "" ),
  [userid, discount, datevalid, coupcode])
  
const [validUpdate, setValidUpdate] = useState(false)
useEffect(() => (async () => setValidUpdate(
    id > 0 &&
    userid != "" &&
  discount > 0 &&
 datevalid >= new Date() &&
 coupcode !== ""  &&
    await db.Coupon.findOne(id) !== undefined
))(), [id, userid, discount, datevalid, coupcode])

  return (
    <div classDiscount="App">
      <header classDiscount="App-header">
        <h1>Coupons</h1>
        <p>Create Coupons and Reward our Customers with Discounts</p>

        <Table striped hover variant="light" size="sm">
          <thead>
            <tr>
              <th>Coupon ID Number</th>
              <th>Discount</th>
              <th>Datevalid</th>
              <th>Coupon code</th>
              <th>Buttons</th>
              <th>Email Recipient</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td><Form.Control as="select" size="sm" onChange={event => setUserid(event.target.value)} >
            <option key = {""} value="">Select a Coupon Recipient</option>
              {
                users.filter(user => user.role == "Customer").map(user =>
                  <option key={user.id} value={user.id}>{user.name}</option>)
              }
            </Form.Control>
            </td>
              <td><Form.Control size="sm" type="number" onChange={event => setDiscount(1 * event.target.value)} placeholder="Discount" value={discount} /></td>
              <td><Form.Control size="sm" type="date" onChange={event => setDatevalid(new Date(event.target.value))} placeholder="Datevalid" value={datevalid.toISOString().slice(0, 10)} /></td>
              <td><Form.Control size="sm" type="text" onChange={event => setCoupcode(event.target.value)} placeholder="Coupcode" value={coupcode} /></td>
              
              <td><Button variant="success" size="sm" onClick={create} disabled={!validCreate}>Create</Button>{' '}
                <Button variant="info" size="sm" onClick={update} disabled={!validUpdate}>Update</Button>{' '}</td>
            </tr>
            {
              coupons.map(coupon =>
                <Coupon key={coupon.id} coupon={coupon} edit={edit} remove={remove}/>
              )
            }
          </tbody>
        </Table>

      </header>
    </div>
  );
}

export default Coupons;
