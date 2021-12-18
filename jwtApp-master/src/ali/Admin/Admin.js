import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../UserContext'
import db from '../../db'
import Jumbotron from 'react-bootstrap/Jumbotron'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";


export default function Sellers() {

const { user } = useContext(UserContext)
  
  const [users, setUsers] = useState([])
  useEffect(() => (async () => setUsers(await db.Users.findAll()))(), [])

  const wrapStyle = {
    minWidth: "25%",
    flexGrow: 0,
    marginBottom:"3%"
  };

  return (
    user &&
    <>
    <Jumbotron>
        <h1>Welcome, {user.name}!</h1>
        <p>
          <Button variant="primary" as={Link} to={'/users'}>Manage all Users</Button>
        </p>
      </Jumbotron>

      <h2>User Statistics</h2>
      <CardGroup>
        <Card style={wrapStyle}>
          <Card.Header>Customers</Card.Header>
          <Card.Body>
            <Card.Text>{users.filter((user) => user.role === "Customer").length}</Card.Text>
          </Card.Body>
        </Card>
        <Card style={wrapStyle}>
          <Card.Header>Sellers</Card.Header>
          <Card.Body>
            <Card.Text>{users.filter((user) => user.role === "Seller").length}</Card.Text>
          </Card.Body>
        </Card>
        <Card style={wrapStyle}>
          <Card.Header>Marketers</Card.Header>
          <Card.Body>
            <Card.Text>{users.filter((user) => user.role === "Marketer").length}</Card.Text>
          </Card.Body>
        </Card>
        <Card style={wrapStyle}>
          <Card.Header>Support</Card.Header>
          <Card.Body>
            <Card.Text>{users.filter((user) => user.role === "Support").length}</Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  )
}