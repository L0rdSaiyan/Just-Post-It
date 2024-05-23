export const login = (username : string, password : string) =>
{
    const userLogin = {
        username: username,
        password: password
    }
    window.localStorage.setItem("userLogin", JSON.stringify(userLogin))
    //tenho que fazer .stringify pq os argumentos que o setItem espera são 2 strings :(
    //gostaria que fosse possível fazer um .parse() logo de cara e enviar

}