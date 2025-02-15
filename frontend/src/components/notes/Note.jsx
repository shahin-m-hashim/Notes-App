import { cn } from "utils/cn";

export default function Note({ note }) {
  return (
    <li
      style={{ backgroundColor: note.color }}
      className="relative p-4 flex flex-col justify-between h-[250px] border border-gray-200 rounded-lg shadow-md"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold underline underline-offset-4">
          {note.title}
        </h2>
        <p>{note.content}</p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold">{note.category}</p>
        <p className="text-sm">
          {new Date(note.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="absolute top-2 right-2">
        <button
          type="button"
          className="bg-[#0a0806] size-8 rounded-full flex items-center justify-center"
        >
          <img alt="edit note" className="p-2.5" src="icons/pencil.svg" />
        </button>
      </div>

      <div className="absolute bottom-2 right-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="bg-[#0a0806] size-8 rounded-full flex items-center justify-center"
          >
            {note.pinned ? (
              <img alt="archive" className="p-2.5" src="icons/unpin.svg" />
            ) : (
              <img alt="archive" className="p-2.5" src="icons/pin.svg" />
            )}
          </button>

          <button
            type="button"
            className="bg-black size-8 rounded-full flex items-center justify-center"
          >
            {note.archived ? (
              <img alt="archive" className="p-2.5" src="icons/unarchive.svg" />
            ) : (
              <img alt="unarchive" className="p-2.5" src="icons/archive.svg" />
            )}
          </button>
        </div>
      </div>
    </li>
  );
}
