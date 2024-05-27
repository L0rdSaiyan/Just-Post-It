"use client";
import { useEffect, useState } from "react";
import { UserType } from "../types/user";
import styles from "./home.module.css";
import InputPost from "../form/InputPost";
import Posts from "../components/Posts";
import { handler } from "../axios/axios";
import { PostsType } from "../types/posts";

export default function Home() {
  const [user, setUser] = useState<UserType | null>(null);
  const [posts, setPosts] = useState<PostsType[]>([]);
  const [createdPost, setPostCreated] = useState<boolean>(false);
  useEffect(() => {
    const userData = window.localStorage.getItem("userLogin");
    if (userData) {
      try {
        const parsedUser: UserType = JSON.parse(userData);
        setUser(parsedUser);
        getAllPosts();
      } catch (e) {
        console.error("Ocorreu um erro ao resgatar os dados do usuário", e);
      }
    }
  }, []);

  useEffect(() => {
    console.table(posts);
  }, [posts]);

  useEffect(() => {
    getAllPosts
  }, [createdPost]);

  const getAllPosts = async () => {
    try {
      const response = await handler.get("/getallposts");
      setPosts(response.data.allPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.displayName}>
        {user ? (
          <>
            <p>Bem vindo, {user.name}</p>
          </>
        ) : (
          <p>No user data available</p>
        )}
      </div>
      <div className={styles.createPostContainer}>
        <InputPost handlerAfterPost={getAllPosts} />
      </div>
      <div className={styles.postsContainer}>
        {posts &&
          posts.map((post) => <Posts key={post.authorName} post={post} />)}
          </div>
    </div>
  );
}
