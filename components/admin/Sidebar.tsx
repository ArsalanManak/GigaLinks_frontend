import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 p-4">
      <div className="mb-6 text-lg font-semibold">Admin</div>
      <nav className="flex flex-col space-y-2 text-sm">
        <Link href="/admin" className="py-2 px-3 rounded hover:bg-gray-100">Dashboard</Link>
        <Link href="/admin/projects" className="py-2 px-3 rounded hover:bg-gray-100">Projects</Link>
        <Link href="/admin/inquiries" className="py-2 px-3 rounded hover:bg-gray-100">Inquiries</Link>
        <Link href="/admin/media" className="py-2 px-3 rounded hover:bg-gray-100">Media</Link>
        <Link href="/admin/settings" className="py-2 px-3 rounded hover:bg-gray-100">Settings</Link>
      </nav>
    </aside>
  );
}
