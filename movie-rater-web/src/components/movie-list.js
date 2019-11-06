import React from "react"
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function MovieList(props)
{

  const  movieClicked = movie => evt => {
      props.movieClicked(movie);
  };

  const removeClicked = movie=> {
    fetch( `${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`,{
        method:'DELETE',
        headers: {
          'Content-Type':'application/json',
          'Authorization':`Token ${props.token}`
        },
        
       }
 ).then(resp => props.movieDeleted(movie))
   
 .catch(err => console.log(err))
  };

  const editClicked = movie=> {
          props.editClicked(movie);
  }

  const newMovie = () =>{
    props.newMovie();
  }
   
    return(


       <div >  
        {
            props.movies.map ( movie =>
                { return  (
                <div key ={movie.id} className ="movie-item">
                <h3 onClick ={movieClicked(movie)}>{movie.title}</h3>
                <FontAwesomeIcon icon={faEdit} onClick ={ () => editClicked(movie)}  />
                  <FontAwesomeIcon icon={faTrash} onClick ={ () => removeClicked(movie)} />
                  </div>
                )
        }
       
    
    )
        }

        <button onClick= {newMovie}>Add Movie</button>
    </div>
    )
}

export default MovieList;
