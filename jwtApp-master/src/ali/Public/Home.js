import React, { useEffect, useState } from 'react'
import db from '../../db'
import Event from '../../mary/Event'
import Perf from '../../mary/Perf'
import {CardDeck,Carousel,Spinner} from 'react-bootstrap'

export default function Home() {

  const [events, setEvents] = useState(null)
  const [performers, setPerformers] = useState(null)

  useEffect(() => (async () => setEvents(await db.Events.findAll()))(), [])
  useEffect(() => (async () => setPerformers(await db.Performer.findAll()))(), [])

  return (
    <>
    <Carousel>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src="/home2.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <img src="/logo512.png" width="200" height="200"/>
          <h1 className='display-4' style={{textAlign:"left"}}>Welcome To The Wu-Tang Clan</h1>
          <p className='lead' style={{textAlign:"left", color:"lightgray"}}>We at Wu-Tang Clan are in the buisness of selling premium and exclusive tickets to some of the hottests music festivals.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src="/home1.png"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h1 className='display-4' style={{textAlign:"left"}}>Who we are</h1>
          <p className='lead' style={{textAlign:"left", color:"lightgray"}}>The Wu-Tang Clan is the world’s largest ticket marketplace with tickets available for over 10 million live music events in more than 40 countries. We enable experience-seekers to buy and sell tickets whenever and wherever they are through our desktop and mobile experiences.</p>
          <p className='lead' style={{textAlign:"left", color:"lightgray"}}>The Wu-Tang Clan reinvented the ticket marketplace in 2000 and continues to lead it through innovation. </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src="/home3.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h1 className='display-4' style={{textAlign:"left"}}>The Wu-Tang Promise</h1>
          <p className='lead' style={{textAlign:"left", color:"lightgray"}}>Trusted by people worldwide, The Wu-Tang Clan lets you buy and sell tickets safely, easily and without all the hassel</p>
          <h1 className='display-4' style={{textAlign:"left"}}>The Wu-Tang Clan Motto</h1>
          <p className='lead' style={{textAlign:"left", color:"lightgray"}}>Happy Fans, Happy Artists</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    { events && performers ?
    <>
    <br></br>
    <h1 className='display-4'>Trending Events</h1>
    <CardDeck>
      {
        events.sort((a,b) => b.viewamount - a.viewamount).filter(e => e.startdate >= new Date()).slice(0,3).map(event => <Event key={event.id} event={event}/>)
      }
    </CardDeck>

    <br></br>
    <h1 className='display-4'>Trending Performers</h1>
    <CardDeck>
      {
        performers.sort((a,b) => b.viewamount - a.viewamount).slice(0,3).map(performer => <Perf key={performer.id} performer={performer}/>)
      }
    </CardDeck>
    </>
    :
    <p>
      <Spinner animation="border" variant="dark" /> &nbsp;
      Please wait...
    </p>
    }
    </>
  )
}