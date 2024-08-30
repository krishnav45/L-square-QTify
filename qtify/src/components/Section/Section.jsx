import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card'; // Adjust the import path as needed
import styles from './Section.module.css'; // Adjust the import path as needed
import Carousel from '../Carousel/Carousel'; // Adjust the import path as needed
import { Tabs, Tab } from '@mui/material'; // Import Tabs and Tab from Material UI

const Section = ({ title, apiEndpoint, genres }) => {
  const [items, setItems] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    // Fetch items data based on the provided API endpoint
    const fetchItems = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [apiEndpoint]);

  // Filter items based on the selected genre
  const filteredItems = selectedGenre === 'All' ? items : items.filter(item => item.genre.key === selectedGenre);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>
        {(title === "Top Albums" || title === "New Albums") && (
          <button className={styles.collapseButton} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? 'Show All' : 'Collapse'}
          </button>
        )}
      </div>
      
      {title === "Songs" && genres.length > 0 && (
        <div className={styles.tabsContainer}>
<Tabs
  value={selectedGenre}
  onChange={(event, newValue) => setSelectedGenre(newValue)}
  className={styles.tabs}
  variant="scrollable"
  scrollButtons="auto"
  TabIndicatorProps={{ sx: { backgroundColor: '#34C94B' } }}
>
  <Tab 
    label="All" 
    value="All" 
    className={styles.tab}
    sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }} 
  />
  {genres.map((genre) => (
    <Tab 
      key={genre.key} 
      label={genre.label} 
      value={genre.key} 
      className={styles.tab}
      sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }} 
    />
  ))}
</Tabs>
        </div>
      )}
      
      {title === "Songs" ? (
        <Carousel 
          items={filteredItems}
          renderItem={(item) => (
            <Card
              key={item.id}
              image={item.image}
              title={item.title}
              follows={undefined} // No follows for songs
              likes={item.likes} // Use 'likes' for songs
            />
          )}
        />
      ) : (
        collapsed ? (
          <Carousel 
            items={filteredItems}
            renderItem={(item) => (
              <Card
                key={item.id}
                image={item.image}
                title={item.title}
                follows={item.follows} // Pass 'follows' for albums
                likes={undefined} // No 'likes' for albums
              />
            )}
          />
        ) : (
          <div className={styles.grid}>
            {filteredItems.map(item => (
              <Card
                key={item.id}
                image={item.image}
                title={item.title}
                follows={item.follows} // Pass 'follows' for albums
                likes={undefined} // No 'likes' for albums
              />
            ))}
          </div>
        )
      )}
    </section>
  );
};

export default Section;
