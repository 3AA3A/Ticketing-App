import React, { useEffect, useState } from 'react'
import db from '../../db'
import Genre from './Genre'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { Link } from "react-router-dom";

export default function Genres() {

  const [genres, setGenres] = useState([])

  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")

  useEffect(() => (async () => setGenres(await db.Genres.findByNameContainsAndDescContains(name,desc)))(), [name, desc])

  const remove = async (id) => {
    await db.Genres.remove(() => null, id)
    setGenres(await db.Genres.findByNameContainsAndDescContains(name,desc))
  }

  return (
    <div>
      <br></br>
      <h2>Search By:</h2>
      <dl className='row'>
        <dt className='col-sm-3'>Name</dt>
        <dd className='col-sm-9'><Form.Control placeholder='Name' type="text" size='sm' value={name} onChange={event => setName(event.target.value)} /></dd>
        <dt className='col-sm-3'>Description</dt>
        <dd className='col-sm-9'><Form.Control placeholder='Description' as="textarea" rows={3} size='sm' value={desc} onChange={event => setDesc(event.target.value)} /></dd>
      </dl>

      <h1>List of Genres</h1>
      <Button size="sm" variant='success' as={Link} to={`/creategenre`}>Create a Genre</Button>
      { genres.length > 0 ?
        <Table striped hover variant="light" size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              genres
                .map(genre =>
                  <Genre key={genre.id} genre={genre} remove={remove} />
                )
            }
          </tbody>
        </Table>
        : <Alert variant='warning'>There are no genres yet.</Alert>
      }
    </div>
  )
}