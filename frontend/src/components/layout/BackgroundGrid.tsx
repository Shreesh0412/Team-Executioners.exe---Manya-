export default function BackgroundGrid() {
  return (
    <div
      className="
      fixed
      inset-0
      -z-20
      pointer-events-none
      opacity-30
      "
    >
      <div
        className="
        absolute
        inset-0
        bg-[linear-gradient(to_right,#e2e8f020_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f020_1px,transparent_1px)]
        bg-[size:60px_60px]
        "
      />
    </div>
  );
}