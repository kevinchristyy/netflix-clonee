import React from "react";
import Banner from "../Banner";
import "./Homescreen.css";
import Nav from "../Nav";
import Row from "../Row";
import requets from "../Requests";

function Homescreen() {
  return (
    <div className="homeScreen">
      <Nav />

      <Banner />

      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requets.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requets.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requets.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requets.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requets.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requets.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requets.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requets.fetchDocumentaries} />
    </div>
  );
}

export default Homescreen;
