import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Shimmer from '../components/skeleton/Shimmer';
import RestaurantCategory from '../components/RestaurantCategory';
import useRestaurantMenu from '../hooks/useRestaurantMenu';

const RestaurantMenu = () => {
  // const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  // state to control expand and collapse of accordion in Restaurant category
  // by default the first index is open
  const [showIndex, setShowIndex] = useState(0);

  // if (resInfo === null)
  if (!resInfo) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
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
    <div className='text-center bg-rgb(255, 255, 255)'>
      <h1 className='font-bold my-5 text-2xl'>{name}</h1>
      <p className='font-bold text-lg'>
        {cuisines.join(', ')} - {costForTwoMessage}
      </p>
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
