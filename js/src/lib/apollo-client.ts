"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://localhost:7066/graphql",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
