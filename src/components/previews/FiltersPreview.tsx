"use client";

import { useState } from "react";

const rows = [
  ["TX-1041", "subscription", "paid"],
  ["TX-1040", "tip", "paid"],
  ["TX-1039", "shop", "failed"],
  ["TX-1038", "subscription", "paid"],
  ["TX-1037", "subscription", "failed"],
  ["TX-1036", "shop", "paid"],
  ["TX-1035", "tip", "paid"],
  ["TX-1034", "subscription", "paid"]
];

const filters = {
  type: ["subscription", "tip", "shop"],
  status: ["paid", "failed"]
};

export function FiltersPreview() {
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const shown = rows.filter((row) => (!type || row[1] === type) && (!status || row[2] === status));
  const query = [type && `type=${type}`, status && `status=${status}`].filter(Boolean).join("&");

  const chip = (active: boolean) =>
    `cursor-pointer border px-2.5 py-1 transition-colors ${
      active ? "border-paper bg-paper text-ink" : "border-paper/25 hover:border-paper/60"
    }`;

  return (
    <div className="font-mono text-[13px]">
      <p className="truncate border border-paper/25 px-3 py-2">
        /transactions<span className="text-ember">{query && `?${query}`}</span>
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.type.map((item) => (
          <button key={item} type="button" className={chip(type === item)} onClick={() => setType(type === item ? "" : item)}>
            {item}
          </button>
        ))}
        <span className="mx-1 self-center text-paper/30">|</span>
        {filters.status.map((item) => (
          <button key={item} type="button" className={chip(status === item)} onClick={() => setStatus(status === item ? "" : item)}>
            {item}
          </button>
        ))}
      </div>

      <table className="mt-4 w-full text-left">
        <thead className="label text-paper/50">
          <tr>
            <th className="py-2 font-normal">Id</th>
            <th className="py-2 font-normal">Type</th>
            <th className="py-2 text-right font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          {shown.map(([id, kind, state]) => (
            <tr key={id} className="border-t border-paper/15">
              <td className="py-1.5">{id}</td>
              <td className="py-1.5">{kind}</td>
              <td className={`py-1.5 text-right ${state === "failed" ? "text-ember" : ""}`}>{state}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-3 border-t border-paper/15 pt-3 text-paper/50">
        {shown.length} of {rows.length} rows · sample data · the address is the filter, so the view can be shared
      </p>
    </div>
  );
}
