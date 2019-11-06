import React,{Component } from 'react'

class MovieForm extends Component{

 state ={
   editedMovie: this.props.movie
 }
 
  cancelledClicked = () =>{
      this.props.cancelForm();
  }

  inputChanged = event => {
   let movie = this.state.editedMovie;
   movie[event.target.name]= event.target.value;
   this.setState({
       editedMovie:movie
   })
  }

  saveClicked = () =>{
    console.log(this.state.editedMovie)

    fetch( `${process.env.REACT_APP_API_URL}/api/movies/`,{
        method:'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization':`Token ${this.props.token}`
        },
        body: JSON.stringify(this.state.editedMovie)
       }
 ).then(resp => resp.json())
   .then(res =>this.props.newMovie(res))
 .catch(err => console.log(err))
}

updateClicked = () =>{
    console.log(this.state.editedMovie)

    fetch( `${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`,{
        method:'PUT',
        headers: {
          'Content-Type':'application/json',
          'Authorization':`Token ${this.props.token}`
        },
        body: JSON.stringify(this.state.editedMovie)
       }
 ).then(resp => resp.json())
   .then(res =>this.props.editedMovie(res))
 .catch(err => console.log(err))
}
 render()
 {

    const isDisabled = this.state.editedMovie.title.length ===0 || this.state.editedMovie.description.length ===0;
     return(
         <React.Fragment>
             <span>Title</span><br />
             <input type="text" name ="title" value ={this.props.movie.title} 
             onChange ={this.inputChanged}/>
             <span>Description</span><br />
             <textarea value ={this.props.movie.description} name="description" 
             onChange ={this.inputChanged}></textarea>

            {this.props.movie.id ?<button  disabled ={isDisabled}onClick ={this.updateClicked} >Update</button>: 
             <button  disabled ={isDisabled} onClick ={this.saveClicked} >Save</button>}
            &nbsp;
             <button onClick = {this.cancelledClicked} >Cancel</button>
         </React.Fragment>
     )
 }
}

export default MovieForm;