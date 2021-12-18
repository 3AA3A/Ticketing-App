import React, { useEffect, useState } from 'react'
import db from '../../../db'
import Performer from './Performer'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import {Button, Alert} from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Performers() {

  const [performers, setPerformers] = useState([])
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const types = ["Solo", "Band"]

  useEffect(() => (async () => setPerformers(await db.Performer.findByName(name)))(), [name])

  const remove = async id => await db.Performer.remove(setPerformers, id)

  return (
    <>
      <br></br>
      <h2>Search By:</h2>
      <dl className='row'>
          <dt className='col-sm-3'>Name</dt>
          <dd className='col-sm-9'><Form.Control placeholder='Name' type="text" size='sm' value={name} onChange={event => setName(event.target.value)}/></dd>
          <dt className='col-sm-3'>Type</dt>
          <dd className='col-sm-9'>
            <Form.Check type="radio" key="" label="All" value="" name="type" onChange={event => setType(event.target.value)} inline checked={type === ""} />
            {
                types.map(item =>
                <Form.Check type="radio" key={item} label={item} value={item} name="type" onChange={event => setType(event.target.value)} inline />
                )
            }
          </dd>
      </dl>

      <h1>List of Performers</h1> 
      { performers.filter(p => p.image !== "default.png").length > 0 ? 
      <Table striped hover variant='light' size='sm'>
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Image</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
          {
            type === "" ?
            performers.filter(p => p.image !== '/default.png').map(performer => <tr><Performer key={performer.id} performer={performer} remove={remove}/></tr>)
            : type === "Solo" ? 
            performers.filter(p => p.type === "Solo" && p.image !== '/default.png').map(performer => <tr><Performer key={performer.id} performer={performer} remove={remove}/></tr>)
            : performers.filter(p => p.type === "Band" && p.image !== '/default.png').map(performer => <tr><Performer key={performer.id} performer={performer} remove={remove}/></tr>)
          }
          </tbody>
      </Table> : <Alert variant='warning'>No performers available</Alert>
      }

      <br></br>

      <h4>Pending Performers</h4>
      <p class='text-muted'>Performers added by sellers can be viewed here.</p>
      { performers.filter(p => p.image === "/default.png").length > 0 ?
      <Table striped hover variant='light' size='sm'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Image</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        {
          type === "" ?
          performers.filter(p => p.image === '/default.png').map(performer => <tr><Performer key={performer.id} performer={performer} remove={remove}/></tr>)
          : type === "Solo" ? 
          performers.filter(p => p.type === "Solo" && p.image === '/default.png').map(performer => <tr><Performer key={performer.id} performer={performer} remove={remove}/></tr>)
          : performers.filter(p => p.type === "Band" && p.image === '/default.png').map(performer => <tr><Performer key={performer.id} performer={performer} remove={remove}/></tr>)
        }
        </tbody>
      </Table> : <Alert variant='warning'>No pending performers yet.</Alert>
      }

      <br></br>

      <Button variant='success' as={Link} to={`/addperformer`}>Add a Performer</Button>
    </>
  )
}