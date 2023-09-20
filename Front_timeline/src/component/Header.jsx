import { NavLink } from "react-router-dom"

export const Header = ()  => {
    return (
         <header className="header">
            <nav className="header-nav">
              <NavLink to='/' className='link'>Timeline</NavLink>
              <NavLink to='/quizz' className='link'>Quizz</NavLink>
              <NavLink to='/articles' className='link'>Article</NavLink>
              <NavLink to='/admin/periodes' className='link'>Admin</NavLink>
            </nav>
        </header>
    )
}