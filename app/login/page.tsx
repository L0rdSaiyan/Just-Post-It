"use client"
import { handler } from "../axios/axios"
import InputPass from "../form/InputPass"
import InputText from "../form/InputText"
import SubmitBtn from "../form/SubmitBtn"

import { UserType } from "../types/user"
import { login } from "../commons/commons"
import styles from "./loginPage.module.css"
import { useEffect, useState } from "react"
import { commonAlert } from "../alerts"
import { useRouter } from "next/navigation" // Correct import for App Router

export default function Login() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleUsernameChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value 
    setUsername(name)
  }

  const handlePasswordChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const pass = event.target.value 
    setPassword(pass)
  }

  const router = useRouter()

  const handleLogin = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await handler.post("/login", { name: username, senha: password })
    const {name, senha} = await response.data
    login(name, senha)
    commonAlert({
      title: "Sucesso!",
      text: `Bem vindo, ${name}`,
      clickChange() {
        router.push('/home')
      },
    })
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
