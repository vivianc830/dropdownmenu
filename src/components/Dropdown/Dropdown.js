import React, { useRef, useState } from 'react'
import './Dropdown.css'
import classnames from 'classnames'
import CheckmarkIcon from '../../icons/CheckMark'

const SELECT_OPTIONS = {
  ALL: 'all', 
  NONE: 'none', 
  NEITHER: false
}

const Dropdown = ({ title, items, multiSelect}) => {
  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState([])
  const toggle = () => setOpen(!open)
  const menuRef = useRef(null)

  const closeDropDown = (e) => {
    if (open && !menuRef.current?.contains(e.target)) {
      setOpen(false)
    }
  }

  document.addEventListener('mousedown', closeDropDown)

  const handleOnClick = (item, selectOption) => {
    if (selectOption === SELECT_OPTIONS.ALL) {
      setSelection([...items])
    } else if (selectOption === SELECT_OPTIONS.NONE) {
      setSelection([])
    } else {
      if (!selection.some(current => current.id === item.id)) {
        if (!multiSelect) {
          setSelection([item])
          setOpen(false)
        } else if (multiSelect) {
          setSelection([...selection, item])
        }
      } else {
        let selectionAfterRemoval = selection
        selectionAfterRemoval = selectionAfterRemoval.filter(
          current => current.id !== item.id
        )
        setSelection([...selectionAfterRemoval])
      }
    } 
  }

  const isItemInSelection = (item) => {
    if (selection.some(current => current.id === item.id)) {
      return true
    }
    return false
  }

  const showSelection = (selection) => {
    return (
      selection.map((item) => item.name).join(', ')
    )
  }

  return (
    <div className="wrapper">
      <div
        className="header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        {selection.length === 0 ? title : showSelection(selection)}
      </div>
      {open && (
        <ul className="list" ref={menuRef}>
          {multiSelect && 
            (<button className={classnames("list-item", "select-options")}
            onClick={() => handleOnClick(null, SELECT_OPTIONS.ALL)}>
              Select All
            </button>)}
          <button className={classnames("list-item", "select-options")}
          onClick={() => handleOnClick(null, SELECT_OPTIONS.NONE)}>
            Select None
          </button>
        {items.map((item) => (
            <li key={item.id}>
                <button className={classnames("list-item", {
                  'selected': isItemInSelection(item)
                  })}
                onClick={() => handleOnClick(item, SELECT_OPTIONS.NEITHER)}>
                  {item.name}
                  <div className={classnames('checkmark', {
                    'showCheckmark': isItemInSelection(item)
                  })}>
                  <CheckmarkIcon />
                </div>
                </button>
            </li>
          ))}
          </ul>
          )}
  </div>
  )
}

export default Dropdown