import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import Footer from './components/fragments/Footer';
import ProjectList from './components/project/ProjectList';
import ProjectDetails from './components/project/ProjectDetails';
import LoginForm from './components/LoginForm'
import ProjectForm from './components//project/ProjectForm'
import TaskForm from "./components/task/TaskForm";

function App() {
    return (
        <Router>
            <Header/>
            <Navigation/>
            <Routes>
                <Route path="/projects" element={<ProjectList/>}/>
                <Route path="/projects/:projectId" element={<ProjectDetails/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/projects/add" element={<ProjectForm/>}/>
                <Route path="/tasks/add" element={<TaskForm/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
