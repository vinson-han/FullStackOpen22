import '../services/index.css'

const Notification = ({ message }) => {

  let styleName = ''

  try {
    if (message.messageStatus === 'error') {
      styleName = 'error'
    } else if (message.messageStatus === 'success') {
      styleName = 'success'
    }
  } catch (expection) { console.log(expection) }

  return (
    <div className={styleName}>
      {(message) && message.message}
    </div>
  )
}



export default Notification