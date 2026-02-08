import type { Product } from 'project-shared';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../api';
import { Card, PageHeader, ProductCard } from '../../components';

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(
          'Failed to load products. Please check the backend connection.',
        );
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return (
      <Card className="text-center">
        <h2 className="text-lg font-semibold text-slate-900">
          Loading products...
        </h2>
        <p className="mt-2 text-sm text-slate-600">Warming up the shelves.</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-rose-200 bg-rose-50 text-center">
        <h2 className="text-lg font-semibold text-rose-700">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm text-rose-600">{error}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Product catalog"
        description="Discover curated essentials and add them to your cart in a single tap."
      />

      {products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Card className="text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            No products available
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Add products in the admin area to start selling.
          </p>
          <Link
            to="/admin"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            Go to admin
          </Link>
        </Card>
      )}
    </div>
  );
};

export default ShopPage;
