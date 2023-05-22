import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
// import MainContent from './components/other/MainContent';
import Footer from './components/fragments/Footer';
import ProjectList from './components/project/ProjectList';
// import TaskList from './components/task/TaskList';
// import UserList from './components/user/UserList';
// import CommentList from './components/comment/CommentList';
// import CategoryList from './components/category/CategoryList';

function App() {
    return (
        <Router>
            <Header />
            <Navigation />
            <Routes>
                {/*<Route path="/" element={<MainContent />} />*/}
                <Route path="/projects" element={<ProjectList />} />
                {/*<Route path="/tasks" element={<TaskList />} />*/}
                {/*<Route path="/users" element={<UserList />} />*/}
                {/*<Route path="/comments" element={<CommentList />} />*/}
                {/*<Route path="/categories" element={<CategoryList />} />*/}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
