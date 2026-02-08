import type { CreateProduct } from 'project-shared';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../api';
import { Button, Card, Input, PageHeader, TextArea } from '../../components';

const CreateProductForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateProduct>({
    name: '',
    description: '',
    price: 0,
    availableCount: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'availableCount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      formData.price <= 0 ||
      !Number.isFinite(formData.price) ||
      formData.availableCount <= 0 ||
      !Number.isInteger(formData.availableCount)
    ) {
      setError('Please fill out all fields correctly.');
      setLoading(false);
      return;
    }

    try {
      await createProduct(formData);

      alert(`Product "${formData.name}" created successfully!`);
      navigate('/admin');
    } catch (err) {
      console.error('Error creating product:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An unknown error occurred during creation.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Create new product"
        description="Add a new item to your catalog with pricing and inventory details."
      />

      <Card className="max-w-2xl">
        {error && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label
            className="block text-sm font-semibold text-slate-700"
            htmlFor="product-name"
          >
            Product Name
            <Input
              id="product-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Wireless Mouse"
              required
              className="mt-2"
            />
          </label>

          <label
            className="block text-sm font-semibold text-slate-700"
            htmlFor="product-description"
          >
            Product Description
            <TextArea
              id="product-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="A brief summary of the product's features and use."
              required
              rows={4}
              className="mt-2"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label
              className="block text-sm font-semibold text-slate-700"
              htmlFor="product-price"
            >
              Price (EUR)
              <Input
                id="product-price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                placeholder="0.01"
                required
                className="mt-2"
              />
            </label>

            <label
              className="block text-sm font-semibold text-slate-700"
              htmlFor="product-available"
            >
              Available Count
              <Input
                id="product-available"
                type="number"
                name="availableCount"
                value={formData.availableCount}
                onChange={handleChange}
                min="1"
                step="1"
                placeholder="1"
                required
                className="mt-2"
              />
            </label>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create product'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateProductForm;
