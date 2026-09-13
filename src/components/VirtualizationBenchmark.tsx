"use client";

import React, { memo, useCallback, useLayoutEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Layers } from "lucide-react";

const ROW_HEIGHT = 36;
const DATASET_SIZES = [1000, 10000, 25000];

type ScrollRef = React.RefObject<HTMLDivElement | null>;

export const VirtualizationBenchmark: React.FC = () => {
  const [itemCount, setItemCount] = useState(10000);
  const [isVirtualized, setIsVirtualized] = useState(true);
  const [domRows, setDomRows] = useState(0);
  const [renderMs, setRenderMs] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const renderStart = useRef<number | null>(null);

  // Event timestamps share performance.now()'s clock, so timing starts at the click.
  const changeMode = (e: React.MouseEvent, virtualized: boolean) => {
    if (virtualized === isVirtualized) return;
    renderStart.current = e.timeStamp;
    setIsVirtualized(virtualized);
  };

  const changeCount = (e: React.MouseEvent, count: number) => {
    if (count === itemCount) return;
    renderStart.current = e.timeStamp;
    setItemCount(count);
  };

  const handleRendered = useCallback(() => {
    requestAnimationFrame(() => {
      setDomRows(scrollRef.current?.querySelectorAll("[data-row]").length ?? 0);
      if (renderStart.current !== null) {
        setRenderMs(performance.now() - renderStart.current);
        renderStart.current = null;
      }
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>TanStack Virtual vs Standard DOM</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            This one runs for real. Switch modes or change the dataset and the numbers are measured in your browser.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-[#12192c] p-1.5 rounded-2xl border border-slate-800">
          <span className="text-xs font-mono text-slate-400 pl-2">Mode:</span>
          <button
            onClick={(e) => changeMode(e, false)}
            aria-pressed={!isVirtualized}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              !isVirtualized ? "bg-rose-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Standard DOM
          </button>
          <button
            onClick={(e) => changeMode(e, true)}
            aria-pressed={isVirtualized}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              isVirtualized ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Virtualized (TanStack)
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-400">Dataset:</span>
        {DATASET_SIZES.map((size) => (
          <button
            key={size}
            onClick={(e) => changeCount(e, size)}
            aria-pressed={itemCount === size}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
              itemCount === size ? "bg-slate-700 text-white" : "bg-slate-800/80 hover:bg-slate-700 text-slate-300"
            }`}
          >
            {size.toLocaleString()} rows
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#090b11] border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400">Rows in the DOM</div>
          <div className={`text-2xl font-bold font-mono mt-1 ${isVirtualized ? "text-emerald-400" : "text-rose-400"}`}>
            {domRows.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            of {itemCount.toLocaleString()} in the dataset
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#090b11] border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400">Last render</div>
          <div className={`text-2xl font-bold font-mono mt-1 ${isVirtualized ? "text-emerald-400" : "text-amber-400"}`}>
            {renderMs === null ? "—" : `${Math.round(renderMs)} ms`}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {renderMs === null ? "Change mode or dataset to measure" : "Time to next frame after the change"}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#090b11] border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400">Scroll height</div>
          <div className="text-2xl font-bold font-mono mt-1 text-cyan-400">
            {((itemCount * ROW_HEIGHT) / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}k px
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Same scrollbar in both modes
          </div>
        </div>
      </div>

      <BenchmarkList
        itemCount={itemCount}
        isVirtualized={isVirtualized}
        scrollRef={scrollRef}
        onRendered={handleRendered}
      />
    </div>
  );
};

interface BenchmarkListProps {
  itemCount: number;
  isVirtualized: boolean;
  scrollRef: ScrollRef;
  onRendered: () => void;
}

// Memoized so stat updates in the parent don't re-render thousands of rows.
const BenchmarkList = memo(function BenchmarkList({ itemCount, isVirtualized, scrollRef, onRendered }: BenchmarkListProps) {
  useLayoutEffect(() => {
    onRendered();
  }, [itemCount, isVirtualized, onRendered]);

  return isVirtualized
    ? <VirtualList count={itemCount} scrollRef={scrollRef} />
    : <StandardList count={itemCount} scrollRef={scrollRef} />;
});

const listClass = "h-72 overflow-y-auto rounded-2xl bg-[#090b11] border border-slate-800";

function VirtualList({ count, scrollRef }: { count: number; scrollRef: ScrollRef }) {
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 6
  });

  return (
    <div ref={scrollRef} className={listClass}>
      <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((item) => (
          <Row
            key={item.key}
            index={item.index}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", transform: `translateY(${item.start}px)` }}
          />
        ))}
      </div>
    </div>
  );
}

function StandardList({ count, scrollRef }: { count: number; scrollRef: ScrollRef }) {
  return (
    <div ref={scrollRef} className={listClass}>
      {Array.from({ length: count }, (_, i) => (
        <Row key={i} index={i} />
      ))}
    </div>
  );
}

function Row({ index, style }: { index: number; style?: React.CSSProperties }) {
  return (
    <div
      data-row
      style={{ height: ROW_HEIGHT, ...style }}
      className="flex items-center justify-between px-4 border-b border-slate-800/60 text-[11px] font-mono text-slate-300"
    >
      <span className="text-emerald-400">#{index + 1}</span>
      <span className="truncate">media_asset_{index + 1}.mp4</span>
    </div>
  );
}
