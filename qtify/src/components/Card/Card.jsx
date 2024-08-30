import React from 'react';
import styles from '../Card/Card.module.css'; // Import the CSS module
import { Chip } from '@mui/material';

const Card = ({ image, title, follows, likes }) => {
  // Determine the label based on whether `likes` or `follows` is provided
  const chipLabel = follows !== undefined ? `${follows} Follows` : `${likes} Likes`;

  return (
    <div>
      <div className={styles.card}>
        <img src={image} alt={title} className={styles.cardImage} />
        <div className={styles.cardBody}>
          <Chip label={chipLabel} className={styles.cardChip} />
        </div>
      </div>
      <h2 className={styles.cardTitle}>{title}</h2> {/* Display title after the card */}
    </div>
  );
};

export default Card;
