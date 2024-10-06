// import { LOGO_URL } from '../utils/constants';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div className="navbar max-h-[30px] shadow-xl bg-[#ff5200] text-white font-swig pr-[40px]">
      <div className="flex-1">
        <motion.div
          whileHover={{
            scale: 1.15,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 1 }}
        >
          <Link to="/">
            <a className="btn btn-ghost text-xl">Logo</a>
          </Link>
        </motion.div>
      </div>

      {/* search */}
      <div className="form-control ">
        {/* <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto font-black"
        /> */}
          

      </div>
      <div className="flex-none pr-[30px]">
        {/* link1 */}
        <ul className="menu menu-horizontal px-2">
          

          <li >
            <Link to="/" className="btn btn-ghost hover:bg-[#ff5200] hover:text-gray-200">
               Home
                            
            </Link>
          </li>
        </ul>
        {/* link 2 */}
        <ul className="menu menu-horizontal px-2">
          <li>
            <Link to="/about" className="btn btn-ghost hover:bg-[#ff5200] hover:text-gray-200">
              About
            </Link>
          </li>
        </ul>

        {/* cart */}
        <div className="dropdown dropdown-end px-2">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <Link to="/cart">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cartItems.length}
                </span>
              </div>
            </Link>
          </div>
          {/* <div
            tabIndex={0}
            className='card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow'
          >
            <div className='card-body'>
              <span className='text-lg font-bold'>8 Items</span>
              <span className='text-info'>Subtotal: $999</span>
              <div className='card-actions'>
                <button className='btn btn-primary btn-block'>View cart</button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
