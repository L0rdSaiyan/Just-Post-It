"use client";
import { UserType } from "../types/user";
import { useState, useEffect } from "react";
import SubmitBtn from "./SubmitBtn";
import { handler } from "../axios/axios";

export default function InputPost() {

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [user, setUser] =useState<string>('')

  useEffect(()=>
  {
    const userData = window.localStorage.getItem("userLogin");
    if(userData)
      {
        try{
          const parsedUser : UserType = JSON.parse(userData)
          setUser(parsedUser.name)
        }
        catch(error)
        {
          console.log("Erro ao obeter informação do usuário!")
        }
      }

  },[])

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setContent(value);
  };

  const handlePostCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.table({title,content,user})
    const response = await handler.post("/postcreation",{title,content,user})
    const data = await response.data 
    console.log(data)
  };

  return (
    <>
      <form onSubmit={handlePostCreate}>
        <input
          type="text"
          placeholder="Titulo do post"
          onChange={handleTitleChange}
          name="titulo"
          value={title}
        />
        <textarea
          placeholder="Conteúdo"
          onChange={handleContentChange}
          value={content}
        />

        <SubmitBtn text="Postar!"></SubmitBtn>
      </form>
    </>
  );
}
