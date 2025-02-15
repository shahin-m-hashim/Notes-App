import { cn } from "utils/cn";

const activePage = 1;

export default function Pagination() {
  return (
    <ul className="flex items-center justify-center gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <li
          key={i}
          className={cn(
            i + 1 === activePage ? "bg-green-500" : "bg-black text-white",
            "flex items-center cursor-not-allowed font-semibold justify-center text-xs size-6 rounded-full"
          )}
        >
          {i + 1}
        </li>
      ))}
    </ul>
  );
}
