import type { AdminProductTableProps } from '../types';
import { formatCurrency, formatDate } from '../utils/format';
import Card from './ui/Card';

const AdminProductTable: React.FC<AdminProductTableProps> = ({
  products,
}: AdminProductTableProps) => {
  if (products.length === 0) {
    return (
      <Card className="border-dashed text-center">
        <h3 className="text-lg font-semibold text-slate-900">
          No products yet
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Use the “Create New Product” button to add your first item.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Available</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {product.id}
                </td>
                <td className="px-4 py-3 text-slate-700">{product.name}</td>
                <td className="px-4 py-3 text-slate-700">
                  {formatCurrency(product.price)}
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {product.availableCount}
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {formatDate(product.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AdminProductTable;
