"use client";
import { useEffect, useState } from "react";
import { PostsType } from "../types/posts";
import styles from "./Posts.module.css";
import { handler } from "../axios/axios";
import { useRouter } from "next/navigation";
import { UserType } from "../types/user";
import Dropdown from "./Dropdown";

export default function Posts({
  post,
  event,
  onPostDeleted, // Função de retorno de chamada para notificar sobre a exclusão de um post
}: {
  post: PostsType;
  event?: boolean;
  onPostDeleted: () => void; // Definição do tipo da função de retorno de chamada
}) {


  
  const router = useRouter();
  const [updated, setUpdated] = useState<boolean>(false);
  const [initialPost, setInitialPost] = useState<PostsType>(post);
  const [userAuthor, setUserAuthor] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [postDeleted, setPostDeleted] = useState<boolean>(false)

  const handleLike = async () => {
    const response = await handler.put("/likeposts", { id: post.id });
    const data = await response.data;
    console.log(data);
    setUpdated(true);
  };

  const handleDislike = async () => {
    try{
      const response = await handler.put("/dislikepost", {
        postId: initialPost.id,
      });
      const data = await response.data;
      console.log(data);
      setUpdated(true);
    }catch(error)
    {
      console.log(error)
    }
    
  };

  const handleDelete = async () => {
    try {
      const response = await handler.delete("/deletepost", { data: { postId: post.id } });
      onPostDeleted(); //Aqui eu tô chamando uma function que vem do componente pai e que é executada nele (não sabia que isso era possível KKKKKKKKKKK)
    } catch (error) {
      console.error("Erro ao excluir post:", error);
    }
  };

  const handleClick = async () => {
    if (event) {
      router.push(`home/posts?postId=${post.id}`);
    } else {
      return;
    }
  };

  const updatePost = async () => {
    try{
      const response = await handler.post("/getpostbyid", { postId: post.id });
      const data = await response.data.postData;
      setInitialPost(data);
    }catch(error)
    {
      console.log(error)
    }
    
  };

  const validateUserActions = () => {
    const userData = window.localStorage.getItem("userLogin");
    if (userData) {
      const parsedUser: UserType = JSON.parse(userData);
      console.log(parsedUser);
      setUser(parsedUser);
      if (user && user.name === initialPost.authorName) {
        setUserAuthor(true);
      }
    }
  };

  useEffect(() => {
    validateUserActions();
  }, [initialPost]);

  useEffect(() => {
    setUpdated(false);
    updatePost()
  }, [updated]);

  useEffect(()=>
  {
    updatePost()
    setPostDeleted(false)

  },[postDeleted])

  return (
    <>
    {initialPost && (
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <span
            className={styles.authorName}
          >{`u:${initialPost.authorName}`}</span>
          <span className={styles.titleStyle} onClick={handleClick}>{initialPost.titulo}</span>
          {userAuthor && (
            <div className={styles.options}>
              <Dropdown event={handleDelete} placeholder="..." content="Deletar"></Dropdown>
            </div>
          )}
        </div>
        <div className={styles.contentContainer} onClick={handleClick}>
          <span>{initialPost.conteudo}</span>
        </div>
        <div className={styles.reactions}>
          <button onClick={handleLike} className={styles.like}></button>
          <span>{initialPost.likes}</span>
          <button onClick={handleDislike} className={styles.dislike}></button>
          <span>{initialPost.dislikes}</span>
        </div>
      </div>
      )}
    </>
  );
}
