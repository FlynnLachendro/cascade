import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: "/api/graphql",
    }),
    cache: new InMemoryCache(),
  });
}

let apolloClient: ReturnType<typeof createApolloClient> | null = null;

export function getApolloClient() {
  if (!apolloClient || typeof window === "undefined") {
    apolloClient = createApolloClient();
  }
  return apolloClient;
}
