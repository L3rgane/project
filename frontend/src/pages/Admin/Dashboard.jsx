import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="page">
      <h1>Admin dashboard</h1>
      <div className="grid-3">
        <div className="info-card"><h3>Manage foods</h3><p>Add, edit and delete dishes in your menu.</p><Link className="pill small" to="/admin/foods">Open</Link></div>
      </div>
    </div>
  );
}
