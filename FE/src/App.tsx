import { Outlet } from 'react-router-dom';
import { Container, SiteFooter, SiteHeader } from './components';
import { useCart } from './hooks';

function App() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader itemCount={itemCount} />
      <main className="py-8">
        <Container>
          <Outlet />
        </Container>
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
