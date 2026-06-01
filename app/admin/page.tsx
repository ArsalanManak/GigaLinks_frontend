export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded bg-white p-4 shadow">Total Inquiries<br/><span className="text-xl font-bold">—</span></div>
        <div className="rounded bg-white p-4 shadow">Open Quotes<br/><span className="text-xl font-bold">—</span></div>
        <div className="rounded bg-white p-4 shadow">Active Projects<br/><span className="text-xl font-bold">—</span></div>
        <div className="rounded bg-white p-4 shadow">New Messages<br/><span className="text-xl font-bold">—</span></div>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-medium mb-2">Recent Activity</h2>
        <div className="space-y-2">
          <div className="p-3 bg-white rounded shadow">No recent activity</div>
        </div>
      </section>
    </div>
  );
}
