import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from './../assets/assets';
import { useAppContext } from './../context/AppContext';
import toast from 'react-hot-toast';

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const {
    getCartCount,
    navigate,
    user,
    setUser,
    setShowUserLogin,
    SetsearchQuery,
    searchQuery,
    axios
  } = useAppContext();

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [navigate, searchQuery]);

  const Logout = async () => {
    try {
      const {data} = await axios.get('/api/user/logout')
      if (data.success) {
        toast.success(data.message)
        setUser(null);
        navigate('/');
      }else{
         toast.error(data.message)
      }
    } catch (error) {
       toast.error(error.message)
    }
    
    
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

      {/* Logo */}
      <NavLink to='/' onClick={() => setOpen(false)}>
        <img className="h-9" src={assets.logo} alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/products'>All Products</NavLink>
        <NavLink to='/contacts'>Contacts</NavLink>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => SetsearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search_icon" className='w-4 h-4' />
        </div>

        {/* Cart */}
        <div
          className="relative cursor-pointer"
          onClick={() => { navigate("/cart") }}
        >
          <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80' />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {/* User Login/Profile */}
        {!user ? (
          <button
            onClick={() => {
              setShowUserLogin(true)
            }}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
            Login
          </button>
        ) : (
          <div className='relative group'>
            <img src={assets.profile_icon} className='w-10' alt="profile" />
            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
              <li
                onClick={() => { navigate("my-orders") }}
                className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'
              >My Orders</li>
              <li
                onClick={Logout}
                className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'
              >Logout</li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Icons (Search + Cart + Menu) */}
      <div className="flex items-center gap-6 sm:hidden z-50 relative">
        {/* Mobile Search */}
        <div className="flex items-center gap-1 border border-primary px-2 py-1 rounded-full transition-all focus-within:shadow-md">
          <input
            onChange={(e) => SetsearchQuery(e.target.value)}
            className="text-sm w-16 focus:w-28 transition-all bg-transparent outline-none placeholder-gray-400"
            type="text"
            placeholder="🔍"
          />
        </div>

        {/* Cart for Mobile */}
        <div
          className="relative cursor-pointer"
          onClick={() => { navigate("/cart") }}
        >
          <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80' />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {/* Hamburger Menu */}
        <button onClick={() => setOpen(!open)} aria-label="Menu">
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm sm:hidden z-40">
          <NavLink to='/' onClick={() => setOpen(false)} className="block">Home</NavLink>
          <NavLink to='/products' onClick={() => setOpen(false)} className="block">All Products</NavLink>
          {user && <NavLink to='/my-orders' onClick={() => setOpen(false)} className="block">My Orders</NavLink>}
          <NavLink to='/contacts' onClick={() => setOpen(false)} className="block">Contact</NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
              Login
            </button>
          ) : (
            <button
              onClick={Logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
