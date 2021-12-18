import React, {useContext, useEffect, useState } from 'react'
import db from '../../db'
import {CardDeck, Spinner} from 'react-bootstrap';
import UnlikePerf from './UnlikePerformers';
import UserContext from '../../UserContext'
export default function FavPerformer() {

  const [favoriteperformers, setFavoritePerformers] = useState(null)

  useEffect(() => (async () => setFavoritePerformers(await db.Favoriteperformer.findAll()))(), [])
  const { user } = useContext(UserContext)
  const userxid = user && user.id
  // const [user2, setUser2] = useState(null)
  // useEffect(() => (async () => user && setUser2(await db.Users.findOne(user.id)))(), [user])
  // console.log(user2)

  const remove = async id =>
        await db.Favoriteperformer.remove(setFavoritePerformers, id)

  return (
    
    <>
    <br></br>
      
      <h1 className='display-4'>Your Favorite Performers</h1>
      { favoriteperformers ?
      <CardDeck>
          {
            favoriteperformers.filter(favpf => favpf.userid === userxid).map(favpf => <UnlikePerf key={favpf.id} favpf={favpf} remove={remove} user={user}/>)
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