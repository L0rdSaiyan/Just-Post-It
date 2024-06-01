import styles from "./Dropdown.module.css"

interface propsType {
    event: () => void;
    content: string
}

export default function Dropdown({event, content} : propsType)
{
    return(
        <>
         <div className={styles.dropdown}>
      <button className={styles.dropbtn}>Opções</button>
      <div className={styles.dropdown_content}>
        <button onClick={event}>{content}</button>
    </div>
        </div>
        </>
    )
}