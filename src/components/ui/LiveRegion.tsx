type LiveRegionProps = {
  assertive?: boolean;
  message?: string;
};

export function LiveRegion({
  assertive = false,
  message,
}: LiveRegionProps) {
  return (
    <div
      aria-atomic="true"
      aria-live={assertive ? "assertive" : "polite"}
      className="sr-only"
      role={assertive ? "alert" : "status"}
    >
      {message}
    </div>
  );
}
