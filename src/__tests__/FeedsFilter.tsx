import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FeedsFilter from '../components/FeedsFilter';
import { RootState } from '../store';
import { setFilter } from '../store/feedSlice';

const mockStore = configureStore([]);

describe('FeedsFilter Component', () => {
  let store: any; 

  beforeEach(() => {
    // Initialize mock store
    store = mockStore({
      feed: {
        filters: {
          category: [],
          author: [],
          sortBy: []
        },
        filterOptions: {
          category: [],
          author: [],
          sortBy: ["Date", "title-ascending", "title-descending"]
        }
      } as unknown as RootState 
    });
  });

  test('renders filter options correctly', () => {
    render(
      <Provider store={store}>
        <FeedsFilter />
      </Provider>
    );


    expect(screen.getByText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Author/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort By/i)).toBeInTheDocument();


    fireEvent.click(screen.getByLabelText(/Date \(Earliest to Latest\)/i));


    const expectedAction = { type: 'feed/setFilter', payload: { filterType: 'sortBy', selectedOptions: ['Date'] } };
    expect(store.getActions()).toContainEqual(expectedAction);
  });
});
