// import React, { useEffect, useRef } from 'react'
// import './navbar.css'
// import logo from '../../assets/logo.png'
// import search_icon from '../../assets/search_icon.svg'
// import bell_icon from '../../assets/bell_icon.svg'
// import profile_img from '../../assets/profile_img.png'
// import caret_icon from '../../assets/caret_icon.svg'
// import { logout } from '../../firebase'

// function Navbar() {
//   const navRef = useRef();

//   // useEffect(() => {
//   //   window.addEventListener('scroll', () => {
//   //     if (window.scrollY >= 80) {
//   //       navRef.current.classList.add('nav-dark');
//   //     } else {
//   //       navRef.current.classList.remove('nav-dark');
//   //     }
//   //   })
//   // }, [])

//   useEffect(() => {
//     // 1) named handler so we can remove it later
//     const handleScroll = () => {
//       // 2) guard navRef.current
//       if (!navRef.current) return;
  
//       // toggle the class based on scrollY
//       navRef.current.classList.toggle(
//         'nav-dark',
//         window.scrollY >= 80
//       );
//     };
  
//     // 3) subscribe
//     window.addEventListener('scroll', handleScroll);
  
//     // 4) cleanup on unmount
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <div className='navbar' ref={navRef}>
//       <div className="navbar-left">
//         <img src={logo} alt="logo" />
//         <ul>
//           <li>Home</li>
//           <li>TV Shows</li>
//           <li>Movies</li>
//           <li>New & Popular</li>
//           <li>My List</li>
//           <li>Browse by Language</li>
//         </ul>
//       </div>

//       <div className="navbar-right">
//         <img src={search_icon} alt="" className='icons' />
//         <p>Children</p>
//         <img src={bell_icon} alt="" className='icons' />

//         <div className="navbar-profile">
//         <img src={profile_img} alt="" className='profile' />
//         <img src={caret_icon}  />
//         <div className="dropdown">
//           <p onClick={() => {logout()}}>Sign Out of Netflix</p>
//         </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar

import React, { useEffect, useRef } from 'react'
import './navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'

function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    // 1. Named handler so we can remove it later
    const handleScroll = () => {
      const navEl = navRef.current
      if (!navEl) return             // ← guard against null

      if (window.scrollY >= 80) {
        navEl.classList.add('nav-dark')
      } else {
        navEl.classList.remove('nav-dark')
      }
    }

    // 2. Listen for window scroll
    window.addEventListener('scroll', handleScroll)

    // 3. Run once to set initial state
    handleScroll()

    // 4. Cleanup to avoid stale listeners
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="navbar" ref={navRef}>
      <div className="navbar-left">
        <img src={logo} alt="logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img src={search_icon} alt="" className="icons" />
        <p>Children</p>
        <img src={bell_icon} alt="" className="icons" />

        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt="caret" />
          <div className="dropdown">
            <p onClick={() => logout()}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
