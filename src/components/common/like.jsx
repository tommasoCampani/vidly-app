import React from "react";

function Like(props) {
  let getLikeStateClass = () => {
    const classes = "fa fa-heart";
    return props.film.liked ? classes : classes + "-o";
  };

  return (
    <i
      onClick={() => props.onClick(props.film)}
      className={getLikeStateClass()}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
    ></i>
  );
}

export default Like;
