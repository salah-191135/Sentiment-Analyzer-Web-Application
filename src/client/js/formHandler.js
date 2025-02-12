import { displayResults } from './displayResults';
const form = document.getElementById('urlForm');
if (form) {
    form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(event) {
    const result = document.getElementById('results');
    event.preventDefault();
    result.innerHTML = '';

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // console.log(formText);
    // Check if the URL is valid
    if (!formText) {
        result.innerHTML = '<p style="color:red;">Enter a valid URL.</p>';
    }
    // If the URL is valid, send it to the server using the serverURL constant above

    try {
        const response = await fetch(
            'https://sentiment-analyzer-web-application.onrender.com/analyze-url',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: formText }),
            }
        );
        // console.log(response);
        if (!response.ok)
            throw new Error('Failed to fetch results from the server');

        const res = await response.json();

        // console.log(res);
        displayResults(res);

    } catch (error) {
        console.error('Error:', error);
        result.innerHTML = '<p style="color:red;">Error fetching analysis results one one .</p>';
    }

}

// Export the handleSubmit function
export { handleSubmit };

