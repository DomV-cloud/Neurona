"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://neuronalabsapi-eagqchf9dme0f4bw.westeurope-01.azurewebsites.net/graphql/",
  // local host: https://localhost:7066/graphql
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
