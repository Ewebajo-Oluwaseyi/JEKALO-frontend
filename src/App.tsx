import React from 'react';
import "./style/main.css"
import Container from './components/Container';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='page-container'>
       <Toaster
        position="top-center"
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#ffffff',
            color: '#3A4374',
          },
          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4661E6',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#D73737',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <Container/>
    </div>
  );
}

export default App;
