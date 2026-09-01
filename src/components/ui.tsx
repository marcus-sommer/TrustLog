import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export function Label({
  children,
  hint,
  htmlFor,
}: {
  children: ReactNode;
  hint?: string;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="block text-[13px] font-medium text-ink">{children}</span>
      {hint ? <span className="mt-0.5 block text-[12.5px] leading-5 text-muted">{hint}</span> : null}
    </label>
  );
}

export function TextField({
  label,
  hint,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <div className="grid gap-1.5">
      <Label hint={hint}>{label}</Label>
      <input
        {...props}
        className={`h-11 w-full rounded-lg border border-line bg-raised px-3 text-[15px] text-ink outline-none transition placeholder:text-muted/70 focus:border-accent ${className}`}
      />
    </div>
  );
}

export function TextArea({
  label,
  hint,
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; hint?: string }) {
  return (
    <div className="grid gap-1.5">
      <Label hint={hint}>{label}</Label>
      <textarea
        {...props}
        className={`min-h-[88px] w-full resize-y rounded-lg border border-line bg-raised px-3 py-2.5 text-[15px] leading-6 text-ink outline-none transition placeholder:text-muted/70 focus:border-accent ${className}`}
      />
    </div>
  );
}

export function SelectField({
  label,
  hint,
  children,
  className = "",
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label hint={hint}>{label}</Label>
      <select
        {...props}
        className={`h-11 w-full rounded-lg border border-line bg-raised px-3 text-[15px] text-ink outline-none focus:border-accent ${className}`}
      >
        {children}
      </select>
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "blue" | "paper";
}) {
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover",
    secondary: "bg-raised text-ink border border-line hover:bg-paper",
    ghost: "text-ink-soft hover:bg-accent-soft/60",
    outline:
      "border border-transparent bg-transparent text-ink-soft hover:text-ink hover:bg-accent-soft/50",
    danger: "bg-danger/10 text-danger hover:bg-danger/15",
    blue: "bg-[#2563eb] text-white hover:bg-[#1d4ed8]",
    paper: "bg-paper text-ink hover:bg-raised",
  };
  return (
    <button
      {...props}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-[14px] font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function ChoiceCard({
  selected,
  title,
  hint,
  onClick,
  children,
}: {
  selected: boolean;
  title: string;
  hint?: string;
  onClick: () => void;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-3.5 text-left transition ${
        selected
          ? "border-accent bg-accent-soft"
          : "border-line bg-raised hover:border-ink/20"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[14px] font-medium text-ink">{title}</div>
          {hint ? <div className="mt-0.5 text-[12.5px] leading-5 text-muted">{hint}</div> : null}
          {children}
        </div>
        <span
          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px] ${
            selected ? "border-accent bg-accent text-white" : "border-line text-transparent"
          }`}
        >
          ✓
        </span>
      </div>
    </button>
  );
}

export function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[13px] transition ${
        selected
          ? "border-accent bg-accent text-white"
          : "border-line bg-raised text-ink-soft hover:border-ink/20"
      }`}
    >
      {children}
    </button>
  );
}

export function Tip({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-xl border border-line bg-accent-soft/50 px-4 py-3.5 text-[13px] leading-5 text-ink-soft">
      {children}
    </aside>
  );
}

export function SectionTitle({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="max-w-2xl">
      {kicker ? (
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">{kicker}</p>
      ) : null}
      <h1 className="mt-2 font-serif text-[32px] leading-10 tracking-tight text-ink">{title}</h1>
      {children ? <div className="mt-3 text-[15px] leading-7 text-ink-soft">{children}</div> : null}
    </header>
  );
}
