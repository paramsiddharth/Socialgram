import React from "react";
import Adds from "./Adds";
import SideNav from "./SideNav";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ReactEmoji from "react-emoji";
import Heart from "../../assets/heart.png";
import ThumbsUp from "../../assets/thumb-up.png";
import ThumbsDown from "../../assets/thumb-down.png";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const LINK = process.env.REACT_APP_HEROKU_LINK;

  useEffect(() => {
    const getMyPost = () => {
      const id = localStorage.getItem("SocialGramUserId");
      axios
        .get(`${LINK}myposts/${id}`)
        .then((response) => {
          //   console.log(response.data);
          setPosts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getMyPost();
  }, [LINK]);
  return (
    <React.Fragment>
      <div className="row">
        <SideNav />
        <div className="col-sm-6">
          <h1>My Post</h1>
          <hr />
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
        <Adds />
      </div>
    </React.Fragment>
  );
};

export default MyPosts;

const Post = ({ post }) => {
  return (
    <div
      key={post.id}
      style={{ borderRadius: "0.25rem" }}
      className="container bg-dark mt-3 mb-3 p-3"
    >
      <h3 className="mb-3">{ReactEmoji.emojify(post.title)}</h3>
      <div className="icon-container">
        <p>{post.likes}</p>
        <img height="15px" src={ThumbsUp} alt="" />
        <p>{post.dislikes}</p>
        <img height="15px" src={ThumbsDown} alt="" />
        <p>{post.hearts}</p>
        <img height="15px" src={Heart} alt="" />
      </div>
      <div className="input-group mb-3 mt-3">
        <input type="text" className="form-control" placeholder="comment" />
      </div>
      <div className="button-container text-center mt-3 mb-3">
        <button style={{ width: "100%" }} className="btn btn-primary">
          Add Comment
        </button>
      </div>
      {post.comments.map((comment) => (
        <div
          key={comment.id}
          className="container p-3 mb-2"
          style={{ borderRadius: "0.25rem" }}
        >
          {ReactEmoji.emojify(comment.comments)}
        </div>
      ))}
    </div>
  );
};
