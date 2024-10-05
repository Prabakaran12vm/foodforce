import { useState, useEffect } from 'react';
import { MENU_API } from '../utils/constants';

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  // fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // const url = 'http://localhost:5000/api/restaurants/'
    try {
      const data = await fetch(`${MENU_API}${resId}`);
      // const data = await fetch(`${url}/${resId}`);
      const json = await data.json();
      setResInfo(json);
    } catch (err) {
      console.error(`Error while fetching the data ${err}`);
      throw err;
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
