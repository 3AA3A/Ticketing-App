import React, { useEffect, useState } from 'react'
import db from '../../db'
import Form from 'react-bootstrap/Form';
import {
  Link,
  useHistory
} from "react-router-dom";
import Button from 'react-bootstrap/Button';


export default function CreateGenre() {
  const history = useHistory()

  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")

  const create = async () => {
    await db.Genres.create(() => null, { name, desc })
    history.push('/genres')
  }

  const [validCreate, setValidCreate] = useState(false)
  useEffect(() => (async () => setValidCreate(
    name !== "" &&
    desc !== ""
  ))(), [name, desc])

  return (
    <>
      <br></br>
      <h1>Add a New Genre</h1>
      <dl className='row'>
        <dt className='col-sm-3'>Name</dt>
        <dd className='col-sm-9'><Form.Control size='sm' type='text' placeholder='Name' value={name} onChange={event => setName(event.target.value)} /></dd>
        <dt className='col-sm-3'>Desc</dt>
        <dd className='col-sm-9'><Form.Control size='sm' as="textarea" rows={3} placeholder='Description' value={desc} onChange={event => setDesc(event.target.value)} /></dd>
      </dl>
      <Button size="sm" variant="success" onClick={create} disabled={!validCreate}>Create</Button> &nbsp;
      <Button size="sm" variant="danger" as={Link} to={`/genres`}>Cancel</Button>
    </>
  )
}