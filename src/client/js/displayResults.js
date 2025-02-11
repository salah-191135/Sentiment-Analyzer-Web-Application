
function displayResults(data) {
    const result = document.getElementById('results');

    if (!data || !data.sentiment_scores) {
        result.innerHTML = "<p style='color:red;'>Bad response from API.</p>";
        return;
    }

    const { sentiment, sentiment_scores, text } = data;

    const resultHTML = `
        <div class="result-title">Sentiment Analysis</div>

        <div class="sentiment-result">
            <strong>Overall Sentiment:</strong> <span class="sentiment">${sentiment}</span>
        </div>
        <div class="score-container">
        <h4>Sentiment Scores</h4>
            <div class="sentiment-score positive"><strong>Positive:</strong> ${sentiment_scores.Positive.toFixed(4)}</div>
            <div class="sentiment-score negative"><strong>Negative:</strong> ${sentiment_scores.Negative.toFixed(4)}</div>
            <div class="sentiment-score neutral"><strong>Neutral:</strong> ${sentiment_scores.Neutral.toFixed(4)}</div>
        </div>
        <div class ="input-preview">
            <h2>Input Preview</h2>
            <p class="extracted-text">${text ? text.substring(0, 500) + '...' : 'No relevant text extracted.'}</p>
        </div>
    `;
    result.innerHTML = resultHTML;
    result.style.display = 'block';
}

export { displayResults };
