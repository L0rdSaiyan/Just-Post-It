import styles from "./InputPass.module.css"
interface Props {
    placeholder : string,
    value?: any,
    changeEvent?: (e : React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputPass({placeholder, changeEvent, value} : Props)
{
    return(
        <>
            <input className={styles.input} type="password" onChange={changeEvent} value={value} placeholder={placeholder}></input>
        </>
    )
}