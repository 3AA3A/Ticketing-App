import React, { useState, useEffect } from 'react'
import db from '../../db'


export default function Faqs({ fqs }) {

  const [user, setUser] = useState(null)
  useEffect(() => (async () => fqs && setUser(await db.Users.findOne(fqs.userid)))(), [fqs])
   
  return (
    <tr>
    <td>{user && user.name}</td>
    <td>{fqs.question}</td>
    <td>{fqs.answer}</td>
    </tr>
  )
}