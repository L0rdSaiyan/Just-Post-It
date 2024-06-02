import styles from "./Dropdown.module.css"

interface propsType {
    event?: () => void
    event2?: () => void
    content: string
    content2?: string
    placeholder: string
}

export default function Dropdown({event, event2, content, content2, placeholder} : propsType)
{
    return(
        <>
         <div className={styles.dropdown}>
      <button className={styles.dropbtn}>{placeholder}</button>
      <div className={styles.dropdown_content}>
        <button onClick={event}>{content}</button>
        {content2 &&
        (
            <button onClick={event2}>{content2}</button>
        )}

    </div>
        </div>
        </>
    )
}