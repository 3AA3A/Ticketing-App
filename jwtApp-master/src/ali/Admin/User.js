import React, { useEffect, useState } from 'react'
import db from '../../db'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


function User({ user }) {



  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.phone}</td>
      <td>{user.address}</td>
     
    </tr>
  )
}

export default User;
