import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

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

  componentDidMount = () => {
    const { match, history } = this.props;

    const genres = getGenres();
    this.setState({ genres });

    if (match.params.id === "new") return;

    const movie = getMovie(match.params.id);
    if (!movie) return history.replace("/not-foud");

    this.setState({ data: this.mapToViewModel(movie) });
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    _id: [Joi.string().optional(), Joi.allow(null)],
    title: Joi.string().required(),
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

  handleSubmit(e) {
    super.handleSubmit(e);
    saveMovie(this.state.data);
    this.props.history.replace("/");
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
