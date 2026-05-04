import React, { createContext, useContext, useState, useEffect } from 'react';

const LibraryContext = createContext();

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

export const LibraryProvider = ({ children }) => {
  const [rentals, setRentals] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedRentals = localStorage.getItem('bv_rentals');
    const savedPurchases = localStorage.getItem('bv_purchases');
    const savedWishlist = localStorage.getItem('bv_wishlist');

    if (savedRentals) setRentals(JSON.parse(savedRentals));
    if (savedPurchases) setPurchases(JSON.parse(savedPurchases));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('bv_rentals', JSON.stringify(rentals));
  }, [rentals]);

  useEffect(() => {
    localStorage.setItem('bv_purchases', JSON.stringify(purchases));
  }, [purchases]);

  useEffect(() => {
    localStorage.setItem('bv_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToRentals = (book, libraryName) => {
    const newRental = {
      id: `rental-${Date.now()}`,
      bookId: book.id,
      title: book.title,
      author: book.author,
      coverImage: book.cover || book.coverImage,
      rentalDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      daysRemaining: 14,
      rentalPrice: book.rentPrice || 49,
      libraryName: libraryName || "Local Library",
      status: "active",
    };
    setRentals(prev => [newRental, ...prev]);
  };

  const addToPurchases = (book) => {
    const newPurchase = {
      id: `purchase-${Date.now()}`,
      bookId: book.id,
      title: book.title,
      author: book.author,
      coverImage: book.cover || book.coverImage,
      purchaseDate: new Date().toISOString().split('T')[0],
      price: book.price || 350,
      format: "Paperback",
      rating: book.rating || 4.5,
    };
    setPurchases(prev => [newPurchase, ...prev]);
  };

  const toggleWishlist = (book) => {
    const exists = wishlist.find(item => item.bookId === book.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.bookId !== book.id));
      return false;
    } else {
      const newItem = {
        id: `wishlist-${Date.now()}`,
        bookId: book.id,
        title: book.title,
        author: book.author,
        coverImage: book.cover || book.coverImage,
        category: book.genre || book.category,
        price: book.price || 350,
        addedDate: new Date().toISOString().split('T')[0],
      };
      setWishlist(prev => [newItem, ...prev]);
      return true;
    }
  };

  const removeRental = (id) => setRentals(prev => prev.filter(item => item.id !== id));
  const removePurchase = (id) => setPurchases(prev => prev.filter(item => item.id !== id));

  return (
    <LibraryContext.Provider value={{
      rentals,
      purchases,
      wishlist,
      addToRentals,
      addToPurchases,
      toggleWishlist,
      removeRental,
      removePurchase
    }}>
      {children}
    </LibraryContext.Provider>
  );
};
