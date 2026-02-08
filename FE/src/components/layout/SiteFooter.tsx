import Container from './Container';

const SiteFooter = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-6">
      <Container className="flex flex-col items-start justify-between gap-3 text-sm text-slate-500 sm:flex-row sm:items-center">
        <span>© 2026 CodePapi</span>
        <span>Built for fast, delightful shopping.</span>
      </Container>
    </footer>
  );
};

export default SiteFooter;
