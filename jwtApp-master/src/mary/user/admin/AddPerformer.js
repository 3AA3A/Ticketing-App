import React, { useEffect, useState } from 'react'
import db from '../../../db'
import Form from 'react-bootstrap/Form';
import {
  Link,
  useHistory
} from "react-router-dom";
import Button from 'react-bootstrap/Button';


export default function Sellers() {
  const history = useHistory()

  //dropdown selections
  const types = ["Solo", "Band"]

  //input
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [image, setImage] = useState("/default.png")

  const create = async () => {
    await db.Performer.create(() => null, { name, type, image, viewamount: 0 })
    setName("")
    setType("")
    history.push('/performers')
  }

  const [validCreate, setValidCreate] = useState(false)
  useEffect(() => (async () => setValidCreate(
    name !== "" &&
    type !== ""
  ))(), [name, type])

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

  return (
    <>
      <br></br>
      <h1>Add a New Performer</h1>
      <dl className='row'>
        <dt className='col-sm-3'>Name</dt>
        <dd className='col-sm-9'><Form.Control size='sm' type='text' placeholder='Name' value={name} onChange={event => setName(event.target.value)} /></dd>
        <dt className='col-sm-3'>Type</dt>
        <dd className='col-sm-9'>
          <Form.Control size='sm' value={type} as="select" onChange={event => setType(event.target.value)}>
            <option key={""} value={""}>Select Type</option>
            {
              types.map(item =>
                <option key={item} value={item}>{item}</option>)
            }
          </Form.Control>
        </dd>
        <dt className="col-sm-3">Image</dt>
        <dd className="col-sm-9"><img alt="" src={`${image}?${new Date().getTime()}`} height="100" /><Form.File custom label="Choose new picture" onChange={handleImage} /></dd>
      </dl>
      <Button size="sm" variant="success" onClick={create} disabled={!validCreate}>Create</Button> &nbsp;
      <Button size="sm" variant="danger" as={Link} to={`/performers`}>Cancel</Button>
    </>
  )
}