import { useState, useEffect } from 'react'
import { Api } from "./api"
import { User } from "./models/user"

function App() {
  const [users, setUsers] = useState<Array<User> | null>(null)
  const api = new Api()

  const fetchData = async () => {
    try {
      const result = await api.getUserData()
      if(result.error === true) throw new Error("Error fetching user data")

      setUsers(result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="App">
      {Array.isArray(users) && users.length > 0 && users.length}
    </div>
  )
}

export default App
