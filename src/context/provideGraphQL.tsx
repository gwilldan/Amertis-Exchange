"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://indexer.hyperindex.xyz/480b8c2/v1/graphql",
	cache: new InMemoryCache(),
});

const ProvideGraphQL = ({ children }: { children: React.ReactNode }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ProvideGraphQL;
