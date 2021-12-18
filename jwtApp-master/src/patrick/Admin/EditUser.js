import React, { useEffect, useState } from 'react'
import db from '../../db'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory, useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'

export default function EditUser() {

  const { id } = useParams();

  const [user, setUser] = useState(null)
  useEffect(() => (async () => setUser(await db.Users.findOne(id)))(), [id])

  const [name, setName] = useState("")
  useEffect(() => user && setName(user.name), [user])

  const [phone, setPhone] = useState("")
  useEffect(() => user && setPhone(user.phone), [user])

  const [address, setAddress] = useState("")
  useEffect(() => user && setAddress(user.address), [user])

  const [image, setImage] = useState("")
  useEffect(() => user && setImage(user.image), [user])

  const [role, setRole] = useState("")
  useEffect(() => user && setRole(user.role), [user])

  const roles = ["Customer", "Marketer", "Seller", "Support"]

  const history = useHistory()

  const handleImage = async event => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      const extension = file.name.split('.').pop()
      const newName = `UsersPicture${user.id}.${extension}`
      const result = await db.uploadImage(file, newName)
      if (result.ok) {
        setImage(`/images/${newName}`)
      }
    }
  }

  const update = async () => {
    await db.Users.update(() => null, { id, name, phone, address, image, role })
    history.push("/users")
  }

  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    name !== "" &&
    phone !== "" &&
    phone.length <= 8 &&
    address !== "" &&
    image !== "" &&
    await db.Users.findOne(id) !== undefined
  ))(), [id, name, phone, address, image])

  return (
    user ?
    <div>
      <h1>Edit User</h1>
      <dl className="row">
        <dt className="col-sm-3">Email</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" disabled value={user.id} /></dd>
        <dt className="col-sm-3">Name</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" onChange={event => setName(event.target.value)} value={name} /></dd>
        <dt className="col-sm-3">Phone</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" onChange={event => setPhone(event.target.value)} value={phone} /></dd>
        <dt className="col-sm-3">Address</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" onChange={event => setAddress(event.target.value)} value={address} /></dd>
        <dt className="col-sm-3">Image</dt>
        <dd className="col-sm-9"><img alt="" src={`${image}?${new Date().getTime()}`} height="100" /><Form.File custom label="Choose new picture" onChange={handleImage} /></dd>
        <dt className="col-sm-3">Role</dt>
        {
          role === "Admin" ? 
          <dd className="col-sm-9">
          <Form.Control size="sm" type="text" disabled value={role} />
        </dd>
          :
          <dd className="col-sm-9">
          <Form.Control as="select" value={role} onChange={event => setRole(event.target.value)}>
            {
              roles.map(role =>
                <option key={role} value={role}>{role}</option>
              )
            }
          </Form.Control>
        </dd>
        }
      </dl>
      <Button size="sm" variant="light" onClick={update} disabled={!validUpdate}>Update</Button>
      <Button size="sm" variant="link" as={Link} to={'/users'}>Back to Users List</Button>
    </div >
    :
    <p>
    <Spinner animation="border" variant="dark" /> &nbsp;
    Please wait...
    </p>
  );
}