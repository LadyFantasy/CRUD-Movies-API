
class MovieController {

    constructor(movieService) {
        this.movieService = movieService
    }

    async getMovies(req, res) {
        let page = req.query.page ? req.query.page : 1

        const movies = await this.movieService.getMovies(page)

        return res.json(movies)
    }

    async getMoviesById(req, res) {
        const id = req.params.id

        const movies = await this.movieService.getMoviesById(id)

        return res.json(movies)
    }


    async addMovie(req, res) {
        const body = req.body
        const uploadedImage = req.file.filename
        const newBody = {...body, image: uploadedImage}
        
        const addMovie = await this.movieService.addMovie(newBody)

        return res.json({
            body:req.body,
            image:req.file
            })
    }

}


module.exports = MovieController