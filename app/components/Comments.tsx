"use client";
import { use, useEffect, useState } from "react";
import { PostsType } from "../types/posts";
import styles from "./Comments.module.css";
import { handler } from "../axios/axios";
import { useRouter } from "next/navigation";
import { UserType } from "../types/user";
import Dropdown from "./Dropdown";
import { commentsType } from "../types/commentaries";

export default function Comments({
  comment,
  event,
  onPostDeleted, // Função de retorno de chamada para notificar sobre a exclusão de um post
}: {
  comment: commentsType;
  event?: boolean;
  onPostDeleted: () => void; // Definição do tipo da função de retorno de chamada
}) {


  
  const router = useRouter();
  const [updated, setUpdated] = useState<boolean>(false);
  const [initialComment, setInitialComment] = useState<commentsType>(comment);
  const [userAuthor, setUserAuthor] = useState<boolean>();
  const [user, setUser] = useState<UserType | null>(null);
  const [postDeleted, setPostDeleted] = useState<boolean>(false)

  const handleLike = async () => {
    // const response = await handler.put("/likeposts", { id: post.id });
    // const data = await response.data;
    // console.log(data);
    // setUpdated(true);
  };

  const handleDislike = async () => {
    // try{
    //   const response = await handler.put("/dislikepost", {
    //     postId: initialPost.id,
    //   });
    //   const data = await response.data;
    //   console.log(data);
    //   setUpdated(true);
    // }catch(error)
    // {
    //   console.log(error)
    // }
    
  };

  const handleDelete = async () => {
    // try {
    //   const response = await handler.delete("/deletepost", { data: { postId: post.id } });
    //   onPostDeleted(); //Aqui eu tô chamando uma function que vem do componente pai e que é executada nele (não sabia que isso era possível KKKKKKKKKKK)
    // } catch (error) {
    //   console.error("Erro ao excluir post:", error);
    // }
  };

  const handleClick = async () => {
    // if (event) {
    //   router.push(`home/posts?postId=${post.id}`);
    // } else {
    //   return;
    // }
  };

  const updatePost = async () => {
    // try{
    //   const response = await handler.post("/getpostbyid", { postId: post.id });
    //   const data = await response.data.postData;
    //   setInitialPost(data);
    // }catch(error)
    // {
    //   console.log(error)
    // }
    
  };

  const validateUserActions = () => {
    const userData = window.localStorage.getItem("userLogin");
    if (userData) {
      const parsedUser: UserType = JSON.parse(userData);
      console.log(parsedUser);
      setUser(parsedUser);
      console.log(user)
      if (parsedUser.name === initialComment.authorName) {
        setUserAuthor(true);
      }
    }
  };

 

  useEffect(() => {
    validateUserActions();
  }, [initialComment]);

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
    {initialComment && (
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <span
            className={styles.authorName}
          >{`u:${initialComment.authorName}`}</span>
          {userAuthor && (
            <div className={styles.options}>
              <Dropdown event={handleDelete} placeholder="..." content="Deletar"></Dropdown>
            </div>
          )}
        </div>
        <div className={styles.contentContainer} onClick={handleClick}>
          <span>{initialComment.content}</span>
        </div>
        <div className={styles.reactions}>
          <button onClick={handleLike} className={styles.like}></button>
          {/* <span>{initialPost.likes}</span> */}
          <button onClick={handleDislike} className={styles.dislike}></button>
          {/* <span>{initialPost.dislikes}</span> */}
          <div className={styles.comments}>
            <button onClick={handleClick} className={styles.commentarySection}></button>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
