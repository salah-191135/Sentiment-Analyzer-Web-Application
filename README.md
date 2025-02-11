# Sentiment Analyzer Web Application

This project is a Sentiment Analyzer web application that allows users to input a URL, scrape the text content from the webpage, and analyze the sentiment of the text using Natural Language Processing (NLP). The application is built with modern web development tools and practices, including Webpack, Sass, and service workers.

## Table of Contents

- [Sentiment Analyzer Web Application](#sentiment-analyzer-web-application)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [API Integration](#api-integration)
    - [Using the API](#using-the-api)
  - [Running the Project](#running-the-project)
    - [Development Mode](#development-mode)
    - [Production Mode](#production-mode)
  - [Testing](#testing)
  - [Deployment](#deployment)
  - [License](#license)

## Project Overview

The goal of this project is to provide hands-on experience with the following technologies and concepts:

- Setting up and configuring Webpack
- Using Sass for styling
- Implementing Webpack Loaders and Plugins
- Designing layouts and page structures
- Utilizing service workers for offline capabilities
- Integrating with external APIs and making HTTP requests

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1. **Clone the repository:**

    ```sh
    git clone [<repository-url>](https://github.com/salah-191135/Sentiment-Analyzer-Web-Application.git)
    ```

2. **Navigate to the project directory:**

    ```sh
    cd starter_project
    ```

3. **Install the dependencies:**

    ```sh
    npm install
    ```

## API Integration

The application integrates with a Udacity-provided API to perform sentiment analysis. The API endpoint is:

```
https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer
```

### Using the API

The `/analyze-url` POST route in your server is configured to forward requests to this AWS endpoint. Here's how the integration works:

1. The client sends a POST request to the `/analyze-url` endpoint of the local server.
2. The server forwards the request to the AWS endpoint.
3. The AWS endpoint processes the text and returns the sentiment analysis results to the server.
4. The server responds to the client with the analysis results.

## Running the Project

### Development Mode

To run the project in development mode with hot reloading:

```sh
npm run build-dev
```

### Production Mode

To build the project for production:

```sh
npm run build-prod
```

To start the server:

```sh
npm start
```

## Testing

To run the tests:

```sh
npm test
```

## Deployment

- [Netlify](https://www.netlify.com/)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
