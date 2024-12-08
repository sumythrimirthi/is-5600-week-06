import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = ({ data }) => {
  const limit = 10; // Number of products per page
  const [offset, setOffset] = useState(0); // Pagination offset
  const [products, setProducts] = useState([]); // Filtered products to display
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering

  // Handle Previous and Next buttons for pagination
  const handlePagination = (direction) => {
    setOffset(offset + direction * limit);
  };

  // Function to handle the search term and filter products by tags
  const handleSearch = (search) => {
    setSearchTerm(search);
    setOffset(0); // Reset pagination when a new search is made
  };

  // Function to filter the products by the search term
  const filterProducts = (data) => {
    if (!searchTerm) {
      return data; // No search term, return all products
    }

    return data.filter((product) => {
      return (
        product.tags &&
        product.tags.some((tag) => {
          // Access the 'title' property of each tag object
          const normalizedTag = String(tag.title).trim(); // Normalize to string and trim spaces
          return normalizedTag.toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    });
  };

  // Update the products list whenever the search term or offset changes
  useEffect(() => {
    console.log('Data:', data);
    console.log('Search Term:', searchTerm);
    console.log('Offset:', offset);

    let filteredProducts = filterProducts(data);
    console.log('Filtered Products:', filteredProducts);

    setProducts(filteredProducts.slice(offset, offset + limit));
  }, [searchTerm, offset, data]);

  // Handle disabling the Previous and Next buttons
  const isPreviousDisabled = offset === 0;
  const isNextDisabled = products.length < limit;

  return (
    <div className="cf pa2">
      {/* Search Component */}
      <Search handleSearch={handleSearch} />

      {/* Render the filtered and paginated products */}
      <div className="mt2 mb2">
        {products.length > 0 ? (
          products.map((product) => <Card key={product.id} {...product} />)
        ) : (
          <p>No products found</p> // Message if no products match the search
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => handlePagination(-1)}
          disabled={isPreviousDisabled}
        />
        <Button
          text="Next"
          handleClick={() => handlePagination(1)}
          disabled={isNextDisabled}
        />
      </div>
    </div>
  );
};

export default CardList;
