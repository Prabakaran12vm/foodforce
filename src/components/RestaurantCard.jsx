import { CDN_URL } from '../utils/constants';

const RestaurantCard = (props) => {
  const { resData } = props;
  // console.log('resData', resData);
  const { name, cuisines, costForTwo, avgRating, sla, cloudinaryImageId } =
    resData?.info;
  const { deliveryTime } = sla;
  return (
    <div
      data-testid='resCard'
      className='m-4 p-4 w-[200px] bg-gray-50 hover:bg-gray-100'
    >
      <img
        className='rounded-lg'
        alt='res-logo'
        src={`${CDN_URL}${cloudinaryImageId}`}
      />
      <h3 className='font-bold py-4 text-lg'>{name}</h3>
      <h4>{cuisines.join(', ')}</h4>
      <h4>{costForTwo}</h4>
      <h4>{avgRating} ⭐</h4>
      <h4>{deliveryTime} mins</h4>
    </div>
  );
};

// higher order component
// input RestaurantCard => output RestaurantCard with speedy label
// export const withSpeedyLabel = (RestaurantCard) => {
//   return (props) => {
//     return (
//       <div>
//         <label className='absolute bg-black text-white m-2 p-2 rounded-md'>
//           Speedy
//         </label>
//         <RestaurantCard {...props} />
//       </div>
//     );
//   };
// };

export const withSpeedyLabel = (WrappedComponent) => {
  const SpeedyRestaurantCard = ({ resData }) => {
    return (
      <div>
        <label className='absolute bg-black text-white m-2 p-2 rounded-md'>Speedy</label>
        <WrappedComponent resData={resData} />
      </div>
    );
  };

  return SpeedyRestaurantCard;
};

export default RestaurantCard;
