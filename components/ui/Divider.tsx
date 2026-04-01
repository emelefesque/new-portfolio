export default function Divider({ className = "" }: { className?: string }) {
  return (
    <hr
      aria-hidden="true"
      className={`border-none border-t border-[rgba(242,227,213,0.12)] my-12 ${className}`}
      style={{ borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: "rgba(242,227,213,0.12)" }}
    />
  );
}
