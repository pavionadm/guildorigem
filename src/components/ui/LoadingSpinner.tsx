export default function LoadingSpinner({ label }: { label?: string }): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-mist">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold-light"
        role="status"
        aria-label={label ?? "Carregando"}
      />
      {label ? <p className="text-sm">{label}</p> : null}
    </div>
  );
}
