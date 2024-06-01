export const login = (name: string, senha: string) => {
  const userLogin = {
    name: name,
    senha: senha,
  };
  window.localStorage.setItem("userLogin", JSON.stringify(userLogin));
  //tenho que fazer .stringify pq os argumentos que o setItem espera são 2 strings :(
  //gostaria que fosse possível fazer um .parse() logo de cara e enviar
};

export const logout = () => {
  window.localStorage.clear();
  console.log('cleared')
  window.location.replace("/login");

};


