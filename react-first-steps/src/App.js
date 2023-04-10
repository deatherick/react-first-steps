import React from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./features/user/Login"
import Signup from "./features/user/Signup"
import Paperbase from "./theme/Paperbase"
import { PrivateRoute } from "./helpers/PrivateRoute"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </div>
  )
}
export default App