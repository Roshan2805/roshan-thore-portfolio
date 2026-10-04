"use client";

import { memo, useCallback, useLayoutEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

const ROW = 34;
const SIZES = [1000, 10000, 25000];

type ScrollRef = React.RefObject<HTMLDivElement | null>;

// The idea behind the Media Vault, running for real: the same list with and without virtualization.
export function Benchmark() {
  const [count, setCount] = useState(10000);
  const [virtual, setVirtual] = useState(true);
  const [rows, setRows] = useState(0);
  const [ms, setMs] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const started = useRef<number | null>(null);

  // Event timestamps share performance.now()'s clock, so timing starts at the click.
  const change = (e: React.MouseEvent, next: { count?: number; virtual?: boolean }) => {
    started.current = e.timeStamp;
    if (next.count !== undefined) setCount(next.count);
    if (next.virtual !== undefined) setVirtual(next.virtual);
  };

  const measured = useCallback(() => {
    requestAnimationFrame(() => {
      setRows(scrollRef.current?.querySelectorAll("[data-row]").length ?? 0);
      if (started.current !== null) {
        setMs(performance.now() - started.current);
        started.current = null;
      }
    });
  }, []);

  const option = (active: boolean) =>
    `cursor-pointer border px-3 py-1.5 transition-colors ${active ? "border-paper bg-paper text-ink" : "border-paper/25 hover:border-paper/60"}`;

  return (
    <div className="bg-ink p-5 font-mono text-[13px] text-paper sm:p-8">
      <p className="label text-ember">Runs for real in your browser</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={option(!virtual)} onClick={(e) => change(e, { virtual: false })}>
          Plain list
        </button>
        <button type="button" className={option(virtual)} onClick={(e) => change(e, { virtual: true })}>
          Virtualized
        </button>
        <span className="mx-1 self-center text-paper/30">|</span>
        {SIZES.map((size) => (
          <button key={size} type="button" className={option(count === size)} onClick={(e) => change(e, { count: size })}>
            {size.toLocaleString()}
          </button>
        ))}
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4">
        <div className="border-t border-paper/20 pt-2">
          <dt className="text-paper/50">Rows in the DOM</dt>
          <dd className="mt-1 text-2xl tabular-nums">
            {rows.toLocaleString()} <span className="text-sm text-paper/50">of {count.toLocaleString()}</span>
          </dd>
        </div>
        <div className="border-t border-paper/20 pt-2">
          <dt className="text-paper/50">Last render</dt>
          <dd className="mt-1 text-2xl tabular-nums">{ms === null ? "—" : `${Math.round(ms)} ms`}</dd>
        </div>
      </dl>

      <List count={count} virtual={virtual} scrollRef={scrollRef} onRendered={measured} />
    </div>
  );
}

// Memoized so the numbers above can update without re-rendering thousands of rows.
const List = memo(function List({
  count,
  virtual,
  scrollRef,
  onRendered
}: {
  count: number;
  virtual: boolean;
  scrollRef: ScrollRef;
  onRendered: () => void;
}) {
  useLayoutEffect(() => {
    onRendered();
  }, [count, virtual, onRendered]);

  return virtual ? <VirtualRows count={count} scrollRef={scrollRef} /> : <PlainRows count={count} scrollRef={scrollRef} />;
});

const box = "mt-5 h-64 overflow-y-auto border border-paper/20";

function VirtualRows({ count, scrollRef }: { count: number; scrollRef: ScrollRef }) {
  const virtualizer = useVirtualizer({ count, getScrollElement: () => scrollRef.current, estimateSize: () => ROW, overscan: 6 });
  return (
    <div ref={scrollRef} className={box} data-lenis-prevent>
      <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((item) => (
          <Row key={item.key} index={item.index} style={{ position: "absolute", top: 0, left: 0, width: "100%", transform: `translateY(${item.start}px)` }} />
        ))}
      </div>
    </div>
  );
}

function PlainRows({ count, scrollRef }: { count: number; scrollRef: ScrollRef }) {
  return (
    <div ref={scrollRef} className={box} data-lenis-prevent>
      {Array.from({ length: count }, (_, i) => (
        <Row key={i} index={i} />
      ))}
    </div>
  );
}

function Row({ index, style }: { index: number; style?: React.CSSProperties }) {
  return (
    <div data-row style={{ height: ROW, ...style }} className="flex items-center justify-between border-b border-paper/10 px-3 text-paper/70">
      <span className="text-ember">#{index + 1}</span>
      <span>sample_asset_{index + 1}.mp4</span>
    </div>
  );
}
