import React from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./features/user/Login"
import Signup from "./features/user/Signup"
import Dashboard from "./features/user/Dashboard"
import { PrivateRoute } from "./helpers/PrivateRoute"
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact element={<Login />} path="/login" />
          <Route exact element={<Signup />} path="/signup" />
          <Route path="/"
           exact element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }/>
        </Routes>
      </Router>
    </div>
  )
}
export default App