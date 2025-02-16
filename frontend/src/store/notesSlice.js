const createNotesSlice = (set) => ({
  notesSlice: {
    total: 0,
    notes: null,
  },

  setNotes: (notes) =>
    set(
      (state) => {
        state.notesSlice.notes = notes;
        state.notesSlice.total = notes.length;
      },
      undefined,
      "setNotes"
    ),
});

export default createNotesSlice;
