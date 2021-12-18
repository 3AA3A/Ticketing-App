import React, { useEffect, useState } from 'react'
import db from '../../db'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory, useParams, Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'

export default function EditVenue() {

  const history = useHistory()

  const { id: stringId } = useParams()
  const id = 1 * stringId 
  
  const [venue, setVenue] = useState(null)
  useEffect(() => (async () => setVenue(await db.Venues.findOne(id)))(), [id])

  const [name, setName] = useState("")
  useEffect(() => venue && setName(venue.name), [venue])

  const [city, setCity] = useState("")
  useEffect(() => venue && setCity(venue.city), [venue])

  const [image, setImage] = useState("")
  useEffect(() => venue && setImage(venue.image), [venue])

  const [capacity, setCapacity] = useState(0)
  useEffect(() => venue && setCapacity(venue.capacity), [venue])

  const update = async () => {
    await db.Venues.update(() => null, { id, name, city, image, capacity})
    history.push(`/venues`)
  }

  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    name !== "" &&
    city !== "" &&
    capacity > 0 &&
    id > 0 &&
    await db.Venues.findOne(id) !== undefined 
  ))(), [id, name, city, capacity])

  const handleImage = async event => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      const extension = file.name.split('.').pop()
      const newName = `Venue${venue.id}.${extension}`
      const result = await db.uploadImage(file, newName)
      if (result.ok) {
        setImage(`/images/${newName}`)
      }
    }
  }

  return (
    venue ?
    <div>
      <h1>Edit Venue</h1>
      <dl className='row'>
        <dt className='col-sm-3'>Name</dt>
        <dd className='col-sm-9'><Form.Control size='sm' type='text' placeholder='Name' value={name} onChange={event => setName(event.target.value)} /></dd>
        <dt className='col-sm-3'>City</dt>
        <dd className='col-sm-9'><Form.Control size='sm' type='text' placeholder='City' value={city} onChange={event => setCity(event.target.value)} /></dd>
        <dt className="col-sm-3">Image</dt>
        <dd className="col-sm-9"><img alt="" src={`${image}?${new Date().getTime()}`} height="150" /><Form.File custom label="Choose new picture" onChange={handleImage} /></dd>
        <dt className='col-sm-3'>Capacity</dt>
        <dd className='col-sm-9'><Form.Control size='sm' type='number' placeholder='Capacity' value={capacity} onChange={event => setCapacity(1 * event.target.value)} /></dd>
      </dl>
      <Button size="sm" variant="success" onClick={update} disabled={!validUpdate}>Update</Button> &nbsp;
      <Button size="sm" variant="danger" as={Link} to={`/venues`}>Undo Changes</Button>
    </div >
    :
    <p>
    <Spinner animation="border" variant="dark" /> &nbsp;
    Please wait...
    </p>
  );
}