import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const ADD_POST = gql`
  mutation AddPost($title: String!, $body: String!, $author: String!) {
    addPost(title: $title, body: $body, author: $author) {
      title
      body
      author {
        email
      }
    }
  }
`;

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const [addPost, { data }] = useMutation(ADD_POST);

  const history = useHistory();

  const addPostSubmitHandler = (e) => {
    e.preventDefault();

    addPost({ variables: { title, body, author } });
  };

  if (data?.addPost) {
    history.push({ pathname: "/", state: { refreshPosts: true } });
  }

  return (
    <div>
      <form onSubmit={addPostSubmitHandler}>
        <label>Add Post Title</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Add Post Body</label>
        <input
          type='text'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <label>Add Author</label>
        <input
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type='submit'>Add Post</button>
      </form>
      <Link to='/'>All Posts</Link>
    </div>
  );
}
