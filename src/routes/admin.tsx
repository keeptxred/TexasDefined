import { Link, Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  head: () => ({
    meta: [{ name: 'robots', content: 'noindex, nofollow, noarchive' }],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return <>
    <nav className="border-b border-border bg-muted/30" aria-label="TexasDefined operations">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 text-sm sm:px-6 lg:px-8">
        <span className="font-semibold">TexasDefined Operations</span>
        <Link to="/admin/platform-health" className="text-muted-foreground hover:text-primary">Platform health</Link>
        <Link to="/admin/sports-partners" className="text-muted-foreground hover:text-primary">Sports partner leads</Link>
        <Link to="/admin/sports-sponsors" className="text-muted-foreground hover:text-primary">Sports sponsorships</Link>
        <Link to="/admin/sports-traffic" className="text-muted-foreground hover:text-primary">Sports traffic readiness</Link>
        <Link to="/admin/fishing-sponsors" className="text-muted-foreground hover:text-primary">Fishing sponsorships</Link>
      </div>
    </nav>
    <Outlet />
  </>;
}
