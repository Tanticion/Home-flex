import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
	const [movies, setMovies] = useState([]);

  const movieClicked = (id) => (
    window.location.href = `/${id}`


  )
	const inputChanged = async (e) => {
		let query = e.target.value;
		if (query !== "") {
			const fetched = await fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=0bc134a386af1a7d389db94eb0bb11dc&language=en-US&query=${query}&page=1&include_adult=false`
			);
			let data = await fetched.json();
			setMovies(data.results);
			console.log(data.results);
		}
	};

	return (
		<div>
			<input
				type="text"
				id="fname"
				name="fname"
				onChange={(e) => {
					inputChanged(e);
				}}
				className={styles.input}
				placeholder="Movie name"
			/>
			<div className={styles.container}>
				{movies.map((movie, index) => {
					if (movie.poster_path !== null) {
						return (
							<div key={index} className={styles.card} onClick={() => {
                movieClicked(movie.id)
              }}>
								<img
									src={"https://image.tmdb.org/t/p/w154/" + movie.poster_path}
									className={styles.h4}
								/>
								<h4 className={styles.title}>{movie.original_title}</h4>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
}
