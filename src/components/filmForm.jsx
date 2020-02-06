import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";

class FilmForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async populateGenres() {
    try {
      const { data: genres } = await getGenres();
      const validGenres = genres.filter(genre => genre._id !== 0);
      this.setState({ genres: validGenres });
    } catch (ex) {} //axios interceptor
  }

  async populateMovies() {
    const { match, history } = this.props;
    try {
      if (match.params.id === "new") return;

      const { data: movie } = await getMovie(match.params.id);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return history.replace("/not-foud");
    }
  }

  componentDidMount = async () => {
    await this.populateGenres();
    await this.populateMovies();
  };

  schema = {
    _id: [Joi.string().optional(), Joi.allow(null)],
    title: Joi.string()
      .required()
      .min(5),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .required()
      .integer()
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
  };

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  async handleSubmit(e) {
    super.handleSubmit(e);
    try {
      await saveMovie(this.state.data);
      this.props.history.replace("/");
    } catch (ex) {
      toast.error("Errore: " + ex.message);
    }
  }

  render() {
    const { match } = this.props;
    return (
      <div className="container">
        {match.params.id ? (
          <h1>Film id: {match.params.id}</h1>
        ) : (
          <h1>New Film</h1>
        )}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", true, "text")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Stock", false, "number")}
          {this.renderInput("dailyRentalRate", "Rate", false, "number")}
          {this.renderSubmitButton("Save")}
        </form>
      </div>
    );
  }
}

export default FilmForm;
