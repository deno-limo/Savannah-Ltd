// src/pages/PhotoPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const PhotoPage = () => {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      setPhotos(response.data.slice(0, 20)); // Limit to 20 photos
      setFilteredPhotos(response.data.slice(0, 20)); // Set initial filtered photos
    };
    fetchPhotos();
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter photos based on the search term (title)
    const filtered = photos.filter((photo) =>
      photo.title.toLowerCase().includes(term)
    );
    setFilteredPhotos(filtered);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 id="photos">Photos</h2>

      {/* Search bar */}
      <input
        id="searchBar"
        type="text"
        placeholder="Search by photo title..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Photos displayed in a grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              style={{
                textAlign: "center",
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <p>{photo.title}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No photos found</p>
        )}
      </div>
    </div>
  );
};

export default PhotoPage;
