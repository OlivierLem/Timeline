import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

export const Header = ()  => {
  const { user, signout } = useContext(AuthContext);
  const [menuBurgerActive, setMenuBurgerActive] = useState(false)
  const navigate = useNavigate()
    return (
      <>
         <header className="header">
            <nav className="header-nav">
              <NavLink to='/' className='link'>Timeline</NavLink>
              <NavLink to='/quizz' className='link'>Quizz</NavLink>
              {/* <NavLink to='/articles' className='link'>Article</NavLink> */}
              <NavLink to='/admin/periodes' className='link'>Admin</NavLink>
              {
                user ? (
                  <>
                    <NavLink to='/profil'>Profil</NavLink>
                    <button 
                      className="logout"
                      onClick={async () => {
                        await signout()
                        navigate("/")
                      }}
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to='/connexion'>Connexion</NavLink>
                    <NavLink to='/inscription'>Inscription</NavLink>
                  </>
                )
              }
            </nav>
            <nav className="header-nav mobile">
              <button onClick={() => setMenuBurgerActive(true)}>
                <i className="fa-solid fa-bars"></i>
              </button>
              {
                  user ? (
                    <>
                      <NavLink to='/profil'>Profil</NavLink>
                      <button 
                        className="logout"
                        onClick={async () => {
                          await signout()
                          navigate("/")
                        }}
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink to='/connexion'>Connexion</NavLink>
                      <NavLink to='/inscription'>Inscription</NavLink>
                    </>
                  )
                }
            </nav>
        </header>
        <div className={`menuBurger ${menuBurgerActive ? 'active' : ''}`}>
          <button 
            className="closeModale"
            onClick={() => setMenuBurgerActive(false)}
          >
            <i className="fa-solid fa-x"></i>
          </button>
          <nav>
              <NavLink to='/' className='link'>Timeline</NavLink>
              <NavLink to='/quizz' className='link'>Quizz</NavLink>
              {/* <NavLink to='/articles' className='link'>Article</NavLink> */}
              <NavLink to='/admin/periodes' className='link'>Admin</NavLink>
          </nav>
        </div>
        </>
    )
}