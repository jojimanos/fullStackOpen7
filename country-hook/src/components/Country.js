const Country = ({ data }) => {

  if (data.country === null && data.found === false) {
    return null
  } else if (data.found === false) {
    return (
      <div>
        not found...
      </div>
    )
  }
   return (
     <div>
       <h3>{data.country.data.name.common} </h3>
       <div>capital {data.country.data.capital} </div>
       <div>population {data.country.data.population}</div>
       <img src={data.country.data.flags.png} height='100' alt={`flag of ${data.country.data.name}`} />
     </div> 
   )
}

export default Country