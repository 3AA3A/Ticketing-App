import React, { useContext, useEffect, useState } from 'react';
import db from '../db'
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import UserContext from '../UserContext'

export default function Profile() {

  const { user } = useContext(UserContext)

  const [user2, setUser2] = useState(null)
  useEffect(() => (async () => user && setUser2(await db.Users.findOne(user.id)))(), [user])

  return (
    user &&
    user2 &&
    <>
    <br></br>
    <div className='row'>
      <div className='col-md-3'>
      <Card>
        <Card.Img variant='top' src={user2.image}/>
      </Card>
      </div>
      <div className='col-md-9'>
      <Card>
          <Card.Body>
            <h1 className='display-4'>{user2.name}</h1>
            <p className='lead'>{user2.id} | {user2.role}</p>
            <hr></hr>
            <dl className="row">
              <dt className="col-sm-3">Phone</dt>
              <dd className="col-sm-9">{user2.phone}</dd>
              <dt className="col-sm-3">Address</dt>
              <dd className="col-sm-9">{user2.address}</dd>
            </dl>
            <Button style={{float:'right'}} variant="link" as={Link} to={`/updateprofile`}>Edit Profile</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
      
      
      
     
      
    </>
  )
}