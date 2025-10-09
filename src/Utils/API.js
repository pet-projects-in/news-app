export const TOKEN = ["2038fa1ea7693d3d9451c19fe7d6bb84"];

// Use Vercel serverless function to avoid CORS issues
export const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/news'
    : '/api/news'; // In development, this will use the local proxy

// Fallback to direct API call (will likely fail due to CORS in browser)
export const GNEWS_API_URL = 'https://gnews.io/api/v4/top-headlines?lang=en';

// Helper function to build API URL for our serverless function
export const buildApiUrl = (topic = 'breaking-news') => {
    return `${API_BASE_URL}?topic=${encodeURIComponent(topic)}`;
};

// Fallback function for direct API call (not recommended for production)
export const buildDirectApiUrl = (token, topic = 'breaking-news') => {
    const params = new URLSearchParams({
        lang: 'en',
        max: 10,
        token,
        topic
    });

    return `${GNEWS_API_URL}&${params.toString()}`;
};
