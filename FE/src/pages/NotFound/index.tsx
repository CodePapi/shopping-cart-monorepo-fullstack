import { Link } from 'react-router-dom';
import { Button, Card, PageHeader } from '../../components';

const NotFound = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="404 — Page not found"
        description="The page you requested could not be found or has moved."
        align="center"
      />
      <Card className="text-center">
        <p className="text-sm text-slate-600">
          Let’s get you back to the catalog.
        </p>
        <Link to="/" className="mt-4 inline-flex">
          <Button>Return home</Button>
        </Link>
      </Card>
    </div>
  );
};

export default NotFound;
