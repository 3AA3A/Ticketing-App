import React, { useEffect, useState } from 'react'
import db from '../../db'
import Venue from './Venue'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { Link } from "react-router-dom";

export default function Venues() {

  const [venues, setVenues] = useState([])
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(9999)

  useEffect(() => (async () => setVenues(await db.Venues.findByNameContainsAndAndCityContainsAndCapacityBetween(name, city, from, to)))(), [name, city, from, to])

  const remove = async (id) => {
    await db.Venues.remove(() => null, id)
    setVenues(await db.Venues.findByNameContainsAndAndCityContainsAndCapacityBetween(name, city, from, to))
  }

  return (
    <div>
      <br></br>
      <h2>Search By:</h2>
      <dl className='row'>
        <dt className='col-sm-3'>Name</dt>
        <dd className='col-sm-9'><Form.Control placeholder='Name' type="text" size='sm' value={name} onChange={event => setName(event.target.value)} /></dd>
        <dt className='col-sm-3'>City</dt>
        <dd className='col-sm-9'><Form.Control placeholder='City' type="text" size='sm' value={city} onChange={event => setCity(event.target.value)} /></dd>
        <dt className='col-sm-3'>Capacity</dt>
        <dd className='col-sm-9'>
        <Form>
        <Form.Row>
          <Col>
            From:
            <Form.Control placeholder='From' type="number" size='sm' value={from} onChange={event => setFrom(1 * event.target.value)} />
          </Col>
          <Col>
            To:
            <Form.Control placeholder='To' type="number" size='sm' value={to} onChange={event => setTo(1 * event.target.value)} />
          </Col>
        </Form.Row>
      </Form>
        </dd>
      </dl>

      <h1>List of Venues</h1>
      { venues.filter(v => v.image !== "/default.png").length > 0 ?
        <Table striped hover variant="light" size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Image</th>
              <th>Capacity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              venues.filter(v => v.image !== "/default.png")
              .map(venue =>
                <Venue key={venue.id} venue={venue} remove={remove} />
              )
            }
          </tbody>
        </Table>
        : <Alert variant='warning'>No Venues available</Alert>
      }

      <br></br>

      <h4>Pending Venues</h4>
      <p class='text-muted'>Venues added by sellers can be viewed here.</p>
      { venues.filter(v => v.image === "/default.png").length > 0 ?
        <Table striped hover variant="light" size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Image</th>
              <th>Capacity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              venues.filter(v => v.image === "/default.png")
              .map(venue =>
                <Venue key={venue.id} venue={venue} remove={remove} />
              )
            }
          </tbody>
        </Table>
        : <Alert variant='warning'>No Venues available</Alert>
      }

      <br></br>
      
      <Button variant='success' as={Link} to={`/createvenue`}>Create a Venue</Button>
    </div>
  )
}