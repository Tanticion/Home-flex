import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

const moviePage = (props) => {
	const rawData = props.parsedLinks;
	const links = JSON.parse(rawData).results;

	const rawInfo = props.movieInfoParsed;
	const info = JSON.parse(rawInfo);

	return (
		<div>
            <a href="/"> Home</a>
			<section className={styles.movieSection}>
				<table className={styles.movieTable}>
					<tr>
						<th>Movie Name</th>
						<td>{info.original_title}</td>
					</tr>
                    <tr>
						<th>overview</th>
						<td>{info.overview}</td>
					</tr>
                    <tr>
						<th>Release date</th>
						<td>{info.release_date}</td>
					</tr>
                    <tr>
						<th>Budget</th>
						<td>{info.budget} dollars</td>
					</tr>
                    <tr>
						<th>IMDB rating</th>
						<td>{info.vote_average}</td>
					</tr>
                    <tr>
						<th>Quality</th>
						<td>{links[0].quality}</td>
					</tr>
				</table>
				
			</section>
			<div className={styles.frame}>
				<iframe src={links[0].url} allowFullScreen width="1000" height="600" />
			</div>
		</div>
	);
};
export default moviePage;

export async function getServerSideProps(context) {
	const id = context.query.tmdb;
	const res = await fetch(
		`https://seapi.link/?type=tmdb&id=${id}&max_results=1`
	);
	const data = await res.json();
	const parsedLinks = JSON.stringify(data);

	const movieInfoReq = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=0bc134a386af1a7d389db94eb0bb11dc&language=en-US`
	);
	const movieInfo = await movieInfoReq.json();
	const movieInfoParsed = JSON.stringify(movieInfo);
	return {
		props: { parsedLinks, movieInfoParsed }, // will be passed to the page component as props
	};
}
