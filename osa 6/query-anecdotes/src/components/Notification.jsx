import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {

  const [notification, dispatch] = useContext(NotificationContext)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  console.log(`note: ${notification}`);

  if(notification==''){
    return null
  }

  setTimeout(() => {
    dispatch({type:"CLEAR"})
  }, 5000)

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
