import { useEffect, useState } from "react";
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [found, setFound] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        );
        setCountry(response);
        setFound(true);
        console.log(response)
      } catch (error) {
        setCountry("")
        setFound(false);
      }
    };

    if (name) {
      fetchData();
    } else {
      setCountry(null);
    }
  }, [name]);

  console.log(country, found)

  const data = {country: country, found: found}

  return data 
}

