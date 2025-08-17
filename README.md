# Planning Poker - A Personal, Non-Profit Project

A simple, open-source, and free tool built to help software development teams estimate work more effectively and enjoyably. This project was created for learning and sharing with the community.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Introduction

Planning Poker is a popular Agile technique used to build consensus on effort estimates for work items. Instead of lengthy discussions, each team member privately selects a "card" representing their estimate. All cards are then revealed simultaneously. This method encourages everyone's participation and helps produce more accurate estimates.

This tool is a **personal, non-profit project** built to provide a fast, intuitive, and free solution for development teams.

---

## 🚀 Tech Stack

This project is built with a modern tech stack focused on performance and real-time user experience:

* **Framework:** **Next.js** - A powerful React framework for building fast and SEO-friendly user interfaces.
* **Database:** **Firebase Realtime Database** - Ensures that all actions (like voting and revealing results) are synchronized instantly across all clients.
* **Deployment:** **Vercel** - The optimal platform for deploying Next.js projects, making deployment and scaling effortless.

---

## 📋 Setup and Installation Guide

If you want to run this project on your local machine, please follow the steps below.

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set Up Environment Variables**
    * Create a new project on the [Firebase Console](https://console.firebase.google.com/).
    * Enable **Realtime Database**.
    * In **Project Settings > General**, register a new web app and copy the `firebaseConfig` object.
    * Create a file named `.env.local` in the root directory of your project.
    * Add your Firebase configuration details to the `.env.local` file as follows:
        ```env
        NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
        NEXT_PUBLIC_FIREBASE_DATABASE_URL="YOUR_DATABASE_URL"
        NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
        NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
        ```

4.  **Run the Application**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    You can now access the application at `http://localhost:3000`.

---

## 📜 License

This project is licensed under the **MIT License**.

This means you are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software. The only requirement is to include the original copyright and license notice in all copies or substantial portions of the software. Please see the `LICENSE` file for more details.
