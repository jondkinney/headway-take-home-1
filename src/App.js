import React from "react";
import "./styles.css";
import Links from "./Links";
import CreateLink from "./CreateLink";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://miimo.sse.codesandbox.io/",
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <CreateLink />
        <Links />
      </div>
    </ApolloProvider>
  );
}
