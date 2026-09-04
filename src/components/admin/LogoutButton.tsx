"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        fetch("/api/admin/logout", { method: "POST" }).then(() => {
          router.push("/admin/login");
          router.refresh();
        });
      }}
      className="text-sm text-brand-gray hover:text-brand-pink"
    >
      Déconnexion
    </button>
  );
}
