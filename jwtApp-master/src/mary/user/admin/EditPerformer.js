import React, { useEffect, useState } from 'react'
import db from '../../../db'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory, useParams, Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'

export default function EditPerformer() {

  const history = useHistory()

  const { id: stringId } = useParams()
  const id = 1 * stringId 

  const [performer, setPerformer] = useState(null)
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [image, setImage] = useState("")
  const types = ["Solo", "Band"]

  useEffect(() => (async () => setPerformer(await db.Performer.findOne(id)))(), [id])
  useEffect(() => performer && setName(performer.name), [performer])
  useEffect(() => performer && setType(performer.type), [performer])
  useEffect(() => performer && setImage(performer.image), [performer])
  const viewamount = performer && performer.viewamount

  const handleImage = async event => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      const extension = file.name.split('.').pop()
      const perfName = name.split(" ")
      const newName = `Performer${perfName}.${extension}`
      const result = await db.uploadImage(file, newName)
      if (result.ok) {
        setImage(`/images/${newName}`)
      }
    }
  }

  const update = async () => {
    await db.Performer.update(() => null, { id, name, type, image, viewamount})
    history.push(`/performers`)
  }

  const [validUpdate, setValidUpdate] = useState(false)
  useEffect(() => (async () => setValidUpdate(
    name !== "" &&
    type !== "" &&
    image !== "" &&
    id > 0 &&
    await db.Performer.findOne(id) !== undefined 
  ))(), [id, name, type, image])

  return (
    performer ?
    <>
    <br></br>
    <div>
      <h1>Edit Performer</h1>
      <dl className="row">
        <dt className="col-sm-3">Name</dt>
        <dd className="col-sm-9"><Form.Control size="sm" type="text" value={name} onChange={event => setName(event.target.value)}/></dd>
        <dt className="col-sm-3">Type</dt>
        <dd className="col-sm-9">
            <Form.Control size='sm' value={type} as="select" onChange={event => setType(event.target.value)}>
                {
                types.map(item =>
                    <option key={item} value={item}>{item}</option>
                )
                }
            </Form.Control>
        </dd>
        <dt className="col-sm-3">Image</dt>
        <dd className="col-sm-9"><img alt="" src={`${image}?${new Date().getTime()}`} height="100" /><Form.File custom label="Choose new picture" onChange={handleImage} /></dd>
      </dl>
      <Button size="sm" variant="success" onClick={update} disabled={!validUpdate}>Update</Button> &nbsp;
      <Button size="sm" variant="danger" as={Link} to={`/performers`}>Undo Changes</Button>
    </div >
    </>
    :
    <p>
    <Spinner animation="border" variant="dark" /> &nbsp;
    Please wait...
    </p>
  );
}