import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class FilmsTable extends Component {
  columns = [
    {
      _id: "titleId",
      title: "Title",
      path: "title",
      content: film => (
        <Link key={"lk" + film._id} to={`/movies/${film._id}`}>
          {film.title}
        </Link>
      )
    },
    { _id: "genreId", title: "Genre", path: "genre.name" },
    { _id: "stockId", title: "Stock", path: "numberInStock" },
    { _id: "reviewId", title: "Review", path: "dailyRentalRate" },
    {
      _id: "likeId",
      content: film => (
        <Like
          key={"lk" + film._id}
          film={film}
          onClick={film => this.props.onLike(film)}
        />
      )
    }
  ];

  deleteColumn = {
    _id: "deleteId",
    content: film => (
      <button
        key={"btn" + film._id}
        className="btn btn-danger"
        onClick={() => this.props.onDelete(film)}
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const currentUser = auth.loggedUser;
    if (currentUser && currentUser.isAdmin)
      this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies: items, sortColumn, onSort } = this.props;
    return (
      <Table
        items={items}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        itemIdProperty="_id"
        colIdProperty="_id"
      />
    );
  }
}

export default FilmsTable;
