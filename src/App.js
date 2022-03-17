import React, { useEffect } from 'react';
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import TodoProgress from './components/TodoProgress'
import API from './config/API'

function App() {
  useEffect(() => {
    API.get('todos').then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error('Error: ', error);
    });

  }, [])
  
  return (
    <div className="container">
      <TodoProgress/>
      <AppHeader/>
      <AppContent/>
    </div>
  );
}

export default App;