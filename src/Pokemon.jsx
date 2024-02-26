import React from "react";
import "./app.scss";
import "./types.scss";
import background from ".//assets/background.jpg";

const Pokemon = ({ data }) => {
  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.substring(1);
  };

  return (
    <article className='poke-box'>
      <header className='header-card'>
        <span>Nº{data.id}</span>
        <h1>{capitalizeFirstLetter(data.name)}</h1>
      </header>
      <img
        src={data.sprites.front_default}
        alt=''
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <p>EXP - {data.base_experience}</p>
      <div className='pokemon-types'>
        {data.types.map((item) => (
          <span className={item.type.name}>{item.type.name}</span>
        ))}
      </div>
    </article>
  );
};

export default Pokemon;
