"use client"
import { handler } from "../axios/axios"
import InputPass from "../form/InputPass"
import InputText from "../form/InputText"
import SubmitBtn from "../form/SubmitBtn"
import styles from "./loginPage.module.css"
import { useState } from "react"
export default function Login()
{

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleUsernameChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
      const name = event.target.value 
      setUsername(name)
    }

    const handlePasswordChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
      const pass = event.target.value 
      setPassword(pass)
    }

    const handleLogin = async (event : React.FormEvent<HTMLFormElement>) =>
    {
      event.preventDefault()
      const response = await handler.post("/login", { name: username, senha: password })
      const data = await response.data
      console.log(data)

    }

    return(
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.title}>
          <h1>Login</h1>
        </div>
        <form onSubmit={handleLogin} className={styles.form}>
          <InputText
            changeEvent={handleUsernameChange}
            value={username}
            placeholder="Crie seu Nome de Usuário"
          />
          <InputPass
            changeEvent={handlePasswordChange}
            value={password}
            placeholder="Crie uma senha"
          />
          <SubmitBtn text="Entrar" />
        </form>
      </div>
    </div>
    )
}