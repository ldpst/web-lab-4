import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import './App.css'
import { AuthRouter } from "./utils/AuthContext.jsx";

function App() {
  return (
    <AuthRouter>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/"
            element={
              // <ProtectedRoute>
                <MainPage />
              // </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </AuthRouter>
  )
}

export default App
