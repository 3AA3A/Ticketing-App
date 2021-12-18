import React, { useEffect, useState } from 'react'
import db from '../../db'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import User from './User'

export default function Users() {

  const [users, setUsers] = useState([])
  

  useEffect(() => (async () => setUsers(await db.Users.findAll()))(), [])

  

  

  return (
    <div>
      <h1>List of All Customers</h1>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Home Address</th>
          </tr>
        </thead>
        <tbody>
          {
            users.filter(user => user.role === "Customer").map(user =>
              <User key={user.id} user={user} />
          
            )
          }
        </tbody>
      </Table>
    </div >
  );
}