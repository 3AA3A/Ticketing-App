import React, { useState, useEffect } from 'react';
import db from '../../db'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup'
import Card from 'react-bootstrap/Card'

export default function Authenticate({ type, set }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const history = useHistory()

    const cardStyle = {
        width: "50%",
        marginTop: "3%"
    }

    const handleAuthenticate = async () => {
        const response = await fetch(
            `${type.toLowerCase()}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        )
        let jwtUser = null
        if (response.ok) {
            jwtUser = await response.json()
            if (jwtUser) {
                set(jwtUser)
                history.push("/")
            }
        } else {
            console.log('response not ok', response)
        }
        
    }

    const handleAuthenticate2 = async () => {
        const response = await fetch(
            `${type.toLowerCase()}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        )
        let jwtUser = null
        
        if (response.ok) {
            
            jwtUser = await response.json()
       
            if (jwtUser) {
            
                set(jwtUser)
               
                   
                history.push("/")
                handleEmail()
            }
        } else {
            return undefined
        }
    }

  const handleEmail = async ()=>{
    await db.email(
      username,
      `Welcome!!!`,
      `<img src="http://cise-egypt.com/wp-content/uploads/2019/09/WELCOME-ST-IVES.jpg">
      <br>
      <h2>Congratulations on your new free Wu-Tang account. To get started, follow the below instructions.</h2>
      <p>Enjoy Your New Account on the WuTang Clan Site</p>
      <p>Dear Customer,</p>

      <p>A New Wu-Tang Account "${username}" was created using this Email Address.</p>
      <p> If it wasn’t you who registered, notify us and we will remove this account.</p>
      <p>You Must first Verify this Account now to keep your account secure and automatically sign all your devices to your account. </p>
      <p>The sooner you verify your account the sooner you can enjoy our services ...</p>
      
      <a href="http://localhost:3000/login">
      <em>To Verify your acount click here!!!</em>
      </a>
      `
    )}
    

    const [validAuthenticate, setValidAuthenticate] = useState(false)
    useEffect(() => setValidAuthenticate(
        username !== "" &&
        password !== ""
    ), [username, password])

    const [validAuthenticate2, setValidAuthenticate2] = useState(false)
    useEffect(() => setValidAuthenticate2(
        username !== "" &&
        password !== "" &&
        confirmPassword !== "" &&
        password === confirmPassword
    ), [username, password, confirmPassword])

    return (
        <>
            <Card style={cardStyle}>
            <Card.Header>{type}</Card.Header>
            <Card.Body>
                <InputGroup size='sm' className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control size="sm" type="text" placeholder="example@example.com" onChange={event => setUsername(event.target.value)} value={username} />
                </InputGroup>
                <InputGroup size='sm' className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control size="sm" type="password" onChange={event => setPassword(event.target.value)} value={password} />
                </InputGroup>
                {
                    type === "Register" ?
                        <InputGroup size='sm' className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Confirm Password</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control size="sm" type="password" onChange={event => setConfirmPassword(event.target.value)} value={confirmPassword} />
                        </InputGroup>
                        : null
                }
                {
                    type === "Register" ?
                    <Button size="sm" variant="success" onClick={handleAuthenticate2} disabled={!validAuthenticate2}>{type}</Button>
                    : <Button size="sm" variant="success" onClick={handleAuthenticate} disabled={!validAuthenticate}>{type}</Button>
                }
            </Card.Body>
            
            
            </Card>
        </>
    )

}