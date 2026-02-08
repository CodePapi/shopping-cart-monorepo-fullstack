import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Input, PageHeader } from '../../components';
import { useAuth } from '../../hooks/useAuth';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to create account.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Create your account"
        description="Join ShopSense and start building your cart."
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
            htmlFor="register-email"
          >
            Email address
            <Input
              id="register-email"
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
            htmlFor="register-password"
          >
            Password
            <Input
              id="register-password"
              type="password"
              name="password"
              autoComplete="new-password"
              required
              minLength={8}
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
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;
