import { Info, ShieldCheck } from "lucide-react";

export default function AdminDashboardCommentsHeaderContent() {
  return (
    <>
      <div className="mt-6 bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-green-600" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-800">
              Admin-only permission
            </p>
            <p className="text-sm text-gray-600">
              Only administrators are allowed to delete comments directly from
              the admin dashboard. This restriction helps maintain data
              integrity and prevents accidental or unauthorized content removal.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
        <Info className="h-4 w-4" />
        <span>
          Regular users can report comments, but deletion is restricted to
          admins.
        </span>
      </div>
    </>
  );
}
