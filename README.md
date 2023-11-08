# GitHub Repository Mood Analyzer

Welcome to the GitHub Repository Mood Analyzer! This Next.js application, deployed on Vercel, provides a unique service where users can parse GitHub repository links. Upon analysis of the repository data, the application generates a visual image representing the 'mood' of the repository. This tool can be incredibly useful for quickly understanding the general sentiment and activity within a GitHub repository.

## Features

- **Link Parsing:** Input any GitHub repository link for analysis.
- **Mood Analysis:** Our algorithm analyzes various aspects of the repository to determine its mood.
- **Image Generation:** Based on the analysis, an image is generated that visually represents the repository's mood.
- **Responsive Design:** Access the tool from any device, with a layout that adapts to your screen size.

## How It Works

1. **Input a Repository URL:** Start by entering the GitHub repository link you want to analyze.
2. **Analysis:** The application fetches data from the repository, including commit messages, issue discussions, and other metadata.
3. **Mood Determination:** Using sentiment analysis and other heuristic methods, the application assesses the mood of the repository.
4. **Image Generation:** An image representing the mood is dynamically generated and displayed.

## Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)).

You need Runpod and a special Serverless Template from user Satttoshi.
Missing docs here, since there is alot to it and this is WIP. Ask us for help if you want to run this locally.

### Installation

1. Clone the repo
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create .env.local file in root directory
   ```sh
   touch .env.local
   ```
4. Add environment variables as shown in .env.example
5. Run the development server
   ```sh
   npm run dev
   ```
