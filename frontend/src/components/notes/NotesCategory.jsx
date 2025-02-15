const CATEGORIES = ["STUDY", "WORK", "PERSONAL", "OTHER"];

const activeCategory = "STUDY";

export default function NotesCategory() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-semibold">CATEGORY</h1>
      <div className="flex xs:flex-col items-center text-xs gap-4 xs:text-base">
        {CATEGORIES.map((category) => (
          <span
            key={category}
            style={{
              color: category === activeCategory ? "#000" : "",
            }}
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}
