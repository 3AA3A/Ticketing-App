import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../UserContext'
import db from '../../db'
import CardGroup from 'react-bootstrap/CardGroup';
import { Card, ListGroup, ListGroupItem, Alert } from 'react-bootstrap'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";

export default function Sellers() {

  const { user } = useContext(UserContext)
  const userid = user && user.id
  const [events, setEvents] = useState([])

  useEffect(() => (async () => setEvents(await db.Events.findByUserid(userid)))(), [])

  return (
    user &&
    <>
      <Jumbotron>
        <h1>Welcome, {user.name}!</h1>
        <p>
          Keep track of all of your events. See the <strong>Events page</strong> to view, edit, and delete your events.
        </p>
        <p>
          <Button variant="primary" as={Link} to={'/events'}>View all your Events</Button>
        </p>
      </Jumbotron>

      {events.length === 0 ? <Alert variant='warning'>You have no registered events yet.</Alert> : 
      <CardGroup>
        <Card>
          <Card.Header>Ongoing Events</Card.Header>
          <Card.Body>
            <ListGroup>
              {
                events.filter(e => new Date() >= e.startdate && new Date() <= e.enddate).length === 0 ? <p className='text-muted'>You don't have ongoing events!</p> :
                events.filter(e => new Date() >= e.startdate && new Date() <= e.enddate).map(
                  e => <ListGroupItem>{e.name}</ListGroupItem>
                )
              }
            </ListGroup>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Upcoming Events</Card.Header>
          <Card.Body>
            <ListGroup>
              {
                events.filter(e => e.startdate >= new Date()).length === 0 ? <p className='text-muted'>You don't have upcoming events!</p> :
                events.filter(e => e.startdate >= new Date()).map(
                  e => <ListGroupItem>{e.name}</ListGroupItem>
                )
              }
            </ListGroup>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>Finished Events</Card.Header>
          <Card.Body>
            <ListGroup>
              {
                events.filter(e => e.enddate <= new Date()).length === 0 ? <p className='text-muted'>You don't have finished events!</p> :
                events.filter(e => e.enddate <= new Date()).map(
                  e => <ListGroupItem>{e.name}</ListGroupItem>
                )
              }
            </ListGroup>
          </Card.Body>
        </Card>
      </CardGroup>
    }
    </>
  )
}