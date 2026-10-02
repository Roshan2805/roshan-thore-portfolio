"use client";

import { useEffect, useState } from "react";

const plans = ["Free trial", "Monthly", "Lifetime"];
const methods = ["Card", "iDEAL", "Bancontact", "Centrobill"];

type Status = "idle" | "processing" | "paid" | "declined";

export function CheckoutPreview() {
  const [plan, setPlan] = useState("Monthly");
  const [method, setMethod] = useState("Card");
  const [decline, setDecline] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status !== "processing") return;
    const timer = setTimeout(() => setStatus(decline ? "declined" : "paid"), 1100);
    return () => clearTimeout(timer);
  }, [status, decline]);

  const choose = (set: (value: string) => void, value: string) => {
    set(value);
    setStatus("idle");
  };

  const option = (active: boolean) =>
    `cursor-pointer border px-3 py-2 text-left transition-colors ${
      active ? "border-paper bg-paper text-ink" : "border-paper/25 hover:border-paper/60"
    }`;

  return (
    <div className="font-mono text-[13px]">
      <p className="label text-paper/60">1 · Plan</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {plans.map((item) => (
          <button key={item} type="button" className={option(plan === item)} onClick={() => choose(setPlan, item)}>
            {item}
          </button>
        ))}
      </div>

      <p className="label mt-6 text-paper/60">2 · Pay with</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {methods.map((item) => (
          <button key={item} type="button" className={option(method === item)} onClick={() => choose(setMethod, item)}>
            {item}
          </button>
        ))}
      </div>

      <label className="mt-6 flex cursor-pointer items-center gap-2 text-paper/60">
        <input
          type="checkbox"
          className="accent-[#ff7a4d]"
          checked={decline}
          onChange={(e) => {
            setDecline(e.target.checked);
            setStatus("idle");
          }}
        />
        Make the bank decline it
      </label>

      <button
        type="button"
        disabled={status === "processing"}
        onClick={() => setStatus("processing")}
        className="mt-4 w-full cursor-pointer bg-ember py-3 font-sans text-sm font-medium text-ink disabled:opacity-60"
      >
        {status === "processing" ? "Confirming with the provider…" : `Pay for ${plan}`}
      </button>

      <div className="mt-5 min-h-[5.5rem] border-t border-paper/25 pt-3" aria-live="polite">
        {status === "paid" && (
          <>
            <p className="flex items-baseline gap-2">
              {plan}
              <span className="leader" />
              {method}
            </p>
            <p className="mt-1 flex items-baseline gap-2">
              Status
              <span className="leader" />
              <span className="text-ember">paid, subscription active</span>
            </p>
          </>
        )}
        {status === "declined" && (
          <>
            <p>Declined by the provider. Nothing was charged.</p>
            <button
              type="button"
              className="mt-2 cursor-pointer border-b border-ember text-ember"
              onClick={() => {
                setDecline(false);
                setStatus("processing");
              }}
            >
              Try again
            </button>
          </>
        )}
        {(status === "idle" || status === "processing") && <p className="text-paper/40">The result shows up here.</p>}
      </div>
    </div>
  );
}
