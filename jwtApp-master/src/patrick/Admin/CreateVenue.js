import React, { useEffect, useState } from 'react'
import db from '../../db'
import Form from 'react-bootstrap/Form';
import {
  Link,
  useHistory
} from "react-router-dom";
import Button from 'react-bootstrap/Button';


export default function CreateVenue() {
  const history = useHistory()

  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [image, setImage] = useState("/default.png")
  const [capacity, setCapacity] = useState(0)

  const create = async () => {
    await db.Venues.create(() => null, { name, city, image, capacity })
    history.push('/venues')
  }

  const [validCreate, setValidCreate] = useState(false)
  useEffect(() => (async () => setValidCreate(
    name !== "" &&
    city !== "" &&
    capacity > 0 && capacity <= 9999
  ))(), [name, city, capacity])

  const handleImage = async event => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      const extension = file.name.split('.').pop()
      const venName = name.split(" ")
      const newName = `Venue${venName}.${extension}`
      const result = await db.uploadImage(file, newName)
      if (result.ok) {
        setImage(`/images/${newName}`)
      }
    }
  }

  return (
    <>
      <br></br>
      <h1>Add a New Venue</h1>
      <dl className='row'>
        <dt className='col-sm-3'>Name</dt>
        <dd className='col-sm-9'><Form.Control size='sm' type='text' placeholder='Name' value={name} onChange={event => setName(event.target.value)} /></dd>
        <dt className='col-sm-3'>City</dt>
        <dd className='col-sm-9'><Form.Control size='sm' type='text' placeholder='City' value={city} onChange={event => setCity(event.target.value)} /></dd>
        <dt className="col-sm-3">Image</dt>
        <dd className="col-sm-9"><img alt="" src={`${image}?${new Date().getTime()}`} height="100" /><Form.File custom label="Choose new picture" onChange={handleImage} /></dd>
        <dt className='col-sm-3'>Capacity</dt>
        <dd className='col-sm-9'><Form.Control size='sm' type='number' placeholder='Capacity' value={capacity} onChange={event => setCapacity(1 * event.target.value)} /></dd>
      </dl>
      <Button size="sm" variant="success" onClick={create} disabled={!validCreate}>Create</Button> &nbsp;
      <Button size="sm" variant="danger" as={Link} to={`/venues`}>Cancel</Button>
    </>
  )
}