// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

// Initialize the Express application
const app = express();

// Apply middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Encapsulated function to scrape text from a URL
async function scrapeTextFromURL(url) {
    try {
        console.log(`Fetching and scraping text from URL: ${url}`);

        // Fetch the webpage with headers
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        // Load the HTML into Cheerio
        const $ = cheerio.load(data);

        const text = $('p').map((i, el) => $(el).text()).get().join(' ').trim();

        if (!text) {
            console.error('No text content found at the provided URL');
            return null;
        }

        // Return the first 200 characters of extracted text
        const trimmedText = text.slice(0, 200);
        console.log(`\nExtracted Text (200 characters):\n${trimmedText}\n--- End of Text Preview ---\n`);
        return trimmedText;
    } catch (error) {
        console.error('Error while scraping text from the URL:', error.message);
        throw new Error('Failed to scrape text from the URL');
    }
}

// Route to analyze text from a URL
app.post('/analyze-url', async (req, res) => {
    const { url } = req.body;
    // Validate the input URL
    if (!url) {
        console.error('No URL provided in the request body');
        return res.status(400).json({ error: 'URL is required' });
    }
    try {
        // Step 1: Scrape text from the provided URL
        const text = await scrapeTextFromURL(url);
        if (!text) {
            return res.status(400).json({ error: 'No text content found at the provided URL' });
        }
        // Step 2: Connect to the AWS NLP API
        const response = await axios.post('https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer', { text });
        return res.json(response.data);

    } catch (error) {
        console.error('Error during URL processing or API request:', error.message);
        return res.status(500).json({ error: 'Failed to analyze the URL' });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send("This is the server API page. You may access its services via the client app.");
});

// Start the server
app.listen(8000, () => {
    console.log('Server running on port 8000');
});
