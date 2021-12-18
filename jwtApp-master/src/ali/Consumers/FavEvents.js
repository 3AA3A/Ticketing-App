import React, {useContext, useEffect, useState } from 'react'
import db from '../../db'
import {CardDeck, Spinner} from 'react-bootstrap';
import FavEnt from './UnlikeEvents';

import UserContext from '../../UserContext'

export default function Favorites() {

  const [favoriteevents, setFavoriteEvents] = useState(null)
  

  useEffect(() => (async () => setFavoriteEvents(await db.Favoriteevent.findAll()))(), [])

  

  const { user } = useContext(UserContext)
  const userxid = user && user.id
  // const [user2, setUser2] = useState(null)
  // useEffect(() => (async () => user && setUser2(await db.Users.findOne(user.id)))(), [user])
// console.log(userxid)
  const remove = async id =>
        await db.Favoriteevent.remove(setFavoriteEvents, id)

  return (
   
    // user &&
    <>
      <br></br>

      <h1 className='display-4'>Your Favorite Events</h1>
      { favoriteevents ?
      <CardDeck>
        {
          favoriteevents.filter(favet => favet.userid === userxid).map(favet => 
            <FavEnt key={favet.id} favet={favet} remove={remove} user={user}/>)
        }
      </CardDeck>
      :
      <p>
        <Spinner animation="border" variant="dark" /> &nbsp;
        Please wait...
      </p>
      }
    </>
  )
}