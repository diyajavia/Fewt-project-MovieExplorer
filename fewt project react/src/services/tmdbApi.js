import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const hasApiKey = API_KEY && API_KEY !== "YOUR_API_KEY" && API_KEY.trim() !== "";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: hasApiKey ? API_KEY : ""
  }
});

// ==========================================
// MOCK DATABASE FALLBACK (For offline/static testing)
// ==========================================
const MOCK_MOVIES = [
  {
    id: 299534,
    title: "Avengers: Endgame",
    poster_path: "/or0661bY0BvXgC2ttT3Z6G9pYgA.jpg",
    backdrop_path: "/7RyG74xrbfmP3CMILvXmN61I7DY.jpg",
    overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    release_date: "2019-04-24",
    vote_average: 8.3,
    runtime: 181,
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Sci-Fi" }],
    original_language: "en",
    category: "trending"
  },
  {
    id: 27205,
    title: "Inception",
    poster_path: "/o045pytCYzfun4bsbgz2GI264Z2.jpg",
    backdrop_path: "/8Zcrwwqk6jG75y7Q2ynhCK65UzA.jpg",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the sub-conscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    release_date: "2010-07-15",
    vote_average: 8.4,
    runtime: 148,
    genres: [{ id: 28, name: "Action" }, { id: 878, name: "Sci-Fi" }, { id: 53, name: "Thriller" }],
    original_language: "en",
    category: "popular"
  },
  {
    id: 155,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7K0etW5X8.jpg",
    backdrop_path: "/nMKdUU7JmstwTzsR9tZ7T1LGcEt.jpg",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    release_date: "2008-07-18",
    vote_average: 8.5,
    runtime: 152,
    genres: [{ id: 28, name: "Action" }, { id: 80, name: "Crime" }, { id: 18, name: "Drama" }],
    original_language: "en",
    category: "top_rated"
  },
  {
    id: 157336,
    title: "Interstellar",
    poster_path: "/gEU2QvJWzIF7efg1vlzkVf24Qh0.jpg",
    backdrop_path: "/rAiw12Z6hVfsstNNgqdQ024BuWM.jpg",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    release_date: "2014-11-05",
    vote_average: 8.4,
    runtime: 169,
    genres: [{ id: 12, name: "Adventure" }, { id: 18, name: "Drama" }, { id: 878, name: "Sci-Fi" }],
    original_language: "en",
    category: "trending"
  },
  {
    id: 324857,
    title: "Spider-Man: Into the Spider-Verse",
    poster_path: "/iiIKc422cr28z2NDkEV9W6124P2.jpg",
    backdrop_path: "/7d686qZpaE8rGL56dCuJ0mq9vRx.jpg",
    overview: "Struggling to find his place in the world while juggling school and family, Brooklyn teen Miles Morales is unexpectedly bitten by a radioactive spider and develops superpowers. When the infamous Kingpin constructs a portal to other dimensions, alternate versions of Spider-Man pull Miles into a multi-verse saving quest.",
    release_date: "2018-12-06",
    vote_average: 8.4,
    runtime: 117,
    genres: [{ id: 16, name: "Animation" }, { id: 28, name: "Action" }, { id: 12, name: "Adventure" }],
    original_language: "en",
    category: "popular"
  },
  {
    id: 597,
    title: "Titanic",
    poster_path: "/9Mc8ui6tXM5t699644NDKNSFWbc.jpg",
    backdrop_path: "/6m53t3Z83321r671LwZ1z8eZ76f.jpg",
    overview: "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later, with her granddaughter Lizzie Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh, about her life set in April 10th 1912, on a ship called Titanic, and of her young love Jack Dawson.",
    release_date: "1997-11-18",
    vote_average: 7.9,
    runtime: 194,
    genres: [{ id: 18, name: "Drama" }, { id: 10749, name: "Romance" }],
    original_language: "en",
    category: "top_rated"
  },
  {
    id: 496243,
    title: "Parasite",
    poster_path: "/7IiTT10gV21o26KmVZ6zSD3wVu5.jpg",
    backdrop_path: "/tuZh25GsG26vR5U73Fm57Vsi453.jpg",
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    release_date: "2019-05-30",
    vote_average: 8.5,
    runtime: 132,
    genres: [{ id: 35, name: "Comedy" }, { id: 18, name: "Drama" }, { id: 53, name: "Thriller" }],
    original_language: "ko",
    category: "trending"
  },
  {
    id: 76600,
    title: "Avatar: The Way of Water",
    poster_path: "/t6zl7u2100hn68X1uYv2947iR3n.jpg",
    backdrop_path: "/s16H6tpK2utvwD0125y4a5TTjU7.jpg",
    overview: "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    release_date: "2022-12-14",
    vote_average: 7.6,
    runtime: 192,
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Sci-Fi" }],
    original_language: "en",
    category: "upcoming"
  },
  {
    id: 278,
    title: "The Shawshank Redemption",
    poster_path: "/9cqN0z4U7K65DGCM6A57t66Sq61.jpg",
    backdrop_path: "/z7eej7Tjva24tcG6J5x4DQ4iH4H.jpg",
    overview: "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long years in prison, Dufresne befriends fellow inmate Red and becomes a shaping force in a realistic, yet hope-filled prison community.",
    release_date: "1994-09-23",
    vote_average: 8.7,
    runtime: 142,
    genres: [{ id: 18, name: "Drama" }, { id: 80, name: "Crime" }],
    original_language: "en",
    category: "top_rated"
  },
  {
    id: 680,
    title: "Pulp Fiction",
    poster_path: "/d5iIlvfj604V4uGBnCdsxe1t0d5.jpg",
    backdrop_path: "/sua75n4YvBrSF2CeNxv66jYVft4.jpg",
    overview: "A burger-loving hitman, his philosophical partner, a drug-addled gangster's moll, and a washed-up boxer converge in four tales of violence and redemption.",
    release_date: "1994-09-10",
    vote_average: 8.5,
    runtime: 154,
    genres: [{ id: 53, name: "Thriller" }, { id: 80, name: "Crime" }],
    original_language: "en",
    category: "popular"
  },
  {
    id: 313369,
    title: "La La Land",
    poster_path: "/uC6TTa7XI2HsN2UIzrwI0m1e66r.jpg",
    backdrop_path: "/ggZ425F4l5r4N0vpyk6u06c716f.jpg",
    overview: "Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.",
    release_date: "2016-11-29",
    vote_average: 7.9,
    runtime: 128,
    genres: [{ id: 35, name: "Comedy" }, { id: 18, name: "Drama" }, { id: 10749, name: "Romance" }],
    original_language: "en",
    category: "upcoming"
  },
  {
    id: 634649,
    title: "Spider-Man: No Way Home",
    poster_path: "/1g0dhfevXU6qEfsRL1wbv9g4g9k.jpg",
    backdrop_path: "/iQFcwUg4z7ouuChmkvx7TyBOt5C.jpg",
    overview: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
    release_date: "2021-12-15",
    vote_average: 8.0,
    runtime: 148,
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Sci-Fi" }],
    original_language: "en",
    category: "upcoming"
  }
];

