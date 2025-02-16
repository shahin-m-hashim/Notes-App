import useStore from "store/_store";

export const COLORS = ["#fec971", "#fe9b72", "#b693fd", "#e4ef90", "#00d4fe"];

export default function NoteColor() {
  const showCreateNewNoteModal = useStore(
    (store) => store.showCreateNewNoteModal
  );

  return (
    <div className="flex gap-4 flex-col">
      <h1 className="font-semibold">CREATE</h1>

      <div className="flex xs:flex-col gap-2 xs:gap-4 overflow-x-auto">
        {COLORS.map((color) => (
          <button
            key={color}
            onClick={() => showCreateNewNoteModal(color)}
            className="cursor-pointer flex items-center gap-4 bg-[#e8e9eb] p-2"
          >
            <div
              style={{ backgroundColor: color }}
              className=" rounded-full size-3 xs:size-5"
            />
            <span className="text-xs xs:text-base">NOTE</span>
          </button>
        ))}
      </div>
    </div>
  );
}
