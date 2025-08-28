export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-purple-300/40 via-purple-200/40 to-purple-300/40 rounded ${className}`}
    ></div>
  );
}
