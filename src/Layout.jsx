import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Reqauth from './components/Reqauth';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed,setIsCollapsed]=useState(false);

  return (
    <Reqauth>
    <div className="bg-[#f9fafb] min-h-screen">
      {/* Sidebar always visible on desktop, overlay on mobile */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
      <div className={`flex flex-col min-h-screen ${isCollapsed?'md:ml-24':'md:ml-72'}  transition-all duration-300`}>
        <Header setIsSidebarOpen={setIsSidebarOpen} setIsCollapsed={setIsCollapsed} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    </Reqauth>
  );
};

export default Layout;
