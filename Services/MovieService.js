const Movie = require("../models/Movie")


class MovieService {

    constructor(){
        this.limit = 15
    }

    getMovies(page) {
      
        const skip = (page - 1) * this.limit
        const query = Movie.find().skip(skip).limit(this.limit).exec() 

        return query
    }


    getMoviesById(id) {
        const query = Movie.findOne({name:id}).exec() //searches by name in db
        
        return query      
    }

    
    addMovie(newBody) {
        const newMovie = new Movie(newBody)

        return newMovie.save()
    }
}

module.exports = MovieService
