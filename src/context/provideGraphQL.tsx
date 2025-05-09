"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://indexer.hyperindex.xyz/1a85f30/v1/graphql",
    cache: new InMemoryCache(),
});

const ProvideGraphQL = ({ children }: { children: React.ReactNode }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ProvideGraphQL;

