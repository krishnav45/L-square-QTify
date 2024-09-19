import styles from '../FAQ/FAQ.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FaqSection = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('https://qtify-backend-labs.crio.do/faq');
        const fetchedFaqs = response.data.data;

        if (Array.isArray(fetchedFaqs)) {
          setFaqs(fetchedFaqs);
        } else {
          console.error('Unexpected data format:', fetchedFaqs);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div className={styles.faqSection}>
      <Typography variant="h4" className={styles.title}>
        FAQs
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ backgroundColor: '#121212',border: '1px solid #FFFFFF',borderRadius: '8px' }}>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ color: 'green' }} />}
    sx={{
      backgroundColor: '#121212', // Black background
      color: '#ffffff', // White text
      '& .MuiAccordionSummary-content': {
        margin: '12px 0', // Center content vertically
      },
    }}
  >
    <Typography>{faq.question}</Typography>
  </AccordionSummary>
  <AccordionDetails sx={{ backgroundColor: 'white', color: 'black' }}>
    <Typography>{faq.answer}</Typography>
  </AccordionDetails>
</Accordion>

      ))}
    </div>
  );
};

export default FaqSection;
