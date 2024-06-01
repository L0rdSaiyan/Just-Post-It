"use client";
import styles from "./posts.module.css"
import { useEffect, useState } from "react";
import { handler } from "@/app/axios/axios";
import { PostsType } from "@/app/types/posts";
import Posts from "@/app/components/Posts";
interface PostsSearchParams {
    searchParams: {
        postId: string;
    };
}

export default function Post({ searchParams }: PostsSearchParams) {
    const [postData, setPostData] = useState<PostsType | null>(null);

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

    useEffect(() => {
        fetchPostData();
    }, [searchParams.postId]);

    return (
        <>
            {postData && (
                <div className={styles.container}>
                    <Posts post={postData}></Posts>
                </div>
            )}
        </>
    );
}
