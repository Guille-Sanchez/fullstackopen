import Note from './components/Note'

const App = ({ notes }) => {
  const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled')
  }
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} toggleImportance={toggleImportanceOf} />
        )}
      </ul>
    </div>
  )
}

export default App