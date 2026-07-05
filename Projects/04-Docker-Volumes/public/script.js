const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

async function fetchNotes() {
  const res = await fetch('/api/notes');
  const notes = await res.json();
  renderNotes(notes);
}

function renderNotes(notes) {
  notesList.innerHTML = '';

  if (notes.length === 0) {
    notesList.innerHTML = '<div class="empty-state">No notes yet. Add one above 👆</div>';
    return;
  }

  notes
    .slice()
    .reverse()
    .forEach(note => {
      const card = document.createElement('div');
      card.className = 'note-card';

      const date = new Date(note.createdAt).toLocaleString();

      card.innerHTML = `
        <div>
          <div class="note-text">${escapeHtml(note.text)}</div>
          <div class="note-date">${date}</div>
        </div>
        <button class="delete-btn" data-id="${note.id}">Delete</button>
      `;

      notesList.appendChild(card);
    });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();
  if (!text) return;

  await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  noteInput.value = '';
  fetchNotes();
});

notesList.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    fetchNotes();
  }
});

fetchNotes();