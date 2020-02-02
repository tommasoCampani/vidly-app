import React, { Component } from "react";
import FilmsTable from "./filmsTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import { Link } from "react-router-dom";
import { paginate } from "../utils/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { toast } from "react-toastify";
import _ from "lodash";

class Film extends Component {
  getSortCol = () => {
    const sortTitle = sessionStorage.getItem("sortTitle")
      ? sessionStorage.getItem("sortTitle")
      : "title";
    const sortOrder = sessionStorage.getItem("sortOrder")
      ? sessionStorage.getItem("sortOrder")
      : "asc";

    return { path: sortTitle, order: sortOrder };
  };

  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    currentGenre: { _id: 0, name: "Tutti" },
    sortColumn: this.getSortCol(),
    search: ""
  };

  componentDidMount = () => {
    this.setState({ movies: getMovies(), genres: getGenres() });
    toast("Welcome to vidly", { position: "top-center" });
    toast.error("Error message");
    toast.info("Info message");
    toast.warn("Warning message");
    toast.success("Success message");
  };

  handleDeleteFilm = movie => {
    let films = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: films });
  };

  handleLikeClick = movie => {
    const filmsCopy = [...this.state.movies];
    const filmIndex = filmsCopy.indexOf(movie);

    filmsCopy[filmIndex] = { ...movie };
    filmsCopy[filmIndex].liked = !filmsCopy[filmIndex].liked;

    this.setState({ movies: filmsCopy });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    this.setState({
      currentPage: 1,
      currentGenre: genre,
      search: ""
    });
  };

  handleOnSearch = ({ currentTarget: input }) => {
    this.setState({
      currentPage: 1,
      search: input.value,
      currentGenre: { _id: 0, name: "Tutti" }
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  paginateData = () => {
    const {
      currentPage,
      currentGenre,
      pageSize,
      sortColumn,
      movies: allMovies,
      search
    } = this.state;

    let filteredData = [...allMovies];

    if (currentGenre._id !== 0) {
      filteredData = filteredData.filter(
        item => item.genre._id === currentGenre._id
      );
    } else if (search) {
      filteredData = filteredData.filter(item =>
        item.title.toUpperCase().includes(search.toUpperCase())
      );
    }

    const orderedData = _.orderBy(
      filteredData,
      [sortColumn.path],
      [sortColumn.order]
    );

    const results = paginate(orderedData, currentPage, pageSize);

    return { resultsCount: filteredData.length, results: results };
  };

  render() {
    const { length: filmsCount } = this.state.movies;
    const {
      currentPage,
      currentGenre,
      pageSize,
      sortColumn,
      genres: allGenres,
      search
    } = this.state;

    if (filmsCount <= 0) return <h4>Non ci sono films nel database!</h4>;

    //Filter, sort and paginate data
    const { resultsCount, results: movies } = this.paginateData();

    return (
      <main style={{ marginTop: 20 }} className="container">
        <div className="row">
          <div className="col-md-3">
            <ListGroup
              items={allGenres}
              selectedItem={currentGenre}
              onItemSelect={this.handleGenreChange}
            />
          </div>
          <div className="col">
            <Link
              style={{ marginBottom: 20 }}
              className="btn btn-primary"
              to="/movies/new"
            >
              New Film
            </Link>
            <h6 style={{ marginBottom: 15 }}>
              Visualizzando {resultsCount} films in lista
            </h6>
            <SearchBox
              value={search}
              onChange={this.handleOnSearch}
            ></SearchBox>
            <FilmsTable
              movies={movies}
              onDelete={this.handleDeleteFilm}
              onLike={this.handleLikeClick}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              totalRows={resultsCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Film;
