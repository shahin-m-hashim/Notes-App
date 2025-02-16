import { Link } from "react-router";
import { logoutUser } from "api/authApi";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useMutation } from "@tanstack/react-query";

import NoteColor from "components/note/NoteColor";
import SearchNotes from "components/notes/SearchNotes";
import NotesCategory from "components/notes/NotesCategory";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => navigate("/auth/login"),
  });

  // console.log("Rendering Navbar");

  return (
    <nav className="fixed z-50 w-full bg-[#FFFAF0] border-b-2 border-b-[#e2e8f0] h-[35vh] xs:h-14">
      <div className="flex items-center justify-end py-4 xs:py-auto w-full">
        <ul className="flex px-4 items-center w-full gap-4 text-[#64748b]">
          <li className="mr-auto flex item-center gap-14">
            <Link to="/" className="hidden md:inline text-xl font-semibold">
              NotesApp
            </Link>

            {pathname === "/notes" && <SearchNotes />}
          </li>

          <li className="flex-shrink-0">
            <Link to="/">
              <img
                alt="home"
                className="xs:hidden size-6"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
              />
              <span className="hidden xs:inline">Home</span>
            </Link>
          </li>

          <li className="flex-shrink-0">
            <Link to="notes">
              <img
                alt="home"
                src="icons/note.svg"
                className="xs:hidden size-5"
              />
              <span className="hidden xs:inline">Notes</span>
            </Link>
          </li>

          <li className="flex-shrink-0">
            <Link to="archive">
              <img
                alt="home"
                src="icons/archive-box.svg"
                className="xs:hidden size-5"
              />
              <span className="hidden xs:inline">Archive</span>
            </Link>
          </li>

          <li className="flex-shrink-0 xs:bg-[#0967d2] xs:py-1 xs:px-3 rounded-md">
            <button
              type="button"
              onClick={() => mutation.mutate()}
              className="text-sm text-white cursor-pointer"
            >
              <img
                alt="home"
                className="pt-1.5 xs:hidden size-6"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              />
              <span className="hidden xs:inline">Logout</span>
            </button>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4 px-4 xs:hidden">
        <NotesCategory />
        <NoteColor />
      </div>
    </nav>
  );
}
