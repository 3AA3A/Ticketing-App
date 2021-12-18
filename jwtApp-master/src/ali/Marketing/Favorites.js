import React, {useEffect, useState } from 'react'

import db from '../../db'
import Table from 'react-bootstrap/Table';
import FavEnt from './FavEnt';
import FavPerf from './FavPerf';

export default function Favorites() {

  const [favoriteevents, setFavoriteEvents] = useState([])
  const [favoriteperformers, setFavoritePerformers] = useState([])

  useEffect(() => (async () => setFavoriteEvents(await db.Favoriteevent.findAll()))(), [])

  useEffect(() => (async () => setFavoritePerformers(await db.Favoriteperformer.findAll()))(), [])


  return (
    
    <>
      <h1>Favorites Page</h1>
      <p>Take a Look at All the Latest Ticketing Purchases and Trends</p>
      
      <h4>Top Artists</h4>
      <Table striped hover variant="light" size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Image</th>
            <th>ViewAmount</th>
          </tr>
        </thead>
        <tbody>
         
          {
            favoriteperformers.map(favpf => <FavPerf key={favpf.id} favpf={favpf} />)
          }
        </tbody>
      </Table>

      <h4>Top Events</h4>
      <Table striped hover variant="light" size="sm">
        <thead>
          <tr>
          <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Genre</th>
            <th>Venue</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            favoriteevents.map(favet => <FavEnt key={favet.id} favet={favet} />)
          }
        </tbody>
      </Table>
    </>
  )
}