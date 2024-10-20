import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-primary-black pt-8">
            <div className="container m-auto">
                {children}
            </div>
        </div>
    );
};

export default Layout;
