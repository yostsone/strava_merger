import { NavLink } from 'react-router';

export default function HeaderLogo() {
  return (
      <NavLink to={'/'}>
        <div className="text-amber-50 text-3xl p-2 font-bold">smerge</div>
      </NavLink>
  )
}