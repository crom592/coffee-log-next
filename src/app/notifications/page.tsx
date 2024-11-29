import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NotificationList } from "@/components/notifications/NotificationList";

export const metadata: Metadata = {
  title: "알림 - Coffee Log",
  description: "View your notifications on Coffee Log",
};

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-2xl font-bold mb-6">알림</h1>
      <NotificationList />
    </div>
  );
}