const MOCK_CASTS = {
  299534: [
    { id: 3223, name: "Robert Downey Jr.", character: "Tony Stark / Iron Man", profile_path: "/1Ykb619zYdbscz00Z09B037g7gA.jpg" },
    { id: 7450, name: "Chris Evans", character: "Steve Rogers / Captain America", profile_path: "/bOH7Qv9xA6UgEBXevw1FBhxR6Xk.jpg" },
    { id: 10305, name: "Scarlett Johansson", character: "Natasha Romanoff / Black Widow", profile_path: "/6NsMbJikH7t04qTH35W4I68cHew.jpg" },
    { id: 16828, name: "Chris Hemsworth", character: "Thor Odinson", profile_path: "/jpur3mQA66FS6G1Jlh4tclG2bU7.jpg" }
  ],
  27205: [
    { id: 6193, name: "Leonardo DiCaprio", character: "Dom Cobb", profile_path: "/wo2hJv0UnHwq2bbE0nfs7oR74zo.jpg" },
    { id: 24045, name: "Joseph Gordon-Levitt", character: "Arthur", profile_path: "/dhA6j5b90L4H799lF2Fq6lA6XQe.jpg" },
    { id: 10246, name: "Elliot Page", character: "Ariadne", profile_path: "/9Wz6p3s0w5TfFvx43Q19f8qCmgq.jpg" },
    { id: 2524, name: "Tom Hardy", character: "Eames", profile_path: "/4695L9t73tK9yqf0e7371n47Z8.jpg" }
  ],
  155: [
    { id: 3894, name: "Christian Bale", character: "Bruce Wayne / Batman", profile_path: "/b7fe0w7j7q1t74L63u1Vew325U.jpg" },
    { id: 1810, name: "Heath Ledger", character: "Joker", profile_path: "/6D4sT7901L1QeF1Jk62s3k67L2.jpg" },
    { id: 3895, name: "Michael Caine", character: "Alfred Pennyworth", profile_path: "/kl37901L1QeF1Jk62s3k67L2.jpg" },
    { id: 1812, name: "Gary Oldman", character: "James Gordon", profile_path: "/kl47901L1QeF1Jk62s3k67L2.jpg" }
  ],
  157336: [
    { id: 10297, name: "Matthew McConaughey", character: "Cooper", profile_path: "/laU2L2t710hn68X1uYv2947iR3n.jpg" },
    { id: 1813, name: "Anne Hathaway", character: "Brand", profile_path: "/sw2L2t710hn68X1uYv2947iR3n.jpg" },
    { id: 83002, name: "Jessica Chastain", character: "Murph", profile_path: "/jw2L2t710hn68X1uYv2947iR3n.jpg" }
  ],
  324857: [
    { id: 565500, name: "Shameik Moore", character: "Miles Morales / Spider-Man (voice)", profile_path: "/xM0t7901L1QeF1Jk62s3k67L2.jpg" },
    { id: 124747, name: "Jake Johnson", character: "Peter B. Parker / Spider-Man (voice)", profile_path: "/xM1t7901L1QeF1Jk62s3k67L2.jpg" },
    { id: 1391523, name: "Hailee Steinfeld", character: "Gwen Stacy / Spider-Woman (voice)", profile_path: "/xM2t7901L1QeF1Jk62s3k67L2.jpg" }
  ],
  597: [
    { id: 6193, name: "Leonardo DiCaprio", character: "Jack Dawson", profile_path: "/wo2hJv0UnHwq2bbE0nfs7oR74zo.jpg" },
    { id: 204, name: "Kate Winslet", character: "Rose DeWitt Bukater", profile_path: "/e01L1QeF1Jk62s3k67L2.jpg" },
    { id: 1121, name: "Billy Zane", character: "Caledon 'Cal' Hockley", profile_path: "/e02L1QeF1Jk62s3k67L2.jpg" }
  ],
  496243: [
    { id: 98124, name: "Song Kang-ho", character: "Ki-taek", profile_path: "/k01L1QeF1Jk62s3k67L2.jpg" },
    { id: 1192251, name: "Lee Sun-kyun", character: "Mr. Park", profile_path: "/k02L1QeF1Jk62s3k67L2.jpg" },
    { id: 226348, name: "Cho Yeo-jeong", character: "Mrs. Park", profile_path: "/k03L1QeF1Jk62s3k67L2.jpg" }
  ],
  76600: [
    { id: 65731, name: "Sam Worthington", character: "Jake Sully", profile_path: "/s01L1QeF1Jk62s3k67L2.jpg" },
    { id: 8691, name: "Zoe Saldaña", character: "Neytiri", profile_path: "/s02L1QeF1Jk62s3k67L2.jpg" },
    { id: 10205, name: "Sigourney Weaver", character: "Kiri", profile_path: "/s03L1QeF1Jk62s3k67L2.jpg" }
  ],
  278: [
    { id: 504, name: "Tim Robbins", character: "Andy Dufresne", profile_path: "/t01L1QeF1Jk62s3k67L2.jpg" },
    { id: 192, name: "Morgan Freeman", character: "Ellis Boyd 'Red' Redding", profile_path: "/t02L1QeF1Jk62s3k67L2.jpg" }
  ],
  680: [
    { id: 8891, name: "John Travolta", character: "Vincent Vega", profile_path: "/p01L1QeF1Jk62s3k67L2.jpg" },
    { id: 2231, name: "Samuel L. Jackson", character: "Jules Winnfield", profile_path: "/p02L1QeF1Jk62s3k67L2.jpg" },
    { id: 139, name: "Uma Thurman", character: "Mia Wallace", profile_path: "/p03L1QeF1Jk62s3k67L2.jpg" }
  ],
  313369: [
    { id: 30614, name: "Ryan Gosling", character: "Sebastian", profile_path: "/l01L1QeF1Jk62s3k67L2.jpg" },
    { id: 54693, name: "Emma Stone", character: "Mia", profile_path: "/l02L1QeF1Jk62s3k67L2.jpg" }
  ],
  634649: [
    { id: 1136406, name: "Tom Holland", character: "Peter Parker / Spider-Man", profile_path: "/h01L1QeF1Jk62s3k67L2.jpg" },
    { id: 505710, name: "Zendaya", character: "MJ", profile_path: "/h02L1QeF1Jk62s3k67L2.jpg" },
    { id: 71580, name: "Benedict Cumberbatch", character: "Doctor Strange", profile_path: "/h03L1QeF1Jk62s3k67L2.jpg" }
  ]
};

