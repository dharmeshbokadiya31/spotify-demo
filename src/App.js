import React, { useEffect, useState } from "react"
import Dashboard from "./dashboard"
import Login from "./login"

function App() {
  const [token, setToken] = useState("")

  return (
    <div className="App">
      {!token ?
        <Login setToken={setToken} />
        : <Dashboard setToken={setToken} />
      }
    </div>
  );
}

export default App;
