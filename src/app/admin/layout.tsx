import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="flex items-center justify-between border-b border-brand-line pb-4">
        <Link href="/admin" className="text-lg font-extrabold italic">
          Ghjucà — Back office
        </Link>
        <LogoutButton />
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
