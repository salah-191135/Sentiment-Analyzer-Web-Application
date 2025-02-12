/**
 * @jest-environment jsdom
 */
import { displayResults } from "../src/client/js/displayResults.js";
import { handleSubmit } from "../src/client/js/formHandler.js";

jest.mock("../src/client/js/displayResults.js", () => ({
    displayResults: jest.fn(), // Mock displayResults to avoid modifying the real DOM
}));

describe("handleSubmit function", () => {
    let resultContainer, form, inputField;

    beforeEach(() => {
        // Mock the HTML structure
        document.body.innerHTML = `
            <form id="urlForm">
                <input class="url-input" id="name" type="text" name="url" placeholder="Enter URL" required>
                <button class="submit-button" id="submitButton" type="submit">Submit</button>
            </form>
            <div id="results"></div>
        `;

        resultContainer = document.getElementById("results");
        form = document.getElementById("urlForm");
        inputField = document.getElementById("name");

        // Attach event listener
        form.addEventListener("submit", handleSubmit);
    });

    test("should send valid URL to the server and display results", async () => {
        const mockResponse = {
            "sentiment": "Positive",
            "sentiment_scores": {
                "Positive": 0.85,
                "Negative": 0.05,
                "Neutral": 0.10,
            },
            "text": "Mock response from server.",
        };

        // Mock fetch API response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            })
        );

        inputField.value = "https://example.com";
        await handleSubmit(new Event("submit", { bubbles: true }));

        expect(fetch).toHaveBeenCalledWith("https://sentiment-analyzer-web-application.onrender.com/analyze-url", expect.any(Object));
        expect(displayResults).toHaveBeenCalledWith(mockResponse);
    });

    test("should handle server errors correctly", async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error("Server error")));

        inputField.value = "https://example.com";
        await handleSubmit(new Event("submit", { bubbles: true }));

        expect(resultContainer.innerHTML).toContain("Error fetching analysis results");
    });
});
