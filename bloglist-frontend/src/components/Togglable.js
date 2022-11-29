import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)


  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }


  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (

    <div>
      <div style={hideWhenVisible}>
        {props.title}
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {props.children}<button onClick={toggleVisibility}>{props.buttonBottomLabel}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Toggable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonBottomLabel: PropTypes.string.isRequired
}

export default Togglable