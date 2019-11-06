import React ,{ Component} from 'react';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-detail';
import MovieForm from './components/movie-form'
import { withCookies } from 'react-cookie';

import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './App.css';






class App extends Component {

   state ={
     movies:[],
     selectedMovies:null,
     editedMovie:null,
     token:this.props.cookies.get('mr-token')

     
   }

componentDidMount(){
  if(this.state.token){
    fetch( ' http://127.0.0.1:8000/api/movies/',{
      method:'GET',
      headers: {
        'Authorization':`Token ${this.state.token}`
      }
     }
).then(res => res.json())
 .then(res => this.setState({
   movies:res
 }))
.catch(err => console.log(err))
  }
  else{
    window.location.href = "/";
  }
  

  
  }

    loadMovie = movie =>
   {
    this.setState({
      selectedMovies:movie,
      editedMovie:null,
    })
 
   }

   movieDeleted = selMovie => {
     const movies = this.state.movies.filter( movie => movie.id !== selMovie.id);
     this.setState({ movies: movies ,selectedMovies:null   })
   }

   editClicked = selMovie => {
     this.setState({editedMovie:selMovie})
  }
  newMovie =() =>{
    this.setState({editedMovie:{title:"", description:''}})
  }

  cancelForm =() =>{
    this.setState({editedMovie:null})
 
  }

  addMovie =movie =>{
    this.setState({movies:[...this.state.movies, movie]});
 
  }
  render() {
    return (
      <div className="App">
       <h1>
       <FontAwesomeIcon icon={faFilm}  />
         <span>Movie rater</span></h1>
<div className ="layout">
       <MovieList movies ={this.state.movies} movieClicked ={this.loadMovie} movieDeleted ={this.movieDeleted} editClicked ={this.editClicked} newMovie ={this.newMovie} token= {this.state.token}/>
       <div>
         {!this.state.editedMovie ?(
          <MovieDetails movie ={this.state.selectedMovies} updateMovie = {this.loadMovie} token= {this.state.token}/>
         ):(<MovieForm movie ={this.state.editedMovie} cancelForm = {this.cancelForm}  token= {this.state.token}
          newMovie ={this.addMovie} editedMovie ={this.loadMovie}/>)
         }
       
       
       </div>
</div>
      
     

       </div>
  );
}
}


export default withCookies(App);
