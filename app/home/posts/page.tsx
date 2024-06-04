"use client";
import styles from "./posts.module.css"
import { useEffect, useState } from "react";
import { handler } from "@/app/axios/axios";
import { PostsType } from "@/app/types/posts";
import { UserType } from "@/app/types/user";
import Posts from "@/app/components/Posts";
import { commonAlert } from "@/app/alerts";
import { useRouter } from "next/navigation";
import { commentsType } from "@/app/types/commentaries";
import Comments from "@/app/components/Comments";

interface PostsSearchParams {
    searchParams: {
        postId: string;
    };
}

export default function Post({ searchParams }: PostsSearchParams) {
    const [postData, setPostData] = useState<PostsType | null>(null);
    const [commentText, setCommentText] = useState<string>('')
    const [comments, setComments] = useState<commentsType[]>([]);
    const [user, setUser] = useState<UserType | null>(null);
    const [commentPublished, setCommentPublished] = useState<boolean>(true)
    const router = useRouter()

    const fetchPostData = async () => {
        try {
            const response = await handler.get(`/getpostbyidUrl?postId=${searchParams.postId}`);
            const data : PostsType = await response.data.postData
            setPostData(data);
            console.log(data)
        } catch (error) {
            console.error("Error fetching post data:", error);
        }
    };

    const getAllComments = async () =>
    {
        const response = await handler.get(`/getallcommentsbypostid?postId=${searchParams.postId}`)
        const data = await response.data.comments
        console.log(data)
        setComments(data)
    }


    const handlePostCommentary = async () =>
    {
        try{
            const response = await handler.post("/postcomment",{authorName: user?.name, postId: postData?.id, content : commentText})
            const data = await response.data.comment
            console.log(data)
            setCommentPublished(true)
        }catch(error)
        {
            console.log(error)
        }
    }

   
    const handleCommentChange = (event : React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        setCommentText(event.target.value)
    }

    const handlePostDeleted = async () =>
    {
        commonAlert({
            title:"Post deletado!",
            text: `Post '${postData?.titulo}' deletado`,
            icon: "success",
            clickChange: () => router.push("/home"),
            confirmButton: 'Voltar para a página inicial'
        },)
    }

    useEffect(() => {
        fetchPostData();
    }, [searchParams.postId]);

    useEffect(()=>
    {
        if(commentPublished)
            {
                getAllComments()
                setCommentPublished(false)
            }
    },[])

 
    useEffect(() => {
        const userData = window.localStorage.getItem("userLogin");
        if (userData) {
          try {
            const parsedUser: UserType = JSON.parse(userData);
            setUser(parsedUser);
          } catch (e) {
            console.error("Ocorreu um erro ao resgatar os dados do usuário", e);
          }
        }
      }, []);

    useEffect(()=>
    {
        if(commentPublished){
            getAllComments()
            setCommentPublished(false)
        }
  
    },[commentPublished])
    
    return (
        <div className={styles.container}>
        {postData && (
                <>
                    <Posts onPostDeleted={handlePostDeleted} post={postData} event={false}></Posts>
                    <div className={styles.comments}>
                        <div className={styles.commentaryInputArea}>
                        <textarea onChange={handleCommentChange}></textarea>
                        <button className={styles.send} onClick={handlePostCommentary}>
                        </button>
                        </div>
                          <div className={styles.commentssection}>
                    {comments && (
                comments.map((comment) => (
                    <Comments key={comment.id} comment={comment} onPostDeleted={() =>console.log('em progresso')}></Comments>
                ))
            )}
                    </div>
                    </div>
                  
               </>
            )}
          
               </div>
    );
}
