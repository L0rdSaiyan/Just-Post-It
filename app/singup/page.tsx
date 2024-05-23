"use client";
import { useState } from "react";
import InputText from "../form/InputText";
import styles from "./SingUpPage.module.css";
import InputPass from "../form/InputPass";
import SubmitBtn from "../form/SubmitBtn";
import { useRouter } from "next/navigation";
import { handler } from "../axios/axios";
import { commonAlert } from "../alerts";
import { login } from "../commons/commons";
export default function Login() {
  const [nome, setNome] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [samePass, setSamePass] = useState<boolean>(false);

  const router = useRouter();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSenha = event.target.value;
    setSenha(newSenha);
    handleConfirmPass(newSenha, confirm);
  };

  const handleConfirmPassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPass = event.target.value;
    setConfirm(confirmPass);
    handleConfirmPass(senha, confirmPass);
  };

  const handleConfirmPass = (FirstPass: string, SecondPass: string) => {
    if (
      FirstPass !== SecondPass ||
      FirstPass === "" ||
      SecondPass === ""
    ) {
      setSamePass(false);
      return false;
    } else {
      setSamePass(true);
      return true;
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const passConfirmed = handleConfirmPass(senha, confirm);
      if (nome) {
        if (passConfirmed) {
          const response = await handler.post("/usercreation", { nome, senha });
          const data = response.data;
          console.log(data);
          login(nome,senha)
          commonAlert({
            text: "Cadastro realizado com sucesso!",
            title: `Bem vindo, ${nome}`,
          });
          setTimeout(() => {
            router.push("/home");
          }, 1000);
        } else {
          commonAlert({
            text: "As senhas não conferem!",
            title: "Por favor, corrija as senhas e tente novamente",
            confirmButton: "Ok",
          });
        }
      } else {
        commonAlert({
          text: "Preencha o campo de usuário",
          title: "ERROR",
          icon: "error",
          confirmButton: "Ok",
        });
      }
    } catch (error) {
      console.error(`Ocorreu um erro: ${error}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.title}>
          <h1>SING UP</h1>
        </div>
        <form onSubmit={handleSignUp} className={styles.form}>
          <InputText
            changeEvent={handleNameChange}
            value={nome}
            placeholder="Crie seu Nome de Usuário"
          />
          <InputPass
            changeEvent={handlePassChange}
            value={senha}
            placeholder="Crie uma senha"
          />
          <InputPass
            changeEvent={handleConfirmPassChange}
            value={confirm}
            placeholder="Confirme sua senha"
          />
          {samePass ? (
            <></>
          ) : (
            <>
              <span>As senhas não conferem!</span>
            </>
          )}
          <SubmitBtn text="Cadastrar" />
        </form>
      </div>
    </div>
  );
}
