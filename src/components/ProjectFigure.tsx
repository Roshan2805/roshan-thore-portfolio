const methods = ["Card, tokenized", "iDEAL", "Bancontact", "Centrobill"];
const plans = ["Trial", "Upgrade", "Downgrade", "Lifetime"];

function Checkout() {
  return (
    <div className="font-mono text-[13px]">
      <p className="label mb-3">Checkout</p>
      {methods.map((method) => (
        <p key={method} className="flex items-baseline gap-2 py-1">
          {method}
          <span className="leader" />
          paid
        </p>
      ))}
      <p className="label mb-3 mt-6">Subscription</p>
      <p className="flex flex-wrap gap-x-3 gap-y-1">
        {plans.map((plan, i) => (
          <span key={plan}>
            {i > 0 && <span className="mr-3 text-signal">/</span>}
            {plan}
          </span>
        ))}
      </p>
    </div>
  );
}

function Filters() {
  return (
    <div className="font-mono text-[13px]">
      <p className="label mb-3">A filtered view is a link</p>
      <p className="border border-rule px-3 py-2">
        /transactions
        <span className="text-signal">
          ?type=subscription
          <wbr />
          &amp;status=paid
          <wbr />
          &amp;vat=inclusive
        </span>
      </p>
      <div className="mt-5 space-y-2.5" aria-hidden="true">
        {[100, 82, 91, 64, 76].map((width, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="h-px bg-ink" style={{ width: `${width}%` }} />
          </div>
        ))}
      </div>
      <p className="mt-5 flex items-baseline gap-2">
        Export
        <span className="leader" />
        CSV, in chunks
      </p>
    </div>
  );
}

function Assignment() {
  const staff = [20, 60, 100];
  const creators = [10, 40, 70, 100, 130];
  const links = [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [0, 3]
  ];
  return (
    <div>
      <div className="label flex justify-between">
        <span>Staff</span>
        <span>Creators</span>
      </div>
      <svg viewBox="0 0 300 140" className="mt-3 w-full" role="img" aria-label="Staff assigned to several creators each">
        {links.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            x1="6"
            y1={staff[from]}
            x2="294"
            y2={creators[to]}
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.55"
          />
        ))}
        {staff.map((y) => (
          <circle key={y} cx="6" cy={y} r="4" className="fill-signal" />
        ))}
        {creators.map((y) => (
          <circle key={y} cx="294" cy={y} r="4" fill="currentColor" />
        ))}
      </svg>
    </div>
  );
}

export function ProjectFigure({ id }: { id: string }) {
  if (id === "knky") return <Checkout />;
  if (id === "admin") return <Filters />;
  return <Assignment />;
}
