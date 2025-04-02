# Learning Path Generator MVP

This project is a Minimal Viable Product (MVP) for a learning path generator that leverages an AI Large Language Model (LLM) through Palantir Foundry.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Components](#components)
- [Zod Validation](#zod-validation)
- [Backend Integration](#backend-integration)
- [Foundry and AIP Logic Integration](#foundry-and-aip-logic-integration)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This MVP demonstrates a streamlined workflow for generating learning paths based on user-provided goals. It integrates a live LLM API (OpenAI GPT-3.5-turbo) via Palantir Foundry's AIP Logic, a Cloudflare Workers backend with Prisma, and a Supabase-like Vite React frontend. The primary goal is to showcase core functionality quickly and efficiently.

## Features

- **User Goal Input:** Users can input a learning goal via a simple form.
- **AI-Powered Learning Path Generation:** The application uses an LLM to generate a structured learning path.
- **Dynamic Display:** The generated learning path is displayed dynamically on the frontend.
- **Zod Validation:** Input is validated using Zod for type safety and robust error handling.
- **Cloudflare Workers Backend:** Serverless backend for API handling.
- **Prisma ORM:** Database access and management.
- **Supabase-like Vite React:** Modern React setup with Vite.
- **Foundry and AIP Logic:** Utilizes Palantir Foundry's AIP Logic to connect with the LLM API.

## Technologies Used

- **Frontend:** React (Vite, Supabase-like setup)
- **Validation:** Zod
- **Backend:** Cloudflare Workers
- **ORM:** Prisma
- **LLM API:** OpenAI GPT-3.5-turbo
- **Foundry:** Palantir Foundry
- **AIP Logic:** Palantir Foundry's AIP Logic

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone [repository URL]
    cd [repository directory]
    ```

2.  **Install dependencies (Frontend):**

    ```bash
    cd frontend
    npm install  # or yarn install
    ```

3.  **Install dependencies (Backend):**

    ```bash
    cd backend
    npm install  
    ```

4.  **Set up Foundry and AIP Logic:**

    - Ensure you have a Palantir Foundry account and API token.
    - Create an AIP Logic function as described in the project documentation.
    - Create a Foundry API endpoint that calls the AIP Logic function.

5.  **Configure Environment Variables:**

    - Create a `.env` file in the frontend and backend directories.
    - Add your OpenAI API key, Foundry API token, Prisma database connection string, and Cloudflare Workers account ID.

6.  **Setup Prisma:**

    - Run `npx prisma generate` in the backend directory.
    - Ensure your database is running and accessible to Prisma.

7.  **Cloudflare Workers Setup:**

    - Install the Cloudflare Workers CLI: `npm install -g wrangler`
    - Configure `wrangler.toml` for your Cloudflare Worker.
    - Deploy your worker using `wrangler publish`.

## Usage

1.  **Start the React development server:**

    ```bash
    cd frontend
    npm run dev 
    ```

2.  **Open your browser and navigate to `http://localhost:3000` (or the appropriate port).**

3.  **Enter a learning goal in the form and click "Generate Learning Path."**

## Components

-   `LearningPathForm.js`: Handles user input and form submission, including Zod validation.
-   `LearningPathDisplay.js`: Displays the generated learning path.

## Zod Validation

The learning goal input is validated using Zod to ensure it meets specific criteria (e.g., non-empty string). This provides type safety and prevents runtime errors.

## Cloudflare Workers and Prisma Integration

Cloudflare Workers acts as the serverless backend, handling API requests. Prisma is used to interact with the database, managing data persistence.

## Foundry and AIP Logic Integration

AIP Logic is used to integrate with the OpenAI GPT-3.5-turbo API. The AIP Logic function takes the user's learning goal as input and returns a structured learning path in JSON format.

## Future Improvements

-   Implement a more sophisticated UI/UX.
-   Add user authentication and authorization.
-   Integrate with other LLM APIs or models.
-   Add more robust error handling and logging.
-   Allow users to customize learning paths.
-   Optimize database queries with Prisma.
-   Improve Cloudflare Workers performance.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

