const movies = [
    {
        name: "Iron Man",
        year: 2008,
        runtime: "2:06",
        rating: 7.9
    },
    {
        name: "The Incredible Hulk",
        year: 2008,
        runtime: "1:52",
        rating: 6.6
    },
    {
        name: "Iron Man 2",
        year: 2010,
        runtime: "2:04",
        rating: 6.9
    },
    {
        name: "Thor",
        year: 2011,
        runtime: "1:55",
        rating: 7.0
    },
    {
        name: "Captain America: The First Avenger",
        year: 2011,
        runtime: "2:04",
        rating: 6.9
    },
    {
        name: "The Avengers",
        year: 2012,
        runtime: "2:23",
        rating: 8.0
    },
    {
        name: "Iron Man 3",
        year: 2013,
        runtime: "2:10",
        rating: 7.1
    },
    {
        name: "Captain America: The Winter Soldier",
        year: 2014,
        runtime: "2:16",
        rating: 7.7
    },
    {
        name: "Guardians of the Galaxy",
        year: 2014,
        runtime: "2:01",
        rating: 8.0
    },
    {
        name: "Avengers: Age of Ultron",
        year: 2015,
        runtime: "2:21",
        rating: 7.3
    },
    {
        name: "Ant-Man",
        year: 2015,
        runtime: "1:57",
        rating: 7.2
    },
    {
        name: "Captain America: Civil War",
        year: 2016,
        runtime: "2:27",
        rating: 7.8
    },
    {
        name: "Doctor Strange",
        year: 2016,
        runtime: "1:55",
        rating: 7.5
    },
    {
        name: "Spider-Man: Homecoming",
        year: 2017,
        runtime: "2:13",
        rating: 7.4
    },
    {
        name: "Black Panther",
        year: 2017,
        runtime: "2:14",
        rating: 7.3
    },
];

// List out all of the movies by movie name, year, runtime, and rating. Runtime and rating are padded to appear neatly on the left side in console
movies.forEach(({ name, year, runtime, rating }) => {
    console.log(`${`${name} (${year})`.padEnd(45)} Runtime: ${runtime.padEnd(5)}\tRating: ${rating.toFixed(1)}`);
});

// Return only the movies that are rated a 7.5 and above
const highRated = movies.filter(movie => movie.rating >= 7.5);

// Return only the movies that were made in 2015 and sooner
const recentMovies = movies.filter(movie => movie.year >= 2015);

// An array of only the names of the movies
const movieNames = movies.map(({ name }) => name);

// An array of strings that contain the movie name and rating
const strings = movies.map(
    ({ name, rating }) => `${name} has a rating of ${rating}`
);

let totalRating = 0;
let highest = movies[0];

// Find average rating
movies.forEach(movie => {
    totalRating += movie.rating;

    if (movie.rating > highest.rating)
        highest = movie;
});

// Create object with info about the movie object array
const report = {
    numMovies: movies.length,
    numRecent: recentMovies.length,
    averageRating: totalRating / movies.length,
    highestRatedMovie: highest.name,
    highestRating: highest.rating,
};

console.log(`Highly rated movies (>=7.5): ${report.highRatedCount}`);
console.log(`Recent movies (2015+): ${report.recentCount}`);

console.log("\nList of movie names", movieNames);
console.log("\nAs string of movie and rating", strings);

console.log(`\nThere are ${report.numMovies} movies`);
console.log(`The average rating is ${report.averageRating.toFixed(2)}`);
console.log(`The highest rated movie is ${report.highestRatedMovie} at ${report.highestRating}`);