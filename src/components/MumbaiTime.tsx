"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 15000);
  return () => clearInterval(timer);
}

export function MumbaiTime() {
  const time = useSyncExternalStore(subscribe, () => format.format(Date.now()), () => "");
  return <span className="tabular-nums">{time && `${time} IST`}</span>;
}
