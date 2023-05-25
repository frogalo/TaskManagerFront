import React from 'react';

function Header() {
    const handleSignOut = () => {
        // Handle the sign out logic here
    };

    return (
        <header>
            <h1>
                <a href="/projects" className="header">
                    Task Manager
                </a>
            </h1>
            <div className="header-right">
                <div className="welcome-text">Welcome Name Surname</div>
                <button className="sign-out-button" onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>
        </header>
    );
}

export default Header;
