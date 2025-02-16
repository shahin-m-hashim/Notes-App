import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ThreeDots } from "react-loader-spinner";

import useStore from "store/_store";
import { getNotes } from "api/notesApi";
import EmptyNotes from "components/notes/EmptyNotes";
import NotesError from "components/notes/NotesError";

export default function NotesPage() {
  const [searchParams] = useSearchParams();
  const setNotes = useStore((state) => state.setNotes);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "ALL";

  const {
    isError,
    isFetching,
    data: notes,
  } = useQuery({
    queryFn: getNotes,
    onSuccess: (data) => setNotes(data),
    queryKey: ["notes", search, category],
  });

  if (isFetching)
    return (
      <main className="flex flex-col h-screen pt-[35vh] xs:pt-14 overflow-auto xs:pl-[140px]">
        <ThreeDots
          color="#0967d2"
          ariaLabel="loading-products"
          wrapperClass="h-3/4 flex flex-col items-center justify-center flex-1"
        />
      </main>
    );

  if (isError)
    return (
      <main className="flex flex-col h-screen pt-[35vh] xs:pt-14 overflow-auto xs:pl-[140px]">
        <NotesError />
      </main>
    );

  console.log("Rendering Notes Page");

  return (
    <main className="flex flex-col h-screen pt-[35vh] xs:pt-14 overflow-auto xs:pl-[140px]">
      {notes.length > 0 ? (
        <>TODO: Add Notes Card and pagination</>
      ) : (
        <EmptyNotes />
      )}
    </main>
  );
}
