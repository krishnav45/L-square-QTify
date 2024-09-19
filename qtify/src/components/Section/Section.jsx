import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import styles from './Section.module.css';
import Carousel from '../Carousel/Carousel';
import { Tabs, Tab } from '@mui/material';

const Section = ({ title, apiEndpoint, genres }) => {
  const [items, setItems] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true); // Set loading to true when starting to fetch
      try {
        const response = await axios.get(apiEndpoint);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchItems();
  }, [apiEndpoint]);

  const filteredItems = selectedGenre === 'All' ? items : items.filter(item => item.genre.key === selectedGenre);

  if (loading) {
    return <div>Loading...</div>; // Render a loading message or spinner while fetching data
  }

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
              follows={undefined} 
              likes={item.likes} 
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
                follows={item.follows} 
                likes={undefined} 
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
                follows={item.follows} 
                likes={undefined} 
              />
            ))}
          </div>
        )
      )}
    </section>
  );
};

export default Section;
