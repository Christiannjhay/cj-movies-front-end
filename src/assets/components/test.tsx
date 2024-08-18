const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String
    overview: String
    release_date: String
    genres: [Genre]
    production_countries: [Country]
  }

  type Genre {
    id: ID!
    name: String
  }

  type Country {
    iso_3166_1: String
    name: String
  }

  type Query {
    popularMovies: [Movie]
  }
`;

const resolvers = {
  Query: {
    popularMovies: async () => {
      try {
        const popularMovies = await fetchPopularMovies();
        const movieDetailsPromises = popularMovies.map((movie :{ id: number})  => fetchMovieDetails(movie.id));
        const allMovieDetails = await Promise.all(movieDetailsPromises);
        return allMovieDetails;
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    }
  }
};

const fetchPopularMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer YOUR_API_KEY'
    }
  };

  try {
    const response = await axios(url, options);
    return response.data.results; 
  } catch (error) {
    console.error('Error fetching popular movies:', error);
  }
};

const fetchMovieDetails = async (movieId: number) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer YOUR_API_KEY'
    }
  };

  try {
    const response = await axios(url, options);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
  }
};

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
