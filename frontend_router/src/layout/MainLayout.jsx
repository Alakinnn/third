import { NavLink, Outlet } from "react-router-dom"
function MainLayout() {
  return (
    <div>
      <nav>
        <NavElement text="Home" path="/" />
        <NavElement text="Customers" path="/customer" />

      </nav>
      <Outlet />
    </div>
  )
}

function NavElement({text, path}) {
  return (
    <NavLink to={path} className={({isActive}) => isActive ? "active-link" : "inActive-link"}>
      {text}
    </NavLink>
  )
}
export default MainLayout