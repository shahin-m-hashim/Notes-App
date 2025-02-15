export default function EmptyNotes() {
  return (
    <div className="flex justify-center items-center bg-gray-200 size-full">
      <img
        alt="empty notes"
        src="images/empty-notes.png"
        className="hidden md:inline w-1/2 h-full"
      />

      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl">Empty Notes !</h1>
        <p className="text-xl">Currently, you don&apos;t have any notes.</p>

        <p className="text-2xl">How about adding one from your sidebar?</p>
      </div>
    </div>
  );
}
