import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import Card from '../ui/Card';

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return (
      <Card className="text-center">
        <h2 className="text-lg font-semibold text-slate-900">
          Admin access required
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Please sign in with an admin account to continue.
        </p>
        <Link to="/login" className="mt-4 inline-flex">
          <Button>Go to login</Button>
        </Link>
      </Card>
    );
  }

  if (!isAdmin) {
    return (
      <Card className="text-center">
        <h2 className="text-lg font-semibold text-slate-900">
          You do not have permission
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          This area is restricted to admin users only.
        </p>
        <Link to="/" className="mt-4 inline-flex">
          <Button variant="secondary">Back to shop</Button>
        </Link>
      </Card>
    );
  }

  return <>{children}</>;
};

export default RequireAdmin;
