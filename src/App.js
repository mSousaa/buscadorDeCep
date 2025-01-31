import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import "./style.css"
import api from "./services/api"

function App() {

  const [input, setInput] = useState("")
  const [cep, setCep] = useState({})

  async function handleSearch(){
    if(input == ""){
      alert("Digite algum cep")
      return
    }

    try{
      const reponse = await api.get(`${input}/json`)
      setCep(reponse.data)
      setInput("")
    }catch{
      alert("Error ao buscar")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        
        ></input>
        <button className="buttonSearch"><FiSearch size={25} color="FFF"
        onClick={handleSearch}
        ></FiSearch></button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main
        className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )} 
      
    </div>
  );
}

export default App;
