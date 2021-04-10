import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      title
      body
      author {
        _id
        email
      }
    }
  }
`;

export default function ShowPosts(props) {
  const { loading, error, data, refetch } = useQuery(GET_POSTS);
  const [refetchPosts, setRefetchPosts] = useState(
    props?.location?.state?.refreshPosts
  );

  useEffect(() => {
    console.log("refetchPosts", refetchPosts);
    if (refetchPosts) refetch();
  }, [refetchPosts]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Post Title</th>
            <th>Author Email</th>
          </tr>
        </thead>
        <tbody>
          {data?.getPosts?.map((post, i) => (
            <tr key={i}>
              <td>{post.title}</td>
              <td>{post.author.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        to={{
          pathname: `/posts/add`,
          state: {},
        }}
      >
        Add Post
      </Link>
    </div>
  );
}
