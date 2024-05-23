"use client"
import styles from "./inputText.module.css"
interface Props {
    placeholder : string,
    value ?: any
    changeEvent? : (e : React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputText({placeholder, value, changeEvent} : Props)
{
    return(
        <>
            <input type="text" className={styles.input} onChange={changeEvent} value={value} placeholder={placeholder}></input>
        </>
    )
}