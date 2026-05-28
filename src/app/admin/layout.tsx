import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface text-on-surface font-body antialiased flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 md:ml-64 h-screen overflow-y-auto w-full bg-surface">
        {children}
      </div>
    </div>
  );
}
