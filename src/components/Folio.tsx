// The numbered opener every section after the story shares: a large numeral, the section
// name in small type, and an optional note on the right.
export function Folio({
  no,
  title,
  note,
  dark = false,
  small = false
}: {
  no: string;
  title: string;
  note?: string;
  dark?: boolean;
  small?: boolean;
}) {
  return (
    <header className={`flex items-end justify-between gap-6 border-b pb-3 ${dark ? "border-paper/30" : "border-ink"}`}>
      <p className="flex items-baseline gap-4">
        <span
          className={`font-display leading-[0.8] tracking-[-0.05em] ${dark ? "text-ember" : "text-signal"} ${
            small ? "text-5xl sm:text-6xl" : "text-[clamp(4rem,10vw,9rem)]"
          }`}
        >
          {no}
        </span>
        <span className="label">{title}</span>
      </p>
      {note && <p className={`label max-sm:hidden ${dark ? "text-paper/50" : "text-mute"}`}>{note}</p>}
    </header>
  );
}