const MOCK_PEOPLE = {
  3223: {
    id: 3223,
    name: "Robert Downey Jr.",
    biography: "Robert John Downey Jr. is an American actor and producer. His career has been characterized by critical and popular success in his youth, followed by a period of substance abuse and legal difficulties, before a resurgence of commercial success later in his career. In 2008, Downey was named by Time magazine among the 100 most influential people in the world, and from 2012 to 2015, he was listed by Forbes as Hollywood's highest-paid actor. He is globally famous for playing Tony Stark / Iron Man in the Marvel Cinematic Universe.",
    birthday: "1965-04-04",
    place_of_birth: "Manhattan, New York City, New York, USA",
    profile_path: "/1Ykb619zYdbscz00Z09B037g7gA.jpg",
    known_for: [299534]
  },
  6193: {
    id: 6193,
    name: "Leonardo DiCaprio",
    biography: "Leonardo Wilhelm DiCaprio is an American actor and film producer. Known for his work in biopics and period films, he is the recipient of numerous accolades, including an Academy Award, a British Academy Film Award, and three Golden Globe Awards. His films have grossed over $7.2 billion worldwide, and he has placed eight times in annual rankings of the world's highest-paid actors.",
    birthday: "1974-11-11",
    place_of_birth: "Los Angeles, California, USA",
    profile_path: "/wo2hJv0UnHwq2bbE0nfs7oR74zo.jpg",
    known_for: [27205, 597]
  },
  3894: {
    id: 3894,
    name: "Christian Bale",
    biography: "Christian Charles Philip Bale is an English actor. Known for his versatility and physical transformations for his roles, he has been a leading man in films of several genres. He has received various accolades, including an Academy Award and two Golden Globe Awards. Time magazine named him one of the 100 most influential people in the world in 2011.",
    birthday: "1974-01-30",
    place_of_birth: "Haverfordwest, Pembrokeshire, Wales, UK",
    profile_path: "/b7fe0w7j7q1t74L63u1Vew325U.jpg",
    known_for: [155]
  }
};

const MOCK_GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 10749, name: "Romance" }
];

// Helper wrapper to handle API requests with robust fallback
const executeRequest = async (url, axiosCall, mockFallback) => {
  if (hasApiKey) {
    try {
      const response = await axiosCall();
      return response.data;
    } catch (error) {
      console.warn(`TMDB API call to ${url} failed. Falling back to local mock data.`, error.message);
      return mockFallback();
    }
  } else {
    // Artificial delay to simulate real network request
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockFallback();
  }
};

// ==========================================
// API EXPORT METHODS
// ==========================================

export const getTrendingMovies = () => {
  return executeRequest(
    "/trending/movie/day",
    () => api.get("/trending/movie/day"),
    () => ({ results: MOCK_MOVIES })
  );
};

export const getPopularMovies = () => {
  return executeRequest(
    "/movie/popular",
    () => api.get("/movie/popular"),
    () => ({ results: MOCK_MOVIES.filter(m => m.category === "popular" || m.id === 27205 || m.id === 324857) })
  );
};

export const getTopRatedMovies = () => {
  return executeRequest(
    "/movie/top_rated",
    () => api.get("/movie/top_rated"),
    () => ({ results: MOCK_MOVIES.filter(m => m.category === "top_rated" || m.id === 155 || m.id === 278) })
  );
};

