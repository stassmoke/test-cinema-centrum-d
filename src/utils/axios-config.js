import axios from 'axios';

export default axios.interceptors.request.use(config => {
	config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDUxZGI4OTkyMjdlM2M2MGU2NzE1ZThkNDRjZWY0ZiIsInN1YiI6IjY0YTFkNTRkYzM5MGM1MDBlYjM1OTk1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H-wdWYhixLQoc5pekdmAZ4n0CHg86ouWE4UjM9BFUaM';
	return config;
});


// Api https://developer.themoviedb.org/
// Imdb not working https://imdb-api.com/	
// "Unfortunately, due to abuse by some users, the free plan (test account) will be removed from the site from July 1, 2023."