import fetchMock from 'fetch-mock';
import { getFetcher, postFetcher, putFetcher } from './fetcher';

describe('fetcher functions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should fetch data with GET request', async () => {
    const mockData = { id: 1, name: 'Test User' };
    fetchMock.getOnce('http://localhost:3000/api/user?id=1', mockData);

    const result = await getFetcher('/user', { id: 1 });

    expect(result).toEqual(mockData);
    expect(fetchMock.called('http://localhost:3000/api/user?id=1')).toBeTruthy();
  });

  it('should fetch data with POST request', async () => {
    const mockData = { id: 1, title: 'New Post' };
    fetchMock.postOnce('http://localhost:3000/api/posts', mockData);

    const result = await postFetcher('/posts', { title: 'New Post' });

    expect(result).toEqual(mockData);
    expect(fetchMock.called('http://localhost:3000/api/posts')).toBeTruthy();
  });

  it('should fetch data with PUT request', async () => {
    const mockData = { id: 1, title: 'Updated Post' };
    fetchMock.putOnce('http://localhost:3000/api/posts', mockData);

    const result = await putFetcher('/posts', { title: 'Updated Post' });

    expect(result).toEqual(mockData);
    expect(fetchMock.called('http://localhost:3000/api/posts')).toBeTruthy();
  });

  // Define fallback responses for GET, POST, and PUT after specific mocks
  
});


describe('fetcher function fallback scenario', () => {
    afterEach(() => {
        fetchMock.restore();
    });
    beforeEach(() => {
        fetchMock.get('*', { message: 'Fallback GET response' });
        fetchMock.get('/user', { message: 'Error getting data to https://localhost:3000/api/user?id=1: 404 Not Found - Not Found' });
        fetchMock.post('*', { message: 'Fallback POST response' });
        fetchMock.put('*', { message: 'Fallback PUT response' });
      });
    
      it('should handle fallback for unrecognized GET request', async () => {
        const result = await getFetcher('/unrecognizedEndpoint', { id: 1 });
    
        expect(result).toEqual({ message: 'Fallback GET response' });
        expect(fetchMock.called()).toBeTruthy();
      });
    
      it('should handle fallback for unrecognized POST request', async () => {
        const result = await postFetcher('/unrecognizedEndpoint', { title: 'New Post' });
    
        expect(result).toEqual({ message: 'Fallback POST response' });
        expect(fetchMock.called()).toBeTruthy();
      });
    
      it('should handle fallback for unrecognized PUT request', async () => {
        const result = await putFetcher('/unrecognizedEndpoint', { title: 'Updated Post' });
    
        expect(result).toEqual({ message: 'Fallback PUT response' });
        expect(fetchMock.called()).toBeTruthy();
      });
})