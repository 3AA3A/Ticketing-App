import React, {useContext, useEffect, useState } from 'react'
import db from '../../db'
import Form from 'react-bootstrap/Form';
import {
  Link,
  useHistory
} from "react-router-dom";
import {Button, Card} from 'react-bootstrap';
import UserContext from '../../UserContext'

export default function AddVenue() {
    const history = useHistory()
    const [userx, setUserx] = useState(null);

    useEffect(
      () => (async () => setUserx(await db.Users.findAll()))(),
      []
    );

    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [capacity, setCapacity] = useState(0)

    const { user } = useContext(UserContext)


    const create = async () => {
      await db.Venues.create(() => null, {name, city, image:"/default.png", capacity})
      history.push('/events')
      handleEmail()
    }
  
    const [validCreate, setValidCreate] = useState(false)
    useEffect(() => (async () => setValidCreate(
      name !== "" &&
      city !== "" &&
      capacity > 0
    ))(), [ name, city, capacity ])

    const handleEmail = async () => {
      await userx.filter(use=> use.role=="Admin").map(use => db.email(
        use.id,
        `Verify New Venue!!!`,
        `<img src="https://www.visitmanchester.com/imageresizer/?image=%2Fdbimgs%2FMusic%20Venues.jpg&action=Background_Overlay">
        <br>
        <h2>A New Venue was Added and Awaits Verification<h2>
        <p>${user && user.name} has added a new venue. The Venue Details are as follows:</p>

        <p> Venue's Name : ${name} </p>
        <p>City Venue Located in: ${city}</p>
        <p>Venue Capacity: ${capacity}</p>
        <p>Please respond and verify this Venue as soon as possible...</p>
        
        <a href="http://localhost:3000/login">
        <em>Click this Link to Verify new Venue</em>
        </a>
        `
      ))
    }

    return (
    <>
    <br></br>
      <Card>
          <Card.Header>Add a New Venue</Card.Header>
          <Card.Body>
          <dl className='row'>
            <dt className='col-sm-3'>Name</dt>
            <dd className='col-sm-9'><Form.Control size='sm' type='text' placeholder='Name' value={name} onChange={event => setName(event.target.value)}/></dd>
            <dt className='col-sm-3'>City</dt>
            <dd className='col-sm-9'><Form.Control size='sm' type='text' placeholder='City' value={city} onChange={event => setCity(event.target.value)}/></dd>
            <dt className='col-sm-3'>Capacity</dt>
            <dd className='col-sm-9'><Form.Control size='sm' type='number' placeholder='Capacity' value={capacity} onChange={event => setCapacity(1 * event.target.value)}/></dd>
          </dl>
          <Button size="sm" variant="success" onClick={create} disabled={!validCreate}>Create</Button> &nbsp;
          <Button size="sm" variant="danger" as={Link} to={`/events`}>Cancel</Button>
          <Form.Text className="text-muted"><strong>Note</strong>: The venue will not be shown in the dropdown list until an admin verifies them.</Form.Text>
          </Card.Body>
      </Card>
    </>
  )
}