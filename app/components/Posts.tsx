"use client";
import { useEffect, useState } from "react";
import { PostsType } from "../types/posts";
import styles from "./Posts.module.css";
import { handler } from "../axios/axios";
import { useRouter } from "next/navigation";

export default function Posts({ post }: { post: PostsType }) {
  const router = useRouter();
  const [updated, setUpdated] = useState<boolean>(false);
  const [initialPost, setInitialPost] = useState<PostsType>(post);

  const handleLike = async () => {
    const response = await handler.put("/likeposts", { id: post.id });
    const data = await response.data;
    console.log(data);
    setUpdated(true);
  };

  const handleDislike = async () =>
  {
    const response = await handler.put("/dislikepost", {postId : initialPost.id})
    const data = await response.data 
    console.log(data)
    setUpdated(true)
  }

  const handleClick = async () => {
    router.push(`home/posts?postId=${post.id}`);
  };

  const updatePost = async () => {
    const response = await handler.post("/getpostbyid", { postId: post.id });
    const data = await response.data.postData;
    setInitialPost(data);
  };

  useEffect(() => {
    updatePost();
    setUpdated(false);
  }, [updated]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topContainer} onClick={handleClick}>
          <span
            className={styles.authorName}
          >{`u:${initialPost.authorName}`}</span>
          <span className={styles.titleStyle}>{initialPost.titulo}</span>
        </div>
        <div className={styles.contentContainer} onClick={handleClick}>
          <span>{initialPost.conteudo}</span>
        </div>
        <div className={styles.reactions}>
          <button onClick={handleLike} className={styles.like}>
            {/* <img
              src="https://www.svgrepo.com/show/21106/thumbs-up.svg"
              alt="Like"
            ></img> */}
            
          </button>
          <span>{initialPost.likes}</span>
            
          <button onClick={handleDislike} className={styles.dislike}>
            {/* <img
              src="https://www.svgrepo.com/show/56144/thumb-down.svg"
              alt="Dislike"
            ></img> */}
             
          </button>
          <span>{initialPost.dislikes}</span>
       
        </div>
      </div>
    </>
  );
}
