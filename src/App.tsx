import React from 'react';
import Nav from "./Components/Navigation/Nav";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import WidgetContainer from "./Components/Widgets/WidgetContainer";
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav/>
      <UserDashboard/>
      <WidgetContainer/>
    </div>
  );
}

export default App;
