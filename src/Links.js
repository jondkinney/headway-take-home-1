import React from "react";

import { gql, useQuery } from "@apollo/client";

const GET_LINKS = gql`
  query {
    getLinks {
      id
      name
      url
    }
  }
`;

const Links = () => {
  const { loading, error, data } = useQuery(GET_LINKS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <ul>
        {data.getLinks.map((link, index) => (
          <li key={link.id}>
            <a href={link.url}>
              {link.id} - {link.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Links;
