type LegendProps = {
  color: string;
  label: string;
};

export function Legend({ color, label }: LegendProps) {
  return (
    <span className="flex items-center gap-2">
      <span className={`size-3 rounded-full ${color}`} /> {label}
    </span>
  );
}
