import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Input, PageHeader } from '../../components';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname ?? '/';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Welcome back"
        description="Sign in to manage products or track your latest orders."
      />

      <Card className="max-w-lg">
        {error && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label
            className="block text-sm font-semibold text-slate-700"
            htmlFor="login-email"
          >
            Email address
            <Input
              id="login-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              className="mt-2"
              value={formData.email}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
            />
          </label>

          <label
            className="block text-sm font-semibold text-slate-700"
            htmlFor="login-password"
          >
            Password
            <Input
              id="login-password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              className="mt-2"
              value={formData.password}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
            />
          </label>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          New here?{' '}
          <Link to="/register" className="font-semibold text-indigo-600">
            Create an account
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
