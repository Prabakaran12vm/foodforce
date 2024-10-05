// redux
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';
import { CDN_URL } from '../utils/constants';
import { useLocation } from 'react-router-dom';
const ItemList = ({ itemCards }) => {
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;

  const handleAddItem = (itemCard) => {
    // dispatch an action
    dispatch(addItem(itemCard));
    /* 
      Internally redux will create a object
      {
        payload: "pizza"
      }

      and assign this object to action (2nd argument to the reducer function)
    */
  };
  return (
    <div>
      {itemCards.map((itemCard) => (
        <div
          data-testid='foodItems'
          key={itemCard.card.info.id}
          className='p-2 m-2 border-b-2 border-gray-200 text-left flex justify-between'
        >
          <div className='w-9/12'>
            <div className='py-2'>
              <span>{itemCard?.card?.info?.name}</span>
              <span>
                {' '}
                - ₹{' '}
                {itemCard?.card?.info?.defaultPrice
                  ? itemCard?.card?.info?.defaultPrice / 100
                  : itemCard.card.info.price / 100}
              </span>
            </div>
            <span className='text-xs'>{itemCard?.card?.info?.description}</span>
          </div>
          <div className='w-3/12 p-2'>
            <div className='absolute'>
              {pathname === '/cart' ? (
                <></>
              ) : (
                <button
                  className='p-1 px-2 mx-4 rounded-lg bg-black text-white shadow-lg'
                  onClick={() => handleAddItem(itemCard)}
                >
                  Add +
                </button>
              )}
            </div>
            <img src={`${CDN_URL}${itemCard.card.info.imageId}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
