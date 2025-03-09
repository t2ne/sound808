<script>
	import { goto } from '$app/navigation';
</script>

<head>
	<title>Sound808</title>
</head>

<nav>
	<button class="logo" on:click={() => goto('/')} type="button">Sound808</button>
	<ul>
		<li><a href="/musicas">Músicas</a></li>
		<li><a href="/generos">Géneros</a></li>
		<li><a href="/artistas">Artistas</a></li>
		<li><a href="/albuns">Álbuns</a></li>
	</ul>
</nav>

<main>
	<slot></slot>
</main>

<footer>
	<p>t2ne - 2025</p>
</footer>

<style>
	@import '../global.css';
</style>
