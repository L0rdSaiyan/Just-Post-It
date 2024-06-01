import styles from "./Dropdown.module.css"

interface propsType {
    event?: () => void;
    content: string,
    placeholder: string
}

export default function Dropdown({event, content, placeholder} : propsType)
{
    return(
        <>
         <div className={styles.dropdown}>
      <button className={styles.dropbtn}>{placeholder}</button>
      <div className={styles.dropdown_content}>
        <button onClick={event}>{content}</button>
    </div>
        </div>
        </>
    )
}