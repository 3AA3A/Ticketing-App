import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import db from '../../db'

export default function PerformerReview({ review, remove }) {

  const [user, setUser] = useState(null)
  useEffect(() => (async () => review && setUser(await db.Users.findOne(review.userid)))(), [review])

  const [performer, setPerformer] = useState(null)
  useEffect(() => (async () => review && setPerformer(await db.Performer.findOne(review.performerid)))(), [review])
    
  return (
    <tr>
        <td>{review.review}</td>
        <td>{review.revdate.toDateString().split(" ").splice(1).join(" ")}</td>
        <td>{performer && performer.name}</td>
        <td>{user && user.name}</td>
        <td>
            <Button size="sm" variant='danger' onClick={() => remove(review.id)}>X</Button>
        </td>
    </tr>
  )
}