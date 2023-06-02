import React from 'react';
import {Link} from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/projects">My Projects</Link>
                    </li>
                    <li>
                        <Link to="/tasks">My Tasks</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navigation;
