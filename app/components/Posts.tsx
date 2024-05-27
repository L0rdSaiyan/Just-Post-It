import { PostsType } from "../types/posts";
import styles from "./Posts.module.css";

export default function Posts({ post }: { post: PostsType }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.topContainer}>
        <span className={styles.authorName}>{`u:${post.authorName}`}</span>
        <span className={styles.titleStyle}>{post.titulo}</span>
        </div>
        <div className={styles.contentContainer}>
            <span>{post.conteudo}</span>
        </div>
      </div>
    </>
  );
}
