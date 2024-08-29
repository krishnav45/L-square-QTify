import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card'; // Adjust the import path as needed
import styles from './Section.module.css'; // Adjust the import path as needed
import Carousel from '../Carousel/Carousel'; // Adjust the import path as needed

const Section = ({ title, apiEndpoint }) => {
  const [albums, setAlbums] = useState([]);
  const [collapsed, setCollapsed] = useState(true); // Set initial state to collapsed (true)

  useEffect(() => {
    // Fetch albums data based on the provided API endpoint
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, [apiEndpoint]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2> {/* Section title passed as a prop */}
        <button className={styles.collapseButton} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? 'Show All' : 'Collapse'}
        </button>
      </div>
      {collapsed ? (
        <Carousel 
          items={albums}
          renderItem={(album) => (
            <Card
              key={album.id}
              image={album.image}
              follows={album.follows} // Use 'follows' as the key for follow count
              title={album.title} // Use 'title' as the key for album name
            />
          )}
        />
      ) : (
        <div className={styles.grid}>
          {albums.map(album => (
            <Card
              key={album.id}
              image={album.image}
              follows={album.follows} // Use 'follows' as the key for follow count
              title={album.title} // Use 'title' as the key for album name
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Section;
