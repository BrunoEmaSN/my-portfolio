import clsx from "clsx"

export interface ControlsHintProps {
  /** Lista de teclas o botones a mostrar, p. ej. ['W', 'S', 'ENTER'] o ['D-Pad', 'A'] */
  items: string[];
  /** Etiqueta previa a la lista. Por defecto "CONTROLS:" */
  label?: string;
  /** No mostrar en móvil (ocultar en viewport pequeño). Por defecto true. */
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
