import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../UserContext'
import db from '../../db'
import Event from '../../mary/user/Event'
import Event2 from '../../mary/user/Event2'
import Perf from '../../mary/user/Perf'
import Perf2 from '../../mary/user/Perf2'
import {CardDeck, Carousel, Spinner} from 'react-bootstrap'

export default function Customers() {

const { user } = useContext(UserContext)
  const [events, setEvents] = useState(null)
  const [performers, setPerformers] = useState(null)
  const [historyevents, setHistoryEvents] = useState(null)
  const [historyperformers, setHistoryPerformers] = useState(null)

  useEffect(() => (async () => setEvents(await db.Events.findAll()))(), [])
  useEffect(() => (async () => setPerformers(await db.Performer.findAll()))(), [])
  useEffect(() => (async () => setHistoryEvents(await db.Historyevent.findAll()))(), [])
  useEffect(() => (async () => setHistoryPerformers(await db.Historyperformer.findAll()))(), [])

  const historyevents2 = [];
  const map = new Map();
  if(historyevents) {
    for (const item of historyevents.sort((a,b) => b.id - a.id)) {
      if(!map.has(item.eventid)){
          map.set(item.eventid, true);    // set any value to Map
          historyevents2.unshift({
              id: item.id,
              userid:item.userid,
              eventid:item.eventid
          });
      }
  }
  }

  const historyperformers2 = [];
  const map2 = new Map();
  if(historyperformers) {
    for (const item of historyperformers.sort((a,b) => b.id - a.id)) {
      if(!map2.has(item.performerid)){
          map2.set(item.performerid, true);    // set any value to Map
          historyperformers2.unshift({
              id: item.id,
              userid:item.userid,
              performerid:item.performerid
          });
      }
  }
  }

  return (
    user &&
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
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/home1.png"
          alt="Second slide"
        />

        <Carousel.Caption interval={5000}>
          <h1 className='display-4' style={{textAlign:"left"}}>Who we are</h1>
          <p className='lead' style={{textAlign:"left", color:"lightgray"}}>The Wu-Tang Clan is the world’s largest ticket marketplace with tickets available for over 10 million live music events in more than 40 countries. We enable experience-seekers to buy and sell tickets whenever and wherever they are through our desktop and mobile experiences.</p>
          <p className='lead' style={{textAlign:"left", color:"lightgray"}}>The Wu-Tang Clan reinvented the ticket marketplace in 2000 and continues to lead it through innovation. </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/home3.png"
          alt="Third slide"
        />

        <Carousel.Caption interval={5000}>
          <h1 className='display-4' style={{textAlign:"left"}}>The Wu-Tang Promise</h1>
          <p className='lead' style={{textAlign:"left", color:"lightgray"}}>Trusted by people worldwide, The Wu-Tang Clan lets you buy and sell tickets safely, easily and without all the hassel</p>
          <h1 className='display-4' style={{textAlign:"left"}}>The Wu-Tang Clan Motto</h1>
          <p className='lead' style={{textAlign:"left", color:"lightgray"}}>Happy Fans, Happy Artists</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    <br></br>

      { events && performers && historyperformers && historyevents ?
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

        <div className='row'>
          <div className='col-md-6'>
            <br></br>
            <p className='lead'>Recently Viewed Events</p>
            <Carousel>
              {
                historyevents2.sort((a,b) => b.id - a.id).slice(0,5).map(event =>
                <Carousel.Item>
                    <Event2 key={event.id} hist={event}/>
                </Carousel.Item>  
                )
              }
            </Carousel>
          </div>
          <div className='col-md-6'>
          <br></br>
          <p className='lead'>Recently Viewed Performers</p>
          <Carousel>
            {
              historyperformers2.sort((a,b) => b.id - a.id).slice(0,5).map(performer =>
              <Carousel.Item>
                  <Perf2 key={performer.id} hist={performer}/>
              </Carousel.Item>  
              )
            }
          </Carousel>
          </div>
        </div>
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