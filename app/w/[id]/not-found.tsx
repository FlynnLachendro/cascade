import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <h1 className="text-2xl font-bold text-slate-900">Workflow not found</h1>
      <p className="mt-2 text-sm text-slate-500">
        This workflow may have been deleted or the link is invalid.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
      >
        Back to Home
      </Link>
    </div>
  );
}
