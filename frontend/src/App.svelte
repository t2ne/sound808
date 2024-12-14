<script>
  export let name;
  let movies = [];

  fetch("http://localhost:3000/api/movies") // Update this URL if needed
    .then((res) => res.json())
    .then((data) => {
      movies = data;
    });
</script>

<h1>Movies</h1>
<ul>
  {#each movies as movie}
    <li>{movie.title}</li>
  {/each}
</ul>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
