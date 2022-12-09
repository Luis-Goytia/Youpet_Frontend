import React from "react";

export default function PetCard({
  name,
  species
}){
  return (
    <div className="card text-bg-secondary">
      <div className="">
        <h1>{name}</h1>
        {/* <h4>Species: {species}</h4> */}
      </div>
    </div>
  );
}
