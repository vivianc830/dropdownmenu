import React from 'react'
import './App.css'
import Dropdown from './components/Dropdown/Dropdown'

const items = [
  {"id" : "1", "name": "monday"},
  {"id" : "2", "name": "tuesday"},
  {"id" : "3", "name": "wednesday"},
  {"id" : "4", "name": "thursday"},
  {"id" : "5", "name": "friday"},
  {"id" : "6", "name": "saturday"},
  {"id" : "7", "name": "sunday"},
]

const App = () => {
  return (
    <div className="container">
      <Dropdown 
        title={'single option: select an option'} 
        items={items} 
        multiSelect={false} 
      />
      <Dropdown 
        title={'multi option: select your options'} 
        items={items} 
        multiSelect={true}
      />
    </div>
  )
}

export default App