import React, { useContext, useEffect, useState } from 'react'
import db from '../db'
import {Button, Form, Card} from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import UserContext from '../UserContext'

export default function UpdateProfile() {

  const { user } = useContext(UserContext)

  const [user2, setUser2] = useState(null)
  useEffect(() => (async () => user && setUser2(await db.Users.findOne(user.id)))(), [user])

  const id = user2 && user2.id

  const [name, setName] = useState("")
  useEffect(() => user2 && setName(user2.name), [user2])

  const [phone, setPhone] = useState("")
  useEffect(() => user2 && setPhone(user2.phone), [user2])

  const [address, setAddress] = useState("")
  useEffect(() => user2 && setAddress(user2.address), [user2])

  const [image, setImage] = useState("")
  useEffect(() => user2 && setImage(user2.image), [user2])

  const role = user2 && user2.role

  const history = useHistory()

  const update = async () => {
    await db.Users.update(() => null, { id, name, phone, address, image, role })
    history.push("/profile")
  }

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

  const handleEmail = async () => {
    await db.email(user.id, user.name, user.picture)
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
    user2 &&
    <div>
      <br></br>

      <Card>
        <Card.Header>Update Profile</Card.Header>
        <Card.Body>
          <dl className="row">
          <dt className="col-sm-3">Email</dt>
          <dd className="col-sm-9"><Form.Control size="sm" type="text" disabled value={user2.id} /></dd>
          <dt className="col-sm-3">Name</dt>
          <dd className="col-sm-9"><Form.Control size="sm" type="text" onChange={event => setName(event.target.value)} value={name} /></dd>
          <dt className="col-sm-3">Phone</dt>
          <dd className="col-sm-9"><Form.Control size="sm" type="text" onChange={event => setPhone(event.target.value)} value={phone} /></dd>
          <dt className="col-sm-3">Address</dt>
          <dd className="col-sm-9"><Form.Control size="sm" type="text" onChange={event => setAddress(event.target.value)} value={address} /></dd>
          <dt className="col-sm-3">Image</dt>
          <dd className="col-sm-9"><img alt="" src={`${image}?${new Date().getTime()}`} height="100" width="100" /><Form.File custom label="Choose new picture" onChange={handleImage} /></dd>
          <dt className="col-sm-3">Role</dt>
          <dd className="col-sm-9"><Form.Control size="sm" type="text" disabled value={role} /></dd>
        </dl>
        <Button size="sm" variant="success" onClick={update} disabled={!validUpdate}>Update</Button> &nbsp;
        <Button size="sm" variant="danger" as={Link} to={'/profile'}>Undo Changes</Button>
        </Card.Body>
      </Card> 
    </div >
  );
}