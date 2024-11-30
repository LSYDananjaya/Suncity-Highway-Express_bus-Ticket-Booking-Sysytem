import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import FeedbackCard from './Feedbackcard';
import './Feedbacklist.css';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  reviewContainer: {
    marginBottom: 10,
    borderBottom: '1 solid black',
    paddingBottom: 10
  },
  reviewTitle: {
    fontSize: 18,
    marginBottom: 5
  },
  reviewDetails: {
    fontSize: 12
  }
  
});

const Feedbacklist = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/reviews')
      .then(res => {
        setReviews(res.data);
        setFilteredReviews(res.data);
      })
      .catch(() => console.log('Error while getting data'));
  }, []);

  useEffect(() => {
    let filtered = reviews.filter(
      review =>
        (typeFilter ? review.type === typeFilter : true) &&
        (categoryFilter ? review.category === categoryFilter : true)
    );
    setFilteredReviews(filtered);
  }, [typeFilter, categoryFilter, reviews]);

  return (
    <div className="Show_Feedbacklist">
      <div className="container">
        <div className="filters">
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="">All Types</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
          </select>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            <option value="">All Categories</option>
            <option value="About Driving">About Driving</option>
            <option value="About Service">About Service</option>
            <option value="About Comfortability">About Comfortability</option>
            <option value="About Pricing">About Pricing</option>
          </select>
          <PDFDownloadLink
  document={<PDFDocument reviews={filteredReviews} />}
  fileName="filtered_reviews.pdf"
  style={{
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
  }}
>
  {({ blob, url, loading, error }) =>
    loading ? 'Loading document...' : 'Download Filtered Reports as PDF'
  }
</PDFDownloadLink>

        </div>
        <div className="list">
          {filteredReviews.map((review, index) => (
            <FeedbackCard key={index} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PDFDocument = ({ reviews }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Filtered Reviews</Text>
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewContainer}>
            <Text style={styles.reviewTitle}>{review.title}</Text>
            <Text style={styles.reviewDetails}>
              Type: {review.type}, Category: {review.category}, Rating: {review.rating}, Created At: {review.createdAt}
            </Text>
            <Text>{review.content}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default Feedbacklist;
