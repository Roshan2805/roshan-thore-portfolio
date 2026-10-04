// The computer from the start of the story: a game, a search, then a question.
export function KidsComputer() {
  return (
    <div className="mx-auto w-full max-w-sm font-mono text-[11px] sm:text-[13px]">
      <div className="relative aspect-[4/3] border-2 border-ink p-2">
        <div className="relative size-full overflow-hidden bg-ink text-paper">
          <div className="screen absolute inset-0 flex flex-col justify-between p-3">
            <p className="flex justify-between text-[10px] text-paper/60">
              <span>1UP</span>
              <span>HI 004200</span>
            </p>
            <div className="relative h-1/2">
              <span className="hop absolute bottom-3 left-[20%] size-4 bg-ember" />
              <span className="absolute bottom-10 left-[52%] size-2 rounded-full bg-paper" />
              <span className="absolute bottom-3 left-[70%] h-6 w-5 bg-paper/40" />
              <span className="absolute inset-x-0 bottom-0 h-3 bg-paper/25" />
            </div>
          </div>
          <div className="screen absolute inset-0 p-3" style={{ animationDelay: "2.4s" }}>
            <p className="flex items-center border border-paper/30 px-2 py-1.5">
              <span className="blink h-3 w-px bg-paper/80" />
            </p>
            <div className="mt-3 space-y-2">
              <span className="block h-1.5 w-3/4 bg-ember/70" />
              <span className="block h-1.5 w-full bg-paper/25" />
              <span className="block h-1.5 w-2/3 bg-paper/25" />
              <span className="block h-1.5 w-5/6 bg-paper/25" />
            </div>
          </div>
          <div className="screen absolute inset-0 flex items-center justify-center" style={{ animationDelay: "4.8s" }}>
            <span className="font-display text-7xl text-ember">?</span>
            <span className="blink ml-1 h-12 w-1 bg-paper/70" />
          </div>
        </div>
      </div>
      <div className="mx-auto h-5 w-10 border-x-2 border-ink" />
      <div className="mx-auto h-0.5 w-28 bg-ink" />
    </div>
  );
}
