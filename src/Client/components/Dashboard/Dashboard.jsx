import React, { useEffect, useState } from "react";
import './DashBoard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);

  // Simulate fetching data from an API
  useEffect(() => {
    // Sample data for books
    const fetchedBooks = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      },
      {
        title: "1984",
        author: "George Orwell",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      },
    ];
    setBooks(fetchedBooks);

    // Sample data for posts
    const fetchedPosts = [
      {
        title: "Understanding React Hooks",
        author: "Jane Doe",
        date: "Nov 20, 2024",
      },
      {
        title: "10 Tips for Writing Clean Code",
        author: "John Smith",
        date: "Nov 22, 2024",
      },
    ];
    setPosts(fetchedPosts);

    // Sample data for products
    const fetchedProducts = [
      {
        name: "Wireless Keyboard",
        price: "$49.99",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      },
      {
        name: "Noise Cancelling Headphones",
        price: "$199.99",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      },
    ];
    setProducts(fetchedProducts);
  }, []);

  return (
    <main className="max-width-wh-100 w-100 main-content max-height-vh-100 h-100 border-radius-lg">
      <div className="container-fluid py-2">
        <div className="row">
          <div className="ms-3">
            <h3 className="mb-0 mt-5 h4 font-weight-bolder">Bienvenue à votre espace, 'NAME'!</h3>
            <p className="mb-4">Check the books, posts, and latest products below.</p>
          </div>
        </div>

        {/* Section: Books */}
        <div className="row mt-4">
          <div className="col-12">
            <h4 className="font-weight-bolder">Books</h4>
            <div className="row">
              {books.map((book, index) => (
                <div className="col-md-4 mb-3" key={index}>
                  <div className="card h-100">
                    <img
                      src={book.image}
                      className="card-img-top"
                      alt={`${book.title} cover`}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text">Author: {book.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section: Posts */}
        <div className="row mt-5">
          <div className="col-12">
            <h4 className="font-weight-bolder">Posts</h4>
            <ul className="list-group">
              {posts.map((post, index) => (
                <li className="list-group-item" key={index}>
                  <h5 className="mb-1">{post.title}</h5>
                  <small className="text-muted">By {post.author} on {post.date}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section: Products */}
        <div className="row mt-5">
          <div className="col-12">
            <h4 className="font-weight-bolder">Latest Products</h4>
            <div className="row">
              {products.map((product, index) => (
                <div className="col-md-4 mb-3" key={index}>
                  <div className="card h-100">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={`${product.name}`}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">Price: {product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
