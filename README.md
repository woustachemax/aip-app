# Learning Path Generator MVP 📚👨‍🎓

This project is a Minimal Viable Product (MVP) for a learning path generator that leverages an AI Large Language Model (LLM) through Palantir Foundry.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Zod Validation](#zod-validation)
- [Backend Integration (Hono on Cloudflare Workers and Prisma)](#hono-on-cloudflare-workers-and-prisma)
- [Frontend (React with Vite)](#frontend-react-with-vite)
- [Foundry and AIP Logic Creation and Integration](#foundry-and-aip-logic-creation-and-integration)
- [CORS Configuration](#cors-configuration)
- [Default Route](#default-route)
- [UI Styling](#ui-styling)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This MVP demonstrates a streamlined workflow for generating learning paths based on user-provided goals. It integrates a live LLM API (OpenAI GPT-4o) via Palantir Foundry's AIP Logic, a Hono backend running on Cloudflare Workers with Prisma, and a Vite React frontend. The primary goal is to showcase core functionality quickly and efficiently.

## Features

- **User Goal Input:** Users can input a learning goal via a simple form.
- **AI-Powered Learning Path Generation:** The application uses an LLM to generate a structured learning path.
- **Dynamic Display:** The generated learning path is displayed dynamically on the frontend.
- **User Authentication:** Basic signup and login functionality.
- **Token-Based Authentication:** JWT for securing communication.
- **Zod Validation:** Input is validated using Zod for type safety and robust error handling.
- **Hono Backend:** Lightweight and fast web framework for the backend.
- **Cloudflare Workers:** Serverless platform for backend deployment.
- **Prisma ORM:** Database access and management.
- **Vite React Frontend:** Modern React setup with Vite for rapid development.
- **Foundry and AIP Logic:** Utilizes Palantir Foundry's AIP Logic to connect with the LLM API.
- **CORS Enabled:** Configured to allow communication between the frontend and backend running on different origins.
- **Default Navigation:** Automatically redirects to the functionality page after initial load and after successful authentication.
- **Notion-inspired UI:** Clean and classy user interface with a color scheme based on slate and gray tones, with subtle wave patterns in the background.

## Technologies Used

- **Frontend:** React (Vite)
- **Routing:** React Router DOM
- **Validation:** Zod
- **Backend Framework:** Hono
- **Backend Platform:** Cloudflare Workers
- **ORM:** Prisma
- **LLM API:** OpenAI GPT-4o
- **Foundry:** Palantir Foundry
- **AIP Logic:** Palantir Foundry's AIP Logic
- **Styling:** Tailwind CSS

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/woustachemax/aip-app](https://github.com/woustachemax/aip-app)
    cd aip-app
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
    - Add your OpenAI API key, Foundry API token, Prisma database connection string, JWT secret, and Cloudflare Workers account ID.

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

2.  **Open your browser and navigate to `http://localhost:3000` (or the appropriate port).** You will be automatically redirected to the learning path generation page.

3.  **Sign up or log in to access the learning path generation feature.**

4.  **Enter a learning goal in the form and click "Generate Learning Path."**

## Zod Validation

Input for signup, login, and goal submission is validated using Zod to ensure data integrity and type safety.

## Backend Integration (Hono on Cloudflare Workers and Prisma)

The backend is built using Hono, a lightweight web framework for Cloudflare Workers. It handles user authentication (signup and login) and the API endpoint for generating learning paths. Prisma is used as the ORM to interact with the database for user data persistence. JWT (JSON Web Tokens) are used for secure authentication after login and signup.

## Frontend (React with Vite)

The frontend is built with React using Vite as the build tool for fast development. It provides user interfaces for signup, login, and learning path generation. React Router DOM is used for navigation between different pages.

## Foundry and AIP Logic Creation and Integration

1.  **Accessing AIP Logic:** Within the Palantir Foundry environment, I navigated to the "AIP Logic" application. This is Foundry's dedicated workspace for building AI-powered functions using a visual, low-code interface.

2.  **Creating a New Function:** I initiated the creation of a new AIP Logic function and named it `generateLearningPathWithLLM`. I also defined an API-friendly name, `generateLearningPath`, which is used for programmatic access.

3.  **Defining the Input:** The function is designed to accept a single input:
    * **Name:** `goal`
    * **Type:** `String`
    * This input is marked as **Required**, ensuring that a learning objective is provided for the path generation.

4.  **Implementing the Core Logic with "Use LLM":** The heart of the function lies in the "Use LLM" block, which facilitates interaction with a Large Language Model. Within this block:
    * **Prompt Engineering:** I crafted a detailed prompt instructing the LLM to generate a structured learning path. The prompt specifies the desired output format as a JSON object with `learningPathId`, `goal`, and an array of `steps`.
    * **Input Referencing:** To dynamically insert the user-provided learning `goal` into the prompt, I utilized the `/goal` syntax directly within the prompt text, as per AIP Logic best practices for referencing function inputs within the "Use LLM" block. The "Provide input data" section of the block was left empty, as the input is directly referenced in the prompt.
    * **Model Selection:** The function is configured to use the `GPT-4o` model (or the specific model you selected) for generating the learning paths.
    * **Output Type:** The output type of the "Use LLM" block (and therefore the function) is set to `String`, as the LLM returns the learning path as a JSON-formatted string.

5.  **Testing within AIP Logic:** Throughout the development process, I utilized the built-in Debugger within the AIP Logic editor. This allowed me to provide sample learning goals as input and verify that the function was generating the learning paths in the expected JSON format. These tests confirmed the correct configuration of the input, the LLM prompt, and the overall logic.

6.  **Publishing the Function:** Once the function was thoroughly tested and deemed ready for integration, I published it within Foundry. This process assigned the function a unique Resource Identifier (RID) and made it available as an API endpoint that can be called by external applications. The publishing process also manages versioning of the function.

In essence, the `generateLearningPathWithLLM` function was created using AIP Logic's visual interface by defining an input, configuring a "Use LLM" block with a specific prompt that references the input, and then publishing the function to make it accessible via an API.

## CORS Configuration

Cross-Origin Resource Sharing (CORS) has been configured on the backend to allow the frontend (running on a different origin, typically `localhost:3000` during development) to make requests to the backend API running on Cloudflare Workers. This ensures that the browser does not block requests due to security restrictions.

## Default Route

The application is configured to automatically redirect users to the `/functionality` route upon initial load. This ensures that users are directly taken to the learning path generation feature.

## UI Styling

The user interface is styled with Tailwind CSS, focusing on a clean and classy aesthetic inspired by Notion. The color scheme primarily utilizes slate-800 and gray-400/500 tones for text and accents, with a white background for content areas. Subtle gray wave patterns are implemented in the background of the functionality page to enhance the visual appeal.

## Future Improvements

-   Implement a more sophisticated UI/UX.
-   Add more robust error handling and logging on both the frontend and backend.
-   Allow users to save and manage their generated learning paths.
-   Integrate with other LLM APIs or models for comparison.
-   Add more detailed feedback and control over the learning path generation process.
-   Optimize database interactions and API performance.
-   Implement user roles and permissions if needed.

## Contributing 🚀

Contributions are welcome! Please fork the repository and submit a pull request with your changes, 🤎 [woustachemax](https://woustachemax.github.io/portfolio).
