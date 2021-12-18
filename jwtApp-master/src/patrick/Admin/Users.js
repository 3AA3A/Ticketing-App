import React, { useContext, useEffect, useState } from 'react'
import db from '../../db'
import Table from 'react-bootstrap/Table';
import User from './User'
import Form from 'react-bootstrap/Form'
import UserContext from '../../UserContext'

export default function Users() {

  const { user } = useContext(UserContext)

  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [role, setRole] = useState("")
  const roles = ["Admin", "Customer", "Marketer", "Seller", "Support"]

  const [users, setUsers] = useState([])
  useEffect(() => (async () => setUsers(await db.Users.findByIdContainsAndNameContainsAndAddressContainsAndRoleContains(id, name, address, role)))(), [id, name, address, role])

  const remove = async id => await db.Users.remove(setUsers, id)

  return (
    <div>
      <br></br>
      <h2>Search By:</h2>
      <dl className="row">
        <dt className="col-sm-3">Email</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" onChange={event => setId(event.target.value)} value={id} /></dd>
        <dt className="col-sm-3">Name</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" onChange={event => setName(event.target.value)} value={name} /></dd>
        <dt className="col-sm-3">Address</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" onChange={event => setAddress(event.target.value)} value={address} /></dd>
        <dt className="col-sm-3">Role</dt>
        <dd className="col-sm-9">
          <Form.Control as="select" size='sm' value={role} onChange={event => setRole(event.target.value)}>
            <option key="" value="">All</option>
            {
              roles.map(role =>
                <option key={role} value={role}>{role}</option>
              )
            }
          </Form.Control>
        </dd>
      </dl>
      <h1>List of Users</h1>
      <Table striped hover variant="light" size="sm">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Home Address</th>
            <th>Image</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            users
            .filter(thisUser => thisUser.id !== user.id)
              .map(user =>
                <User key={user.id} user={user} remove={remove} />
              )
          }
        </tbody>
      </Table>
    </div >
  );
}