import React, { useEffect, useState } from 'react'
import db from '../../db'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'
import { Link, useHistory, useParams } from "react-router-dom";

export default function EditGenre() {

  const { id: stringid } = useParams();
  const id = stringid * 1

  const [genre, setGenre] = useState(null)
  useEffect(() => (async () => setGenre(await db.Genres.findOne(id)))(), [id])

  const [name, setName] = useState("")
  useEffect(() => genre && setName(genre.name), [genre])

  const [desc, setDesc] = useState("")
  useEffect(() => genre && setDesc(genre.desc), [genre])

  const history = useHistory()

  const update = async () => {
    await db.Genres.update(() => null, { id, name, desc })
    history.push("/genres")
  }

  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    name !== "" &&
    desc !== ""
  ))(), [name, desc])

  return (
    genre ?
    <div>
      <h1>Edit Genre</h1>
      <dl className="row">
        <dt className='col-sm-3'>Name</dt>
        <dd className='col-sm-9'><Form.Control size='sm' type='text' placeholder='Name' value={name} onChange={event => setName(event.target.value)} /></dd>
        <dt className='col-sm-3'>Desc</dt>
        <dd className='col-sm-9'><Form.Control size='sm' as="textarea" rows={3} placeholder='Description' value={desc} onChange={event => setDesc(event.target.value)} /></dd>
      </dl>
      <Button size="sm" variant="light" onClick={update} disabled={!validUpdate}>Update</Button>
      <Button size="sm" variant="link" as={Link} to={'/genres'}>Back to Genres</Button>
    </div >
    :
    <p>
    <Spinner animation="border" variant="dark" /> &nbsp;
    Please wait...
    </p>
  );
}