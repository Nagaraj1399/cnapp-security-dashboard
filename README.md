# Cloudscope Dashboard

A responsive cloud security dashboard built with React and Vite. View security widgets by category, choose which widgets appear, and create or customize widgets for your workflow.

## Features

- Dashboard widgets organized into security categories.
- Add and remove widgets, or edit custom widget names and descriptions.
- Persist dashboard changes in the browser's `localStorage` across page refreshes.
- Responsive layout for desktop and mobile screens.

Widget preferences are stored locally in the current browser under the `cloudscope-dashboard` key. They are not synced between browsers or devices. Clear that local-storage entry to restore the default dashboard.

## Requirements

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+
- npm (included with Node.js)

## Run locally

1. Clone the repository and enter the project directory:

   ```sh
   git clone https://github.com/<your-github-username>/<your-repository>.git
   cd <your-repository>
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

   Open the local URL printed by Vite (by default, <http://localhost:5173>).

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create an optimized production build in `dist/`. |
| `npm run preview` | Preview the production build locally after running `npm run build`. |
| `npm run lint` | Check the source with Oxlint. |

## Tech stack

- React
- Vite
- Zustand
- Lucide React
