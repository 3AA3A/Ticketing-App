import React, {useContext, useEffect, useState } from 'react'
import db from '../../db'
import Performer from './Perf'
import { Card, CardDeck, Form, Carousel, Spinner, Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import UserContext from '../../UserContext'
import {
  useHistory
} from "react-router-dom";
export default function Performers() {

  const [performers, setPerformers] = useState(null)
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const types = ["Solo", "Band"]
  
  useEffect(() => (async () => setPerformers(await db.Performer.findByName(name)))(), [name])

  const { user } = useContext(UserContext)
  const userxid = user && user.id
  const [favoriteperformers, setFavoritePerformers] = useState([])
  const createF = async id => {
    await db.Favoriteperformer.create(setFavoritePerformers, {userid:userxid, performerid:id }
    )
    handleShow()
  }

  const history = useHistory()
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    history.go(0)
  }
  const handleShow = () => setShow(true)

  return (
    <>
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            style={{width:"100%", height:"300px", objectFit:"cover"}}
            src="/perf1.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h1 className='display-4' style={{textAlign:"left"}}>Performers</h1>
            <p className='lead' style={{textAlign:"left", color:"lightgray"}}>Search for your favorite artists and bands in this page.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            style={{width:"100%", height:"300px", objectFit:"cover"}}
            src="/perf2.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            style={{width:"100%", height:"300px", objectFit:"cover"}}
            src="/perf3.png"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      
      <br></br>

      <div className='row'>
      <div className='col-md-3'>
      <Card>
        <Card.Header>Filter Performers</Card.Header>
        <Card.Body>
          <Form>
              <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='text' size='sm' value={name} onChange={event => setName(event.target.value)}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Check type="radio" key="" label="All" value="" name="type" onChange={event => setType(event.target.value)} checked={type === ""} />
                {
                  types.map(item =>
                    <Form.Check type="radio" key={item} label={item} value={item} name="type" onChange={event => setType(event.target.value)}/>)
                }
              </Form.Group>
        </Form>
        </Card.Body>
      </Card>
      </div>
      
      <div className='col-md-9'>
      { performers ?
      <CardDeck>
          { type === "Solo" ?
            performers.filter(p => p.image !== '/default.png' && p.type === "Solo").map(performer => <Performer key={performer.id} performer={performer} createF={createF}/>)
            : type === "Band" ?
            performers.filter(p => p.image !== '/default.png' && p.type === "Band").map(performer => <Performer key={performer.id} performer={performer} createF={createF}/>)
          : performers.filter(p => p.image !== '/default.png').map(performer => <Performer key={performer.id} performer={performer} createF={createF} />)
          }
      </CardDeck>
      :
      <p>
        <Spinner animation="border" variant="dark" /> &nbsp;
        Please wait...
      </p>      
      }
      </div>
      </div>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Added to favorites!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            <FontAwesomeIcon icon={faCheck}/> Ok
          </Button>
        </Modal.Footer>
      </Modal>
      
      <br></br>

      
    </>
  )
}