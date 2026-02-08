import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Container from './Container';

interface SiteHeaderProps {
  itemCount: number;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ itemCount }) => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold text-slate-900"
        >
          <span className="text-2xl">🛍️</span>
          ShopCart
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-slate-900' : 'transition hover:text-slate-900'
            }
          >
            Shop
          </NavLink>
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? 'text-slate-900' : 'transition hover:text-slate-900'
              }
            >
              Admin
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="hidden items-center gap-3 md:flex">
              <span className="text-xs font-semibold text-slate-500">
                {user?.email}
              </span>
              <Button variant="ghost" onClick={logout}>
                Log out
              </Button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/login">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link to="/register">
                <Button>Sign up</Button>
              </Link>
            </div>
          )}
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          >
            <span>Cart</span>
            <Badge tone={itemCount > 0 ? 'success' : 'neutral'}>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </Badge>
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default SiteHeader;
