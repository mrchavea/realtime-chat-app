import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="mt-5">
        <h1 className="text-3xl font-semibold">Gestiona tu taller</h1>
        <AdminNavbar />
        {children}
      </div>
    </>
  );
}
