import NoteColor from "components/notes/NoteColor";
import NotesCategory from "components/notes/NotesCategory";

export default function Sidebar() {
  // console.log("Rendering Sidebar");

  return (
    <nav className="hidden xs:block fixed z-40 left-0 p-4 mt-14 bg-[#FFFAF0] w-[80px] xs:w-[140px] border-r-2 border-r-[#e2e8f0] h-[calc(100vh-3.5rem)]">
      <div className="h-full flex flex-col items-center gap-6">
        <div className="flex flex-col justify-center flex-1 gap-10">
          <NotesCategory />

          <NoteColor />
        </div>
      </div>
    </nav>
  );
}
