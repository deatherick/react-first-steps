import React from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./features/user/Login"
import Signup from "./features/user/Signup"
import Paperbase from "./theme/Paperbase"
import { PrivateRoute } from "./helpers/PrivateRoute"
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact element={<Login />} path="/login" />
          <Route exact element={<Signup />} path="/signup" />
          <Route exact element={
            <PrivateRoute>
              <Paperbase />
            </PrivateRoute>
          } path="/" />
        </Routes>
      </Router>
    </div>
  )
}
export default App