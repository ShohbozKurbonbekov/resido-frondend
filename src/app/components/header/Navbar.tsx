import { NavLink } from "react-router-dom";

export default function Navbar() {
  const authMember = false;
  return (
    <nav className="navbar py-4 w-full fixed bg-transparent z-50">
      <div className="container mx-auto flex flex-row items-center">
        <ul className="flex flex-row items-center gap-5   grow font-medium text-stone-50 text-[14px]">
          <li>
            <NavLink to="/" className="flex flex-row items-center">
              <img
                src="/img/svg/logo-light.svg"
                alt=""
                className="text-stone-50"
              />
              <span className="font-bold ms-1 text-[28px]"> Resido</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/properties">Properties</NavLink>
          </li>
          <li>
            <NavLink to="/agents">Agents</NavLink>
          </li>
          <li>
            <NavLink to="/agencies">Agencies</NavLink>
          </li>
          <li>
            <NavLink to="/Features">Features</NavLink>
          </li>
        </ul>

        {!authMember ? (
          <div className="flex flex-row gap-2 text-[14px] text-stone-50 font-medium">
            <button className="border-none bg-transparent outline-none">
              Sign up
            </button>
            <span>Or</span>
            <button className="border-none bg-transparent outline-none">
              Sign in
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
}
