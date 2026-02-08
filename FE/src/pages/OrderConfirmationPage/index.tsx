import type { OrderResponse } from 'project-shared';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrder } from '../../api';
import { Badge, Card, PageHeader } from '../../components';
import { formatCurrency, formatDate } from '../../utils/format';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) {
        setError('Missing Order ID.');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchOrder(orderId);
        setOrder(data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load order details or this order does not exist',
        );
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <Card className="text-center">
        <h2 className="text-lg font-semibold text-slate-900">
          Loading order confirmation...
        </h2>
        <p className="mt-2 text-sm text-slate-600">Please wait.</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-rose-200 bg-rose-50 text-rose-700">{error}</Card>
    );
  }

  if (!order) {
    return (
      <Card className="border-rose-200 bg-rose-50 text-rose-700">
        Order details unavailable.
      </Card>
    );
  }

  const statusTone =
    order.status === 'DELIVERED'
      ? 'success'
      : order.status === 'CANCELED'
        ? 'danger'
        : 'warning';

  return (
    <div className="space-y-8">
      <PageHeader
        title="Order confirmed"
        description="Thanks for your purchase! We've sent your order to fulfillment."
      />

      <Card className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone={statusTone}>{order.status}</Badge>
          <span className="text-sm text-slate-600">Order ID {order.id}</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Customer ID
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {order.customerId}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Placed on
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {formatDate(order.orderCreatedDate)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Order total
            </p>
            <p className="text-lg font-semibold text-slate-900">
              {formatCurrency(order.orderTotal)}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Items ordered
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {order.products.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <span>{item.name}</span>
                <span className="font-semibold">x{item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default OrderConfirmationPage;
