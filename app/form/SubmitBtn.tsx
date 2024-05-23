interface Props
{
    text?: string
}
export default function SubmitBtn({text} : Props)
{
    return(
        <>
            <input type="submit" value={text}></input>
        </>
    )
}