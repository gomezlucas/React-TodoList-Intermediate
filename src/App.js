import React from 'react';
import Sidebar from './sidebar/sidebar'
import Editor from './editor/editor'
import SidebarItem from './sidebaritem/sidebaritem'
import './App.css';

const firebase = require('firebase')


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    }
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data()
          data['id'] = _doc.id
          return data
        })
        console.log(notes)
        this.setState({ notes })
      })
  }


  render() {
    return (
      <div className='app-container'>
        <Sidebar
          notes={this.state.notes}
          selectedNoteIndex={this.state.selectedNoteIndex}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        />

        {
          this.state.selectedNote ?
            <Editor
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.state.notes}
              updateNote={this.updateNote}
            />
            :
            null
        }

      </div>
    )
  }

  newNote = async (title) => {

    const note = {
      title: title,
      body: ''
    }

    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp()
      })

    const newID = newFromDB.id

    await this.setState({ notes: [...this.state.notes, note] })
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(note => note.id === newID)[0])

    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex })

  }

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note })

  updateNote = (id, objNote) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: objNote.title,
        body: objNote.body,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  deleteNote = async (note) => {
    const noteIndex  = this.state.notes.indexOf(note)
     
    await this.setState({notes: this.state.notes.filter(_note => _note !== note)})
    if(this.state.selectedNoteIndex === noteIndex){
       this.setState({selectedNoteIndex: null, selectedNote: null})
        }else{
          console.log('entro',   this.state.notes.length)
          this.state.notes.length > 1 ?
          this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1)
          : this.setState({selectedNoteIndex: null, selectedNote: null})
        }

        firebase
        .firestore()
        .collection('notes')
        .doc(note.id)
        .delete()

  }

}



export default App