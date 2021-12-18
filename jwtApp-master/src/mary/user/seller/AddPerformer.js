import React, {useContext, useEffect, useState } from 'react'
import db from '../../../db'
import Form from 'react-bootstrap/Form';
import {
  Link,
  useHistory
} from "react-router-dom";
import {Button, Card, InputGroup} from 'react-bootstrap';
import UserContext from '../../../UserContext'

export default function Sellers() {
    const history = useHistory()
    const [userx, setUserx] = useState(null);

    useEffect(
      () => (async () => setUserx(await db.Users.findAll()))(),
      []
    );
    //dropdown selections
    const types = ["Solo", "Band"]

    //input
    const [name, setName] = useState("")
    const [type, setType] = useState("")

    const { user } = useContext(UserContext)
  
  

    const create = async () => {
      await db.Performer.create(() => null, {name, type, image:"/default.png", viewamount:0})
      setName("")
      setType("")
      history.push('/events')
      handleEmail()
    }
  
    const [validCreate, setValidCreate] = useState(false)
    useEffect(() => (async () => setValidCreate(
      name !== "" &&
      type !== "" 
    ))(), [ name, type ])

    
    const handleEmail = async () => {
      await userx.filter(use=> use.role=="Admin").map(use => db.email(
        use.id,
        `Verify New Performer!!!`,
        `<img src="https://c1.wallpaperflare.com/preview/456/31/742/sing-musician-concert-music.jpg">
        <br>
        <h2>A New Performer was Added and Awaits Verification<h2>
        <p>${user && user.name} has added a new performer. The Performer Details are as follows:</p>

        <p> Performer's Name : ${name} </p>
        <p>Perfromer Type: ${type}</p>
        <p>Please respond and verify this Performer as soon as possible...</p>
        
        <a href="http://localhost:3000/login">
        <em>Click this Link to Verify new Performer</em>
        </a>
        `
      ))
    }

    return (
    <>
    <br></br>
      <Card>
          <Card.Header>Add a New Performer</Card.Header>
          <Card.Body>
          <dl className='row'>
            <dt className='col-sm-3'>Name</dt>
            <dd className='col-sm-9'><Form.Control size='sm' type='text' placeholder='Name' value={name} onChange={event => setName(event.target.value)}/></dd>
            <dt className='col-sm-3'>Type</dt>
            <dd className='col-sm-9'>
            <Form.Control size='sm' value={type} as="select" onChange = {event => setType(event.target.value)}>
                <option key={""} value={""}>Select Type</option>
                {
                types.map(item =>
                <option key={item} value={item}>{item}</option>)
                }
            </Form.Control>
            </dd>
          </dl>
          <Button size="sm" variant="success" onClick={create} disabled={!validCreate}>Create</Button> &nbsp;
          <Button size="sm" variant="danger" as={Link} to={`/events`}>Cancel</Button>
          <Form.Text className="text-muted"><strong>Note</strong>: your performer will not be shown in the dropdown list until an admin verifies them.</Form.Text>
          </Card.Body>
      </Card>
    </>
  )
}