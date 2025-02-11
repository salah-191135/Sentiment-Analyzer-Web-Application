/**
 * @jest-environment jsdom
 */

import { displayResults } from "../src/client/js/displayResults";

describe("displayResults function", () => {
    let resultContainer;

    // Before each test, set up a mock HTML structure
    beforeEach(() => {
        document.body.innerHTML = '<div id="results"></div>';
        resultContainer = document.getElementById("results");
    });

    test("should display an error message when given invalid data", () => {
        displayResults(null);

        expect(resultContainer.innerHTML).toContain("Bad response from API");
        expect(resultContainer.innerHTML).toMatch(/color:red;/);
    });

    test("should display sentiment analysis correctly", () => {
        const mockData = {
            "sentiment": "Positive",
            "sentiment_scores": {
                "Positive": 0.95,
                "Negative": 0.02,
                "Neutral": 0.03,
            },
            "text": "This is a test text for sentiment analysis."
        };

        displayResults(mockData);
        expect(resultContainer.innerHTML).toContain("Sentiment Analysis");
        expect(resultContainer.innerHTML).toContain("Overall Sentiment:");
        expect(resultContainer.innerHTML).toContain("Positive");
        expect(resultContainer.innerHTML).toContain("0.9500");
    });

    test("should handle missing text gracefully", () => {
        const mockData = {
            "sentiment": "Neutral",
            "sentiment_scores": {
                "Positive": 0.3,
                "Negative": 0.3,
                "Neutral": 0.4,
            },
            "text": ""
        };

        displayResults(mockData);

        expect(resultContainer.innerHTML).toContain("No relevant text extracted.");
    });

});
