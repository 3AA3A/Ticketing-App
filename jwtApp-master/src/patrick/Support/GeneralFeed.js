import React, { useState, useEffect } from 'react'
import db from '../../db'


export default function GeneralFeed({ feed }) {

  const [user, setUser] = useState(null)
  useEffect(() => (async () => feed && setUser(await db.Users.findOne(feed.userid)))(), [feed])
   
  return (
      
    <tr>
    <td>{user && user.name}</td>
    <td>{feed.datemade.toDateString().split(" ").splice(1).join(" ")}</td>
    <td>{feed.title}</td>
    <td>{feed.feedback}</td>
    <td>{feed.reply}</td>
    <td>{feed.viewed}</td>

    
    </tr>
  )
}