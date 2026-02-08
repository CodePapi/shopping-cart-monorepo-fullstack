import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { placeOrder } from '../../api';
import { Button, Card, PageHeader } from '../../components';
import { useCart } from '../../hooks';
import { formatCurrency } from '../../utils/format';

//hardcoded as suggested. in real world, we would take it from the user's profile data after logging in.
const CUSTOMER_ID = '7545afc6-c1eb-497a-9a44-4e6ba595b4ab';

const CartPage: React.FC = () => {
  const { items, getCartTotal, clearCart, removeItem } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      customerId: CUSTOMER_ID,
      products: items.map((item) => ({
        id: item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      const newOrder = await placeOrder(payload);
      clearCart();
      navigate(`/orders/${newOrder.id}`);
    } catch (err) {
      console.error('Order placement failed:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An unknown error occurred during checkout.',
      );
    } finally {
      setLoading(false);
    }
  };

  const total = getCartTotal();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your cart"
        description="Review items, update quantities, and checkout when you're ready."
      />

      {error && (
        <Card className="border-rose-200 bg-rose-50 text-rose-700">
          {error}
        </Card>
      )}

      {items.length === 0 ? (
        <Card className="text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            Your cart is empty
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Explore the catalog to add items to your cart.
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            Continue shopping
          </Link>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card className="space-y-4">
            <div className="hidden md:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="py-3">Product</th>
                    <th className="py-3">Price</th>
                    <th className="py-3">Qty</th>
                    <th className="py-3">Subtotal</th>
                    <th className="py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.productId}>
                      <td className="py-3 font-medium text-slate-900">
                        {item.name}
                      </td>
                      <td className="py-3 text-slate-700">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="py-3 text-slate-700">{item.quantity}</td>
                      <td className="py-3 text-slate-700">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                      <td className="py-3 text-right">
                        <Button
                          variant="ghost"
                          className="text-rose-600 hover:text-rose-700"
                          onClick={() => removeItem(item.productId)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 md:hidden">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        {formatCurrency(item.price)} · Qty {item.quantity}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-rose-600"
                      onClick={() => removeItem(item.productId)}
                    >
                      Remove
                    </Button>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    Subtotal: {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Order summary
            </h3>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Estimated total</span>
              <span className="text-base font-semibold text-slate-900">
                {formatCurrency(total)}
              </span>
            </div>
            <Button
              onClick={handlePlaceOrder}
              disabled={loading || items.length === 0}
              className="w-full"
            >
              {loading ? 'Processing...' : 'Place order'}
            </Button>
            <Button variant="secondary" className="w-full" onClick={clearCart}>
              Clear cart
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CartPage;
