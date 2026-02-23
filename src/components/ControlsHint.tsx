import clsx from "clsx"

export interface ControlsHintProps {
  /** List of keys or buttons to show, e.g. ['W', 'S', 'ENTER'] or ['D-Pad', 'A'] */
  items: string[];
  /** Label before the list. Default "CONTROLS:". */
  label?: string;
  /** Hide on mobile (small viewport). Default true. */
  hideOnMobile?: boolean;
  className?: string;
}

const ControlsHint = ({
  items,
  label = "CONTROLS:",
  hideOnMobile = true,
  className,
}: ControlsHintProps) => {
  if (items.length === 0) return null

  return (
    <div
      className={clsx(
        "absolute bottom-5 right-5 bg-black text-white p-4 rounded-lg text-xs font-mono opacity-50",
        hideOnMobile && "hidden md:flex",
        className
      )}
    >
      <span className="mr-2">{label}</span>
      {items.map((item) => (
        <span key={item} className="mx-0.5">
          [{item}]
        </span>
      ))}
    </div>
  )
}

export default ControlsHint
