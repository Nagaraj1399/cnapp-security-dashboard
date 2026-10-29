# CNAPP Security Dashboard

> A modern, responsive CNAPP & Cloud Security Dashboard built with React, Zustand, and Tailwind CSS featuring dynamic widget management, custom widget creation, search functionality, and localStorage persistence.

## Live Preview

Try the deployed application in your browser: **[Open the live dashboard](https://cnapp-security-dashboard.vercel.app)**

## Features

- View cloud security widgets grouped by category.
- Add and remove widgets, or customize widget names and descriptions.
- Search the available widgets in the widget manager.
- Persist dashboard changes in the browser's `localStorage` across page refreshes.
- Responsive interface for desktop and mobile screens.

> **Styling note:** The current implementation uses responsive CSS stylesheets (`src/App.css` and `src/index.css`); Tailwind CSS is not currently configured as a project dependency.

## Requirements

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+
- npm (included with Node.js)

## Run locally

1. Clone the repository:

   ```sh
   git clone https://github.com/Nagaraj1399/cnapp-security-dashboard.git
   ```

2. Change into the project directory:

   ```sh
   cd cnapp-security-dashboard
   ```

3. Install the project dependencies:

   ```sh
   npm install
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Open the local URL printed by Vite in your browser. The default is <http://localhost:5173>.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create an optimized production build in `dist/`. |
| `npm run preview` | Preview the production build locally after running `npm run build`. |
| `npm run lint` | Check the source with Oxlint. |

## Persistence

Widget preferences are saved in the current browser's `localStorage` under the `cloudscope-dashboard` key. They are not synced between browsers or devices. Remove that storage entry to reset the dashboard to its default widgets.

## Tech stack

- React
- Vite
- Zustand
- Lucide React
- Responsive CSS
