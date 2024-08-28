import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from './components/Section/Section'

function App() {
  return (
    <div className="App">
      <Navbar /> {/* Only display the Navbar component */}
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
    </div>
  );
}

export default App;
