
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../sidebaritem/sidebaritem'
 
class SidebarComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            addingNote: false,
            title: ''
        }
    }
    render() {
        const { classes, notes, selectedNoteIndex } = this.props
       
        if (notes) {
            return (
                <div className={classes.sidebarContainer}>
                    <Button
                        onClick={this.newNoteBtnClick}
                        className={classes.newNoteBtn}
                    >
                        {
                            this.state.addingNote ? "Cancel" : "New Note"
                        }
    
    
                    </Button>
                    {
                        this.state.addingNote ?
                            <div>
                                <input type='text'
                                    className={classes.newNoteInput}
                                    placeholder='Insert title of the note'
                                    onKeyUp={(event) => this.updateTitle(event.target.value)}
                                />
                                <Button
                                    className={classes.newNoteSubmitBtn}
                                    onClick={this.newNoteSubmitBtn}
                                >Submit </Button>
                            </div>
                            :
                            null
                    }
                    <List>
                        {
                            notes.map((note, index) => {
                                return (
                                    <div key={index}>
                                        <SidebarItem 
                                        note={note}
                                        index={index}
                                        selectedNoteIndex={selectedNoteIndex}
                                        selectNote={this.selectNote}
                                        deleteNote={this.deleteNote}
                                        />
                                    </div>
                                )
                            })
                        }
                    </List>
                </div>
            )
        }else{
           return(<div></div>)
        }

    }

    newNoteBtnClick = () => {
        console.log(this.state)
        this.setState({title: '',  addingNote: !this.state.addingNote })
     }

    updateTitle = (e) => {
        console.log(e)
        this.setState({ title: e })
    }

    newNoteSubmitBtn = () => {
        console.log(this.state)
        this.props.newNote(this.state.title)
      this.setState({title: null, addingNote:false})
    }

    selectNote = (n , i) => { 
        console.log('entro', this.props)
      this.props.selectNote(n, i)
    }

    deleteNote = (n) => {
                this.props.deleteNote(n)
        
    }

}

export default withStyles(styles)(SidebarComponent)