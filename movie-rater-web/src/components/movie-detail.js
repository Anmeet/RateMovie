import React, {Component} from 'react'

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class MovieDetails extends Component {
    
  state ={
    highlighted:-1
  }
  

  highlightRate = high =>(evt)=>{
    this.setState({
      highlighted:high
    })
  }

  rateClicked = star => evt =>{

      fetch( `${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/rate_movie/`,{
         method:'POST',
         headers: {
           'Content-Type':'application/json',
           'Authorization':`Token ${this.props.token}`
         },
         body: JSON.stringify({stars:star+1})
        }
  ).then(resp => resp.json())
    .then(res =>this.getDetails())
  .catch(err => console.log(err))

  }

getDetails =()=> {
  fetch( `${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`,{
    method:'GET',
    headers: {
      'Content-Type':'application/json',
      'Authorization':`Token ${this.props.token}`
    }
  
   }
).then(resp => resp.json())
.then(res => this.props.updateMovie(res))
.catch(err => console.log(err))


}

  render(){

    const mov = this.props.movie;
      return (
          <React.Fragment>
          {
         mov ? (
           <div>
      <h3>{mov.title}</h3>
      <FontAwesomeIcon icon={faStar} className ={mov.avg_ratings > 0 ? 'orange':''} />
      <FontAwesomeIcon icon={faStar}  className ={mov.avg_ratings > 1 ? 'orange':''}/>
      <FontAwesomeIcon icon={faStar}  className ={mov.avg_ratings > 2 ? 'orange':''}/>
      <FontAwesomeIcon icon={faStar}  className ={mov.avg_ratings > 3 ? 'orange':''}/>
      <FontAwesomeIcon icon={faStar}  className ={mov.avg_ratings > 4 ? 'orange':''}/>
      {mov.no_of_ratings}
 

     
     
      <p>{mov.description}</p>

      <div className = "rate-container">
        <h2>Rate It!!!</h2>
        {
          [...Array(5)].map ((e,i) => {
            return <FontAwesomeIcon icon={faStar} key={i} className ={this.state.highlighted > i-1 ? 'purple':''} onMouseEnter ={this.highlightRate(i)}
            onMouseLeave={this.highlightRate(-1)} onClick={this.rateClicked(i)}/>
          })
        }
{}

      </div>
      </div>
      ):null
          }

       </React.Fragment>
      )  
  }
}

export default MovieDetails;