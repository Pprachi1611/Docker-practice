const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'notes.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data folder and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

function readNotes() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw || '[]');
}

function writeNotes(notes) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
}

// Get all notes
app.get('/api/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// Add a note
app.post('/api/notes', (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Note text is required' });
  }

  const notes = readNotes();
  const newNote = {
    id: Date.now().toString(),
    text: text.trim(),
    createdAt: new Date().toISOString()
  };

  notes.push(newNote);
  writeNotes(notes);
  res.status(201).json(newNote);
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  let notes = readNotes();
  const exists = notes.some(note => note.id === id);

  if (!exists) {
    return res.status(404).json({ error: 'Note not found' });
  }

  notes = notes.filter(note => note.id !== id);
  writeNotes(notes);
  res.json({ message: 'Note deleted' });
});

app.listen(PORT, () => {
  console.log(`Notes app running on http://localhost:${PORT}`);
});