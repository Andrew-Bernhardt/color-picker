import React from 'react'
import { Link } from 'react-router-dom'
import "./App.css"

export default function 
() {
  return (
    <div className='nav'>
      <h3><Link to="/ordered">Ordered</Link></h3>
      <h1><Link to="/">Color Picker</Link></h1>
      <h3><Link to="/random">Randomized</Link></h3>
    </div>
  )
}
