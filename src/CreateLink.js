import React from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_LINK = gql`
  mutation createLink($name: String!, $url: String!) {
    createLink(name: $name, url: $url) {
      id
      name
      url
    }
  }
`;

// const GET_LINKS = gql`
//   query {
//     getLinks {
//       id
//       name
//       url
//     }
//   }
// `;

const CreateLink = () => {
  // const [createLink] = useMutation(CREATE_LINK, {
  //   refetchQueries: [
  //     { query: GET_LINKS }
  //   ]
  // });

  const [createLink] = useMutation(CREATE_LINK, {
    update(cache, { data: { createLink } }) {
      // We use an update function here to write the new value of the GET_LINKS query.
      cache.modify({
        fields: {
          getLinks(existingLinks = []) {
            const newLinkRef = cache.writeFragment({
              data: createLink,
              fragment: gql`
                fragment NewLink on Link {
                  id
                  name
                  url
                }
              `
            });
            return [...existingLinks, newLinkRef];
          }
        }
      });
    }
  });

  let nameInput;
  let urlInput;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createLink({
          variables: { name: nameInput.value, url: urlInput.value }
        });
        nameInput.value = "";
        urlInput.value = "";
      }}
    >
      <input
        ref={(node) => {
          nameInput = node;
        }}
        placeholder="Name (optional)"
      />
      <input
        ref={(node) => {
          urlInput = node;
        }}
        placeholder="URL"
      />
      <button type="submit">Shorten URL</button>
    </form>
  );
};

export default CreateLink;
