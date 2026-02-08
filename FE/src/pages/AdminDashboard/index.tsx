import type { Product } from 'project-shared';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../api';
import { AdminProductTable, Button, Card, PageHeader } from '../../components';

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(
        'Failed to load product dashboard. Please check the backend connection.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (loading) {
    return (
      <Card className="text-center">
        <h2 className="text-lg font-semibold text-slate-900">
          Loading admin dashboard...
        </h2>
        <p className="mt-2 text-sm text-slate-600">Fetching inventory data.</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-rose-200 bg-rose-50">
        <h2 className="text-lg font-semibold text-rose-700">
          Error loading data
        </h2>
        <p className="mt-2 text-sm text-rose-600">{error}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin product dashboard"
        description="Manage your catalog, review availability, and keep inventory fresh."
        action={
          <Link to="/admin/new">
            <Button>+ Create new product</Button>
          </Link>
        }
      />

      <AdminProductTable products={products} />
    </div>
  );
};

export default AdminDashboard;
