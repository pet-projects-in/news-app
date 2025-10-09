// api/news.js - Vercel Serverless Function
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { topic = 'breaking-news' } = req.query;
    const token = '2038fa1ea7693d3d9451c19fe7d6bb84';

    try {
        const apiUrl = `https://gnews.io/api/v4/top-headlines?lang=en&token=${token}&topic=${topic}&max=10`;

        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'NewsApp/1.0'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            error: 'Failed to fetch news',
            message: error.message
        });
    }
}