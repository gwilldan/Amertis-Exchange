"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://indexer.dev.hyperindex.xyz/2f5cbc0/v1/graphql",
    cache: new InMemoryCache(),
});

const ProvideGraphQL = ({ children }: { children: React.ReactNode }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ProvideGraphQL;

