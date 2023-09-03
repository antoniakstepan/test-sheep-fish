import React from 'react';
// Components 
import Header from './components/Header';
import Routes from './components/Routes'
function App() {
  return (
    <div className="mx-auto max-w-[1440px]">
      <Header />
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <Routes />
      </div>
    </div>
  );
}

export default App;
