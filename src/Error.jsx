import React from "react";
import "./Error.scss";

const Error = () => {
  return (
    <div className='error-container'>
      <span className='error'>
        Nenhum Pokémon encontrado!<br></br> Clique na logo para voltar.
      </span>
    </div>
  );
};

export default Error;
