import React, { useEffect, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";

import News from "./Components/News";
import Header from "./Components/Header";

import "./index.css";

import { buildApiUrl } from "./Utils/API";

const App = () => {
  const [active, setActive] = useState("breaking-news");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCatClick = (category) => {
    setActive(category);
  };

  // Wrap in useCallback to avoid missing dependency warning
  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const url = buildApiUrl(active);
      console.log('Fetching from:', url); // Debug log

      // Add timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data && data.articles && Array.isArray(data.articles)) {
        setArticles(data.articles);
      } else if (data.error) {
        throw new Error(data.message || data.error);
      } else {
        console.error('Invalid response format:', data);
        setError('Invalid response format from API');
      }

    } catch (e) {
      console.error('Fetch error:', e);

      if (e.name === 'AbortError') {
        setError('Request timed out. Please check your internet connection and try again.');
      } else if (e.message.includes('Failed to fetch')) {
        setError('Network error: Unable to connect to the news service. Please check your internet connection.');
      } else {
        setError(e.message || 'Failed to fetch news. Please try again.');
      }
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [active]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div>
      <Header handleCatClick={handleCatClick} />
      {loading && (
        <div className="flex justify-center items-center p-8">
          <div className="text-lg">Loading news...</div>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 my-4">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <button
            onClick={fetchNews}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      )}
      {!loading && !error && articles.length > 0 && <News articles={articles} />}
      {!loading && !error && articles.length === 0 && (
        <div className="flex justify-center items-center p-8">
          <div className="text-lg text-gray-600">No news articles found for this category.</div>
        </div>
      )}
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
