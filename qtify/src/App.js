import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from './components/Section/Section';
import FAQ from './components/FAQ/FAQ';

function App() {
  const [genres, setGenres] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Fetch genres data
    const fetchGenres = async () => {
      try {
        const response = await fetch('https://qtify-backend-labs.crio.do/genres');
        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          setGenres(data.data); // Correctly set genres
        } else {
          console.error('Genres data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      {/* Top Albums Section */}
      <Section 
        title="Top Albums" 
        apiEndpoint="https://qtify-backend-labs.crio.do/albums/top" 
      />
      {/* New Albums Section */}
      <Section 
        title="New Albums" 
        apiEndpoint="https://qtify-backend-labs.crio.do/albums/new" 
      />
      {/* Songs Section */}
      <Section 
        title="Songs" 
        apiEndpoint="https://qtify-backend-labs.crio.do/songs" 
        genres={genres} // Pass genres to the Section component
      />
      <FAQ />
    </div>
  );
}

export default App;
