import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { SignUpPage, LoginPage, Dashboard, EmailVerificationPage, ForgotPasswordPage} from './pages';
import ProtectedRoute from './components/protected';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
           {/* Public route */}
          <Route path="/" element={<h1>GloomyNotes</h1>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='forgot-password' element={<ForgotPasswordPage/>} />
          <Route path="/verification" element={<EmailVerificationPage />} />

          {/* Protected route */}
          <Route
            path="/protected/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
