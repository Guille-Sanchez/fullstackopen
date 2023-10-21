import { useEffect } from "react"
import '../styles/notifications.css'

export const Notification = ({ message, setMessage }) => {
  
  useEffect(() => {
    let subscribed = true

    if (subscribed) { 
      setTimeout(() => {
        setMessage((prev) => {return {...prev, message: null}})
      }, 5000)
    }

    return () => {subscribed = false}
  }, [message.message]) // eslint-disable-line react-hooks/exhaustive-deps

  if (message.message === null) {
    return null
  }

  return (
    <div className={`message ${message.state === 'success' ? 'success' : 'error'}`}>
      <p>{message.message}</p>
    </div>
  )
}