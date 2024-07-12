import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Feed {
  title: string;
  url: string;
  image: string;
  date: string;
  body: string;
  source: string;
  author: string;
}

interface FeedState {
  feeds: Feed[];
  filteredFeeds: Feed[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string[];
    author: string[];
    sortBy: string[];
  };
  filterOptions: {
    category: string[];
    author: string[];
    sortBy: string[];
  };
}

const initialState: FeedState = {
  feeds: [],
  filteredFeeds: [],
  loading: false,
  error: null,
  filters: {
    category: [],
    author: [],
    sortBy: [],
  },
  filterOptions: {
    category: [],
    author: [],
    sortBy: ['Date', 'title-ascending', 'title-descending'],
  },
};

const API_URL = 'https://dummy-rest-api.specbee.site/api/v1/news';

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch feeds');
  }
  const data: Feed[] = await response.json();

  // Extract unique categories and authors from the fetched data
  const categories = Array.from(new Set(data.map((item) => item.source)));
  const authors = Array.from(new Set(data.map((item) => item.author)));

  return { data, categories, authors };
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ filterType: keyof FeedState['filters']; selectedOptions: string[] }>) => {
      state.filters[action.payload.filterType] = action.payload.selectedOptions;
      state.filteredFeeds = applyFilters(state.feeds, state.filters);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feeds = action.payload.data;
        state.filterOptions.category = action.payload.categories;
        state.filterOptions.author = action.payload.authors;
        state.filteredFeeds = applyFilters(action.payload.data, state.filters);
        state.loading = false;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch feeds';
      });
  },
});

const applyFilters = (feeds: Feed[], filters: FeedState['filters']) => {
  let filtered = feeds;

  if (filters.category.length > 0) {
    filtered = filtered.filter(feed => filters.category.includes(feed.source));
    console.log('filtered',filtered);
    
  }

  if (filters.author.length > 0) {
    filtered = filtered.filter(feed => filters.author.includes(feed.author));
  }

  if (filters.sortBy.length > 0) {
    const sortOption = filters.sortBy[0];
    if (sortOption === 'Date') {
      filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortOption === 'title-ascending') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'title-descending') {
      filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
    }
  }

  return filtered;
};

export const { setFilter } = feedSlice.actions;

export default feedSlice.reducer;
