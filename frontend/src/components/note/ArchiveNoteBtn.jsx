import { useMutation } from "@tanstack/react-query";

import { archiveNote } from "api/noteApi";
import { useSearchParams } from "react-router";
import queryClient from "config/queryClientConfig";

export default function ArchiveNoteBtn({ id, isArchived }) {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "ALL";

  const mutation = useMutation({
    mutationFn: () => archiveNote(id),
    onSuccess: () => {
      queryClient.refetchQueries(["archive", page]);
      queryClient.refetchQueries(["notes", search, category, page]);
    },
  });

  return (
    <button
      type="button"
      onClick={mutation.mutate}
      className="bg-black cursor-pointer size-8 rounded-full flex items-center justify-center"
    >
      <img
        alt="unarchive"
        className="p-2.5"
        src={isArchived ? "icons/unarchive.svg" : "icons/archive.svg"}
      />
    </button>
  );
}
