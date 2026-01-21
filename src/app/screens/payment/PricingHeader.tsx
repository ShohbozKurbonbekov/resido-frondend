export default function PricingHeader() {
  return (
    <div className="text-center">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
        Step 2 of 3
      </p>

      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        Choose your plan
      </h1>

      <p className="mt-2 text-sm text-slate-600">
        Select a plan to continue. You’ll review your details and complete
        billing on the next step.
      </p>

      <p className="mt-2 text-xs text-slate-500">
        No charges yet. You’ll confirm before payment.
      </p>

      <div className="mx-auto mt-4 h-px w-16 bg-slate-200" />
    </div>
  );
}
