
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { fetchFeeds } from './store/feedSlice';
import FeedCard from './components/FeedCard';
import Pagination from './components/Pagination';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { feeds, loading, error } = useSelector((state: RootState) => state.feed);

  const [currentPage, setCurrentPage] = useState(1);
  const feedsPerPage = 5;

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Pagination logic
  const indexOfLastFeed = currentPage * feedsPerPage;
  const indexOfFirstFeed = indexOfLastFeed - feedsPerPage;
  const currentFeeds = feeds.slice(indexOfFirstFeed, indexOfLastFeed);

  const totalPages = Math.ceil(feeds.length / feedsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <h2>Ndews</h2>
      <div className="feed-card-container">
        <FeedCard feeds={currentFeeds} />
      </div>
      <div className="pagination-container">
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
};

export default App;
