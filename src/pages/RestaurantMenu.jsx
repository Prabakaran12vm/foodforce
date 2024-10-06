import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Shimmer from '../components/skeleton/Shimmer';
import RestaurantCategory from '../components/RestaurantCategory';
import useRestaurantMenu from '../hooks/useRestaurantMenu';
import { FaStar } from "react-icons/fa";

const RestaurantMenu = () => {
  // const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  // state to control expand and collapse of accordion in Restaurant category
  // by default the first index is open
  const [showIndex, setShowIndex] = useState(0);

  // if (resInfo === null)
  if (!resInfo) return <Shimmer />;

  const { name, cuisines, costForTwoMessage,avgRating } =
    resInfo?.data?.cards[2]?.card?.card?.info || {};

  // console.log('name', name, 'cuisines', cuisines, 'costForTwoMessage', costForTwoMessage);

  const { itemCards } =
    resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card || {};

  
  console.log('itemCards', itemCards);

  // console.log(
  //   resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
  // );

  const categories =
    resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (category) =>
        category?.card?.card?.['@type'] ===
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    );
  // console.log("categories", categories);

  return (
    <div className='text-center '>
      <div className='ml-[250px] px-10 mt-0 pt-0 bg-gray-800 rounded-b-full shadow-xl shadow-gray-300 text-white items-center w-[650px] h-[150px] '>
      <h1 className='font-bold pt-6 text-2xl'>{name}</h1>
      <p className='pt-3  font-light '>
        {cuisines.join(', ')} - {costForTwoMessage}
      </p>
      <h2 className='flex pt-3 pl-[250px] gap-1'><FaStar/>{avgRating}</h2>
      </div>
      {/* categories accordions */}
      {categories.map((category, index) => (
        // Restaurant category is a controlled component
        <RestaurantCategory
          key={category.card.card.title}
          categoryData={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
