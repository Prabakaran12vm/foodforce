import { useDispatch, useSelector } from 'react-redux';
import ItemList from '../components/ItemList';
import { clearCart } from '../redux/slices/cartSlice';

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  // function to handle the clear cart
  const handleClearCart = () => {
    // dispath an action
    dispatch(clearCart());
  };
  return (
    <div className='text-center m-4 p-4'>
      <h1 className='text-2xl font-bold'>Cart</h1>
      <div className='w-6/12 m-auto'>
        {/* cartItems.length === 0 */}
        {!cartItems.length ? (
          <h1>Cart is empty, Add items to the cart</h1>
        ) : (
          <button
            className='p-2 m-2 bg-green-600 text-white rounded-lg'
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        )}

        <ItemList itemCards={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