export const getUpcomingMovies = () => {
  return executeRequest(
    "/movie/upcoming",
    () => api.get("/movie/upcoming"),
    () => ({ results: MOCK_MOVIES.filter(m => m.category === "upcoming" || m.id === 76600 || m.id === 313369) })
  );
};

export const searchMovies = (query, page = 1) => {
  return executeRequest(
    `/search/movie?query=${query}&page=${page}`,
    () => api.get("/search/movie", { params: { query, page } }),
    () => {
      if (!query || query.trim() === "") return { results: MOCK_MOVIES, total_pages: 1 };
      const lowerQuery = query.toLowerCase();
      const filtered = MOCK_MOVIES.filter(
        (m) =>
          m.title.toLowerCase().includes(lowerQuery) ||
          m.overview.toLowerCase().includes(lowerQuery)
      );
      return { results: filtered, total_pages: 1 };
    }
  );
};

export const getMovieDetails = (movieId) => {
  return executeRequest(
    `/movie/${movieId}`,
    () => api.get(`/movie/${movieId}`),
    () => {
      const movie = MOCK_MOVIES.find((m) => m.id === parseInt(movieId));
      if (!movie) throw new Error("Movie not found");
      return movie;
    }
  );
};

export const getMovieCredits = (movieId) => {
  return executeRequest(
    `/movie/${movieId}/credits`,
    () => api.get(`/movie/${movieId}/credits`),
    () => {
      const id = parseInt(movieId);
      const cast = MOCK_CASTS[id] || [
        { id: 3223, name: "Robert Downey Jr.", character: "Featured Cast", profile_path: "/1Ykb619zYdbscz00Z09B037g7gA.jpg" }
      ];
      return { id, cast };
    }
  );
};

export const getSimilarMovies = (movieId) => {
  return executeRequest(
    `/movie/${movieId}/similar`,
    () => api.get(`/movie/${movieId}/similar`),
    () => {
      const id = parseInt(movieId);
      const currentMovie = MOCK_MOVIES.find((m) => m.id === id);
      const genreIds = currentMovie ? currentMovie.genres.map((g) => g.id) : [];
      const similar = MOCK_MOVIES.filter(
        (m) => m.id !== id && m.genres.some((g) => genreIds.includes(g.id))
      );
      return { results: similar.length > 0 ? similar : MOCK_MOVIES.slice(0, 4) };
    }
  );
};

