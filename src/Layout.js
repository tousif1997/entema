import React, { useState } from 'react';
import Aside from './Aside';


import Navbar from './Components/Pages/Navbar';
import Routes from './Routes';
import './styles/App.scss';

function Layout() {
  
  const [collapsed, setCollapsed] = useState(false);
  // const [image, setImage] = useState(true);
  let image=true;
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (<>
    <Navbar 
    toggled={toggled}
    collapsed={collapsed}
   
   
    handleCollapsedChange={handleCollapsedChange}
   />

    <div className={`app ${toggled ? 'toggled' : ''}`}>
   
      <Aside
        image={image}
        collapsed={collapsed}
        
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
      />
    <Routes/>
   
  
    </div></>
  );
}

export default Layout;
