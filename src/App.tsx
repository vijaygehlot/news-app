import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { fetchFeeds } from './store/feedSlice';
import FeedCard from './components/FeedCard';
import Pagination from './components/Pagination';
import FeedsFilter from './components/FeedsFilter';
import NoInternetLogo from './assets/images/no-internet.png'
import './App.scss';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { filteredFeeds, loading, error } = useSelector((state: RootState) => state.feed);

  const [currentPage, setCurrentPage] = useState(1);
  const feedsPerPage = 5;

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (loading) {
    return ( <div className="loader-container">
      <div className="loader"></div>
    </div>);
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h1>Error: {error}!</h1>
          <img src={NoInternetLogo} alt="No Internet" />
        </div>
      </div>
    );
  }

  const indexOfLastFeed = currentPage * feedsPerPage;
  const indexOfFirstFeed = indexOfLastFeed - feedsPerPage;
  const currentFeeds = filteredFeeds.slice(indexOfFirstFeed, indexOfLastFeed);

  const totalPages = Math.ceil(filteredFeeds.length / feedsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  console.log('currentFeeds', currentFeeds);

  return (
    <div className="container">
      <div className="row">
        <div className="filter-section">
          <FeedsFilter />
        </div>
        <div className="feed-section">
          <div className="feed-card-container">
            {currentFeeds.length > 0 ?
              <FeedCard feeds={currentFeeds} /> : <h2>No result found for selection !</h2>

            }
          </div>
          <div className="pagination-container">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
