import axios from 'axios';

const GOOGLE_BOOKS_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (query, maxResults = 12) => {
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_BASE_URL}?q=${query}&maxResults=${maxResults}`);
    return response.data.items.map(item => ({
      id: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
      genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'General',
      rating: item.volumeInfo.averageRating || (Math.random() * (5 - 4) + 4).toFixed(1), // Mock rating if missing
      cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:') : 'https://images.unsplash.com/photo-1543005127-d162c5a3b2b3?auto=format&fit=crop&q=80&w=400',
      synopsis: item.volumeInfo.description || 'No description available for this title.',
      price: item.saleInfo?.listPrice?.amount || Math.floor(Math.random() * (600 - 200) + 200), // Mock price if missing
      isbn: item.volumeInfo.industryIdentifiers ? item.volumeInfo.industryIdentifiers[0].identifier : 'N/A'
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export const getBookDetails = async (id) => {
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
};
