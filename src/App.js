import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import Footer from './components/fragments/Footer';
import ProjectList from './components/project/ProjectList';
import ProjectDetails from './components/project/ProjectDetails';
import LoginForm from './components/LoginForm'

function App() {
    return (
        <Router>
            <Header />
            <Navigation />
            <Routes>
                <Route path="/projects" element={<ProjectList />} />
                <Route path="/projects/:projectId" element={<ProjectDetails />} />
                <Route path="/login" element={<LoginForm />} />

            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
