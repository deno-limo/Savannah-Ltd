// src/pages/AlbumPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Hook to navigate to other pages

  // Fetch albums on component mount
  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
      setAlbums(response.data);
      setFilteredAlbums(response.data); // Set filtered albums initially to all albums
    };
    fetchAlbums();
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter albums based on the search term (title)
    const filtered = albums.filter(album =>
      album.title.toLowerCase().includes(term)
    );
    setFilteredAlbums(filtered);
  };

  // Handle navigation back to the Home page
  const handleBack = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Albums</h2>

      {/* Back Button */}
      <button
        onClick={handleBack}
        style={{
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Back to Home
      </button>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by album title..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          padding: '10px',
          width: '300px',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />

      {/* Album grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Responsive grid
        gap: '20px'
      }}>
        {filteredAlbums.length > 0 ? (
          filteredAlbums.map(album => (
            <div key={album.id} style={{
              border: '1px solid #ddd',
              borderRadius: '5px',
              padding: '15px',
              textAlign: 'center',
              backgroundColor: '#f9f9f9'
            }}>
              <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{album.title}</h3>
            </div>
          ))
        ) : (
          <p>No albums found</p>
        )}
      </div>
    </div>
  );
};

export default AlbumPage;
