import React from 'react';
import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

const mockStore = configureStore([]);
const store = mockStore({
  // Your mock state here
  feed: {
    // Example mock state
    filters: {
      category: [],
      author: [],
      sortBy: ['Date', 'title-ascending', 'title-descending']
    },
    filterOptions: {
      category: ['Benzinga', 'Delta', 'Gamma'],
      author: ['Benzinga Neuro', 'Werder Helmner', 'Patrick Wilson'],
      sortBy: ['Date', 'title-ascending', 'title-descending']
    }
  }
});

test('renders App component', () => {
  act(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  // Optionally, add assertions about the rendered content if needed
});
