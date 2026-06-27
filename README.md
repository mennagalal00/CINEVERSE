# CineVerse

A modern movie discovery web app built with React 19 and Vite, powered by the TMDB API. Browse trending, popular, top-rated, upcoming, and now-playing movies — search with filters, watch trailers, save favorites, and manage your watchlist.



##  Project Structure


CineVerse_enhanced/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                  # Static images & SVGs
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx       # Redirects unauthenticated users
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx           # Root layout wrapper
│   │   │   ├── Navbar.jsx               # Top navigation bar
│   │   │   └── Footer.jsx               # Page footer
│   │   ├── movies/
│   │   │   ├── HeroBanner.jsx           # Featured movie hero section
│   │   │   ├── MovieCard.jsx            # Individual movie card
│   │   │   └── MovieCarousel.jsx        # Horizontal scrollable carousel
│   │   ├── search/
│   │   │   └── SearchBar.jsx            # Search with genre/year/rating/language filters
│   │   └── ui/
│   │       ├── Badge.jsx                # Genre/label badge
│   │       ├── EmptyState.jsx           # Empty list fallback UI
│   │       ├── LoginRequiredModal.jsx   # Auth prompt modal
│   │       ├── Modal.jsx                # Generic modal wrapper
│   │       ├── SkeletonCard.jsx         # Loading skeleton placeholder
│   │       ├── StarRating.jsx           # Star rating display
│   │       └── TrailerModal.jsx         # YouTube trailer embed modal
│   ├── context/
│   │   └── AuthContext.jsx              # Auth state (login/logout via localStorage)
│   ├── hooks/
│   │   ├── useDebounce.js               # Debounce input hook
│   │   ├── useGenres.js                 # Fetch and cache movie genres
│   │   ├── useInfiniteScroll.js         # IntersectionObserver-based infinite scroll
│   │   └── useMovieDetails.js           # Fetch full movie details hook
│   ├── lib/
│   │   ├── api.js                       # TMDB API calls (axios)
│   │   ├── axiosInstance.js             # Axios base config
│   │   ├── constants.js                 # API key & base URL
│   │   └── localStorage.js             # Helpers for recently viewed
│   ├── pages/
│   │   ├── Home.jsx                     # Main page with categories & search
│   │   ├── MovieDetails.jsx             # Full movie detail page
│   │   ├── Favorites.jsx                # Saved favorites list
│   │   ├── Watchlist.jsx                # Watchlist page
│   │   ├── Profile.jsx                  # User profile page
│   │   ├── Login.jsx                    # Login page
│   │   └── NotFound.jsx                 # 404 page
│   ├── redux/
│   │   ├── store.js                     # Redux store config
│   │   ├── favoritesSlice.js            # Favorites state & persistence
│   │   ├── watchlistSlice.js            # Watchlist state & persistence
│   │   └── moviesSlice.js               # Movies fetch state
│   ├── styles/
│   │   └── globals.css                  # Global styles & Tailwind base
│   ├── App.jsx                          # Router setup
│   └── main.jsx                         # App entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── package.json
```

---

## Features

- **Advanced Search** — search by title with filters for genre, release year, rating, and language
- **Movie Categories** — Trending, Popular, Top Rated, Coming Soon, Now Playing
- **Movie Details** — full info with cast, trailer, similar movies, and images
- **Favorites** — add/remove movies, persisted in localStorage via Redux
- **Watchlist** — save movies to watch later, also persisted
- **Recently Viewed** — tracks last visited movie pages
- **Auth System** — email-based login with protected routes
- **Infinite Scroll** — auto-load more movies using IntersectionObserver
- **Skeleton Loading** — smooth placeholder UI while fetching
- **Trailer Modal** — embedded YouTube trailers

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 3 |
| State Management | Redux Toolkit + React Redux |
| Routing | React Router DOM v7 |
| HTTP Client | Axios |
| Animations | Framer Motion |
| Icons | React Icons |
| Notifications | React Toastify |
| Infinite Scroll | React Intersection Observer |
| API | TMDB (The Movie Database) |

---







```

## Install dependencies


npm install


## Run the dev serve
npm run dev