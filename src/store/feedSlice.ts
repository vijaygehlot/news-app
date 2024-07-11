import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface FeedState {
  feeds: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  feeds: [],
  loading: false,
  error: null,
};

// Replace with your actual API endpoint
const API_URL = 'https://dummy-rest-api.specbee.site/api/v1/news';

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch feeds');
  }
  return response.json();
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feeds = action.payload;
        state.loading = false;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch feeds';
      });
  },
});

export default feedSlice.reducer;