export const getMovieVideos = (movieId) => {
  return executeRequest(
    `/movie/${movieId}/videos`,
    () => api.get(`/movie/${movieId}/videos`),
    () => {
      // Mock trailers
      const keys = {
        299534: "TcMBFSGVi1c", // Endgame
        27205: "YoHD9XEInc0",  // Inception
        155: "EXeTwQWrcwY",    // Dark Knight
        157336: "zSWdZVtXT7E"  // Interstellar
      };
      const key = keys[parseInt(movieId)] || "dQw4w9WgXcQ"; // Fallback to Rick Astley
      return {
        results: [
          {
            id: `vid_${movieId}`,
            key,
            site: "YouTube",
            type: "Trailer",
            name: "Official Trailer"
          }
        ]
      };
    }
  );
};

export const getGenres = () => {
  return executeRequest(
    "/genre/movie/list",
    () => api.get("/genre/movie/list").then(res => ({ genres: res.data.genres })),
    () => ({ genres: MOCK_GENRES })
  );
};

export const discoverMovies = (filters = {}) => {
  return executeRequest(
    `/discover/movie?filters=${JSON.stringify(filters)}`,
    () => {
      const params = {};
      if (filters.genreId) params.with_genres = filters.genreId;
      if (filters.year) params.primary_release_year = filters.year;
      if (filters.rating) params["vote_average.gte"] = filters.rating;
      if (filters.page) params.page = filters.page;
      return api.get("/discover/movie", { params });
    },
    () => {
      let filtered = [...MOCK_MOVIES];
      if (filters.genreId) {
        filtered = filtered.filter((m) =>
          m.genres.some((g) => g.id === parseInt(filters.genreId))
        );
      }
      if (filters.year) {
        filtered = filtered.filter((m) =>
          m.release_date.startsWith(filters.year.toString())
        );
      }
      if (filters.rating) {
        filtered = filtered.filter((m) => m.vote_average >= parseFloat(filters.rating));
      }
      
      // Sorting
      if (filters.sortBy) {
        if (filters.sortBy === "rating_desc") {
          filtered.sort((a, b) => b.vote_average - a.vote_average);
        } else if (filters.sortBy === "release_desc") {
          filtered.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        } else if (filters.sortBy === "title_asc") {
          filtered.sort((a, b) => a.title.localeCompare(b.title));
        }
      }

      // Pagination
      const page = filters.page ? parseInt(filters.page) : 1;
      const itemsPerPage = 8;
      const totalPages = Math.ceil(filtered.length / itemsPerPage);
      const start = (page - 1) * itemsPerPage;
      const paginated = filtered.slice(start, start + itemsPerPage);

      return {
        results: paginated,
        page,
        total_pages: totalPages || 1,
        total_results: filtered.length
      };
    }
  );
};

export const getPersonDetails = (personId) => {
  return executeRequest(
    `/person/${personId}`,
    () => api.get(`/person/${personId}`),
    () => {
      const person = MOCK_PEOPLE[parseInt(personId)];
      if (!person) {
        return {
          id: parseInt(personId),
          name: "Actor Details",
          biography: "Biography details for this actor are currently not available in the offline cache database.",
          birthday: "N/A",
          place_of_birth: "N/A",
          profile_path: null
        };
      }
      return person;
    }
  );
};

export const getPersonCredits = (personId) => {
  return executeRequest(
    `/person/${personId}/movie_credits`,
    () => api.get(`/person/${personId}/movie_credits`),
    () => {
      const pid = parseInt(personId);
      const person = MOCK_PEOPLE[pid];
      const creditMovies = person
        ? MOCK_MOVIES.filter((m) => person.known_for.includes(m.id))
        : MOCK_MOVIES.slice(0, 2);
      return {
        cast: creditMovies.map((m) => ({
          id: m.id,
          title: m.title,
          character: "Featured Role",
          poster_path: m.poster_path,
          vote_average: m.vote_average
        }))
      };
    }
  );
};

export default api;
