import Note from "components/notes/Note";
import EmptyNotes from "components/notes/EmptyNotes";
import Pagination from "components/notes/Pagination";

const notes = [
  {
    pinned: true,
    archived: false,
    title: "Grocery List",
    content: "Buy milk, eggs, bread, and fruits.",
    category: "PERSONAL",
    color: "#fec971",
    createdAt: Date.now(),
  },
  {
    pinned: false,
    archived: false,
    title: "Meeting Notes",
    content: "Discuss project timelines and deliverables.",
    category: "WORK",
    color: "#fe9b72",
    createdAt: Date.now(),
  },
  {
    pinned: false,
    archived: false,
    title: "Study Plan",
    content: "Complete React and Zustand tutorials this week.",
    category: "STUDY",
    color: "#b693fd",
    createdAt: Date.now(),
  },
  {
    pinned: true,
    archived: false,
    title: "Vacation Ideas",
    content: "Research destinations for summer break.",
    category: "PERSONAL",
    color: "#00d4fe",
    createdAt: Date.now(),
  },
  {
    pinned: false,
    archived: true,
    title: "Old Project Notes",
    content: "Review deprecated features and code cleanup.",
    category: "WORK",
    color: "#fe9b72",
    createdAt: Date.now(),
  },
  {
    pinned: false,
    archived: false,
    title: "Book List",
    content: "Read 'Clean Code' and 'You Don't Know JS'.",
    category: "STUDY",
    color: "#b693fd",
    createdAt: Date.now(),
  },
  {
    pinned: true,
    archived: false,
    title: "Birthday Reminder",
    content: "Don't forget Mom's birthday on March 5th.",
    category: "PERSONAL",
    color: "#00d4fe",
    createdAt: Date.now(),
  },
  {
    pinned: false,
    archived: false,
    title: "Work Tasks",
    content: "Complete frontend integration and bug fixes.",
    category: "WORK",
    color: "#fe9b72",
    createdAt: Date.now(),
  },
  {
    pinned: false,
    archived: false,
    title: "Shopping List",
    content: "New headphones, charger, and notebook.",
    category: "PERSONAL",
    color: "#fec971",
    createdAt: Date.now(),
  },
  {
    pinned: false,
    archived: true,
    title: "Archived Note",
    content: "This is an old archived note for testing.",
    category: "OTHER",
    color: "#e4ef90",
    createdAt: Date.now(),
  },
];

export default function NotesPage() {
  // console.log("Rendering Notes Page");

  return (
    <main className="flex flex-col h-screen pt-[35vh] xs:pt-14 overflow-auto xs:pl-[140px]">
      {notes.length > 0 ? (
        <div className="p-4 flex flex-col gap-4 justify-between flex-1">
          <ul className="grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {notes.map((note, id) => (
              <Note key={id} note={note} />
            ))}
          </ul>

          <Pagination />
        </div>
      ) : (
        <EmptyNotes />
      )}
    </main>
  );
}
