import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../hooks';
import type { ProductCardProps } from '../types';
import { formatCurrency } from '../utils/format';
import Badge from './ui/Badge';
import Button from './ui/Button';
import Card from './ui/Card';
import Input from './ui/Input';

const ProductCard: React.FC<ProductCardProps> = ({
  product,
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState<{
    message: string;
    tone: 'success' | 'danger';
  } | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAddToCart = () => {
    if (quantity <= 0 || quantity > product.availableCount) {
      setNotice({
        message: `Invalid quantity. Max available: ${product.availableCount}`,
        tone: 'danger',
      });
      return;
    }

    addItem({
      productId: product.id,
      quantity: quantity,
      price: product.price,
      name: product.name,
      availableCount: product.availableCount,
    });

    setQuantity(1);
    setNotice({
      message: `${quantity} x ${product.name} added to cart.`,
      tone: 'success',
    });
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setNotice(null), 2000);
  };

  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-slate-600">{product.description}</p>
        </div>
        <Badge tone={product.availableCount > 0 ? 'success' : 'danger'}>
          {product.availableCount > 0
            ? `${product.availableCount} in stock`
            : 'Out of stock'}
        </Badge>
      </div>

      <div className="mt-auto space-y-3">
        <div className="text-lg font-semibold text-slate-900">
          {formatCurrency(product.price)}
        </div>

        <div className="flex items-center gap-3">
          <Input
            type="number"
            min={1}
            max={product.availableCount}
            value={quantity}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (!Number.isFinite(next)) {
                setQuantity(1);
                return;
              }
              setQuantity(Math.max(1, Math.min(product.availableCount, next)));
            }}
            className="w-20"
            disabled={product.availableCount === 0}
          />
          <Button
            onClick={handleAddToCart}
            disabled={product.availableCount === 0}
            className="w-full"
          >
            {product.availableCount > 0 ? 'Add to cart' : 'Out of stock'}
          </Button>
        </div>

        {notice && (
          <p
            className={clsx(
              'text-xs font-medium',
              notice.tone === 'success' && 'text-emerald-600',
              notice.tone === 'danger' && 'text-rose-600',
            )}
          >
            {notice.message}
          </p>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
