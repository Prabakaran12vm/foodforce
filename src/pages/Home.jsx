import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RestaurantCard, { withSpeedyLabel } from '../components/RestaurantCard';
// import resList from "../utils/mockData";
// import Shimmer from "./Shimmer";
import Shimmer from '../components/skeleton/Shimmer';
// import UserContext from '../utils/UserContext';

const Home = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [showTopRated, setShowTopRated] = useState(false);

  const RestaurantCardSpeedy = withSpeedyLabel(RestaurantCard);
  // import setUserName and required details from the context
  // const { loggedInuser, setUserName } = useContext(UserContext);

  // console.log("restaurantList", restaurantList);

  // console.loHome rendered");

  // Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // const url2 = 'http://localhost:5000/api/restaurants'
    const url =
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.89960&lng=80.22090&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
    try {
      const data = await fetch(url);
      const json = await data.json();

      console.log('json', json);
      // optional chaining
      setRestaurantList(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setFilteredRestaurant(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    } catch (err) {
      console.error(`Error while fetching the data ${err}`);
      throw err;
    }
  };

  const filterBtnClick = () => {
    // remove top rated filter
    setShowTopRated(!showTopRated);
    const filteredList = !showTopRated
      ? restaurantList.filter((res) => res.info.avgRating > 4.5)
      : restaurantList;
    // setRestaurantList(filteredList);
    setFilteredRestaurant(filteredList);
    // console.log("filteredList", filteredList);
  };

  // conditional rendering
  // if (restaurantList.length === 0)
  return !restaurantList?.length ? (
    <Shimmer />
  ) : (
    <div className='body'>
      <div className='flex'>
        <div className='m-4 p-4'>
          <input
            data-testid='searchInput'
            type='text'
            className='border border-solid border-black'
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
          <button
            className='px-4 py-2 m-4 bg-green-100 rounded-lg'
            onClick={() => {
              // Filter the res and update the UI
              // search text
              console.log('searchText', searchText);
              const filteredRestaurant = restaurantList.filter((res) => {
                return res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className='form-control'>
          <label className='label cursor-pointer'>
            <span className='label-text'>Top Rated</span>
              <input
                type='checkbox'
                className='toggle'
                onClick={filterBtnClick}
              />
          </label>
        </div>
        {/* <div className='m-4 p-4 flex items-center'>
          <button
            className='px-4 py-2 bg-blue-100 rounded-lg'
            onClick={filterBtnClick}
          >
            Top Rated Restaurants
          </button>
        </div> */}
        <div className='m-4 p-4 flex items-center'>
          {/* Using that function update data in the context */}
          {/* <label>Username </label> */}
          {/* <input
            className='border border-black p-2'
            value={loggedInuser}
            onChange={(event) => setUserName(event.target.value)}
          /> */}
        </div>
      </div>
      <div className='m-5 flex flex-wrap justify-between'>
        {filteredRestaurant?.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={`restaurants/${restaurant.info.id}`}
          >
            {/* if a delivery time is less than 30mins add speedy label*/}
            {console.log(
              'restaurant.info.sla.deliveryTime',
              restaurant?.info?.sla?.deliveryTime <= 30
            )}

            {restaurant.info.sla.deliveryTime <= 30 ? (
              <RestaurantCardSpeedy resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}

            {/* {
            restaurant.info.sla.deliveryTime < 26 ? <RestaurantCardSpeedy resData={restaurant} /> : <RestaurantCard resData={restaurant} />
          } */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
