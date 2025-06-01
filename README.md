# Formula 1 Teams & Drivers App

A responsive, full-width React application showcasing Formula 1 teams and drivers. Users can:

* Browse teams and their drivers in a rich, animated interface.
* Mark/unmark favorite teams and drivers.
* Create new custom teams (and on-the-fly drivers).
* View detailed team and driver pages.
* Delete teams (automatically unassigning their drivers).
* See “teamless” drivers at the bottom of the home page.
* Toggle light/dark mode.

Animations are powered by Framer Motion, styling by Tailwind CSS, and client‐side routing by React Router v6. Application state persists in `localStorage`.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Screenshots](#screenshots)
* [Installation](#installation)
* [Folder Structure](#folder-structure)
* [Usage](#usage)
* [Routing & Pages](#routing--pages)
* [Data & Persistence](#data--persistence)
* [Contributing](#contributing)
* [License](#license)

---

## Features

1. **Homepage Carousel**

    * Full-width hero with rotating “Formula 1” slides.
    * Call-to-action buttons: **Explore Teams** and **My Favorites**.

2. **Stats Overview**

    * Displays total teams, total drivers, favorite teams count, favorite drivers count.
    * Animated numbers and icons.

3. **Search & Tabs**

    * Global search bar to filter by team name, country, driver name, or nationality.
    * Two tabs: **Teams** and **Drivers**.
    * Animated transition when switching between tabs.

4. **Teams Grid**

    * Each team card spans full width on small screens, two per row on medium, three per row on large.
    * Gradient background keyed to team colors (e.g., Mercedes teal, Ferrari red).
    * Displays team name, country, number of drivers, and a “View Details →” link.
    * Favorite/unfavorite button (heart icon) toggles team in user’s favorites.
    * On hover: subtle scale and shadow animations, decorative elements animate.

5. **Drivers Grid**

    * Similar grid layout under “Drivers” tab.
    * Each driver card shows name, nationality (with flag icon), car number, and associated team (if any).
    * Favorite/unfavorite driver.
    * “View Profile →” link navigates to driver details.

6. **Team Details Page (`/teams/:id`)**

    * Displays team logo, name, country.
    * List of assigned drivers (clickable to driver detail).
    * Favorite driver toggle per driver.
    * **Delete Team** button: confirms deletion, removes team, and sets each former driver’s `teamId = null`.
    * After deletion, navigates back home.

7. **Driver Details Page (`/drivers/:id`)**

    * Shows driver name, nationality, car number, current team (if any), and their photo/initial badge.
    * Favorite toggle.
    * Ability to reassign driver to an existing team via dropdown (updates both driver and team state).

8. **Create Team Page (`/create-team`)**

    * Form fields: Team name, country dropdown, optional logo URL.
    * Multi-select list of existing drivers (checkboxes).
    * “Add New Driver” subsection: on-the-fly driver creation (name + nationality).
    * Validation: required fields, valid URL check.
    * Submit → adds new team, updates selected drivers’ `teamId`, navigates home.

9. **Favorites Page (`/favorites`)**

    * Two sections: favorite teams and favorite drivers.
    * Renders cards similar to home page but only for items the user has favorited.
    * Unfavorite directly from this page.

10. **Drivers Without a Team**

    * On the home page, under all team cards, a section listing any drivers whose `teamId === null`.
    * Each “teamless” driver rendered as an ID-style card with name, nationality, favorite toggle, and “View Profile →”.

11. **Dark Mode Toggle**

    * User’s preferred theme detected from `localStorage` or system preference.
    * Navbar button toggles light/dark; theme persists between sessions.

12. **Persistence**

    * All app state (teams array, drivers array, favorites, theme) saved to `localStorage`.
    * On reload, state is rehydrated from `localStorage` if available.

---

## Tech Stack

* **React 18**
* **React Router v6**
* **Framer Motion** (animations)
* **Tailwind CSS** (utility-first styling)
* **React Icons** (SVG icons)
* **Vite** (bundler/dev server)
* **UUID** (unique IDs for newly created teams/drivers)

---

## Screenshots

> *Include a few screenshots (or animated GIFs) of the homepage (light/dark), team detail, driver detail, create-team form, etc.*

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/f1-frontend.git
   cd f1-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

    * Vite will open at `http://localhost:5173` by default.

4. **Build for production**

   ```bash
   npm run build
   npm run preview
   ```

---

## Folder Structure

```
f1-frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── logos/
│   │       ├── mercedes.png
│   │       ├── redbull.png
│   │       └── … (other team logos)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── … (shared UI components)
│   ├── data/
│   │   └── defaultData.js         # Pre-populated teams & drivers
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Favorites.jsx
│   │   ├── CreateTeam.jsx
│   │   ├── DriverDetails.jsx
│   │   └── TeamDetail.jsx
│   ├── utils/
│   │   └── storage.js              # loadAppData(), saveAppData(), getInitialTheme()
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                   # Tailwind & custom styles
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md
```

* **`src/assets/logos/`**: Contains local PNG or SVG files for each team’s logo.

* **`src/data/defaultData.js`**: Exports two arrays:

    * `defaultDrivers` (each with `id`, `name`, `nationality`, `teamId`, `number`)
    * `defaultTeams` (each with `id`, `key`, `name`, `country`, `logoUrl`, and `drivers: [ driverIDs ]`)

* **`src/components/`**

    * `Navbar.jsx`: The top navigation bar, including links to Home, Favorites, Create Team, and Theme Toggle.
    * `ThemeToggle.jsx`: Button to switch light/dark mode.

* **`src/pages/`**

    * `Home.jsx`: Full homepage with hero carousel, stats, search/tabs, teams/drivers grid, and “teamless drivers” section.
    * `Favorites.jsx`: Renders favorite teams and drivers in a grid.
    * `CreateTeam.jsx`: Form for creating a new team + on-the-fly driver.
    * `DriverDetails.jsx`: Displays driver info, favorite toggle, and ability to reassign team.
    * `TeamDetail.jsx`: Shows detailed team info, driver list, and delete-team functionality.

* **`src/utils/storage.js`**

    * `loadAppData()`: Reads from `localStorage` (under key `appData`) and returns parsed object.
    * `saveAppData(data)`: Serializes and writes to `localStorage`.
    * `getInitialTheme()`: Checks `localStorage` or system preference to return `'light'` or `'dark'`.

---

## Usage

1. **Browse Teams & Drivers**

    * Home page loads with an animated hero, then stats, then search/tabs.
    * In the **Teams** tab, each team card shows name, country, driver count, and a gradient header.
    * Click the heart icon to favorite/unfavorite. Click “View Details →” to open that team’s detail page.
    * In the **Drivers** tab, each driver card shows name, nationality, number, and current team badge. Favorite drivers from here or click “View Profile →” for driver detail.

2. **Search & Filter**

    * Use the search input at top of tabs to filter both teams and drivers by name, country, or nationality.
    * The grid updates in real time to show matching results.

3. **Team Details (`/teams/:id`)**

    * Displays team logo, name, country, and full driver list.
    * Favorite toggle for each driver.
    * **Delete Team** button removes the team and sets its drivers’ `teamId` to `null`. You’ll be redirected home.
    * After deletion, any drivers formerly on that team appear under “Drivers Without a Team” on the home page.

4. **Driver Details (`/drivers/:id`)**

    * Shows driver name, nationality (flag icon), and car number.
    * Displays a badge for current team (if assigned).
    * Favorite/unfavorite driver button.
    * Dropdown to reassign driver to a different existing team (updates both `drivers` and `teams` state arrays).

5. **Create Team (`/create-team`)**

    * Fill out “Team Name” (required), “Country” (required), and optional “Logo URL”.
    * Under **Assign Existing Drivers**, check boxes next to any driver you wish to add to this new team. On submit, those drivers’ `teamId` is updated.
    * Under **Add a New Driver**, fill in name + nationality → click “Add Driver” to instantly add that driver (no team assigned until you submit team).
    * Click **Create Team** → new team is appended to state, drivers moved as specified, and redirect to home.

6. **Favorites (`/favorites`)**

    * Shows two sub-sections: favorite teams and favorite drivers.
    * Cards mimic the same look as on the home page.
    * Click heart icons here to unfavorite.

7. **Dark Mode**

    * Toggle button in navbar switches between light/dark.
    * Preference stored in `localStorage` under `appData.theme`.
    * Tailwind’s `dark:` variants automatically style backgrounds/text.

8. **Drivers Without a Team**

    * On the home page (below the two-grid), any driver whose `teamId === null` is displayed in an “ID Card” style.
    * Each card shows initials avatar, name, nationality, favorite toggle, and “View Profile →” link.

---

## Routing & Pages

| Route          | Component             | Description                                        |
| -------------- | --------------------- | -------------------------------------------------- |
| `/`            | **Home.jsx**          | Hero + stats + search/tabs + teams & drivers grid. |
| `/favorites`   | **Favorites.jsx**     | Displays favorite teams & drivers.                 |
| `/create-team` | **CreateTeam.jsx**    | Form to create new team & on-the-fly driver.       |
| `/drivers/:id` | **DriverDetails.jsx** | Driver profile, favorite, reassign team.           |
| `/teams/:id`   | **TeamDetail.jsx**    | Team detail, driver list, delete-team.             |

---

## Data & Persistence

* **`src/data/defaultData.js`**
  Contains two exports:

  ```js
  export const defaultDrivers = [ /* … driver objects … */ ]
  export const defaultTeams   = [ /* … team objects … */ ]
  ```

  Each driver has:

    * `id`: UUID string
    * `name`: string
    * `nationality`: string
    * `teamId`: matches a team’s `id` (or `null` if “teamless”)
    * `number`: car number (optional, but included for defaults).

  Each team has:

    * `id`: UUID string
    * `key`: short key (e.g. `"mercedes"`, `"ferrari"`) used to match `teamColors` and for logo imports.
    * `name`: string
    * `country`: string
    * `logoUrl`: imported image (e.g. `import ferrariLogo from '@/assets/logos/ferrari.png'`)
    * `drivers`: array of driver `id`s assigned to that team.

* **`src/utils/storage.js`**

  ```js
  export function loadAppData() {
    try {
      const raw = localStorage.getItem('appData')
      return raw ? JSON.parse(raw) : nulls
    } catch {
      return null
    }
  }

  export function saveAppData(data) {
    try {
      localStorage.setItem('appData', JSON.stringify(data))
    } catch {}
  }

  export function getInitialTheme() {
    const saved = loadAppData()?.theme
    if (saved === 'light' || saved === 'dark') return saved
    // else check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  ```
