<script>
	import { goto } from '$app/navigation'; // Importando a função de navegação
</script>

<!-- Navbar -->
<nav>
	<!-- Logo clicável que leva à página inicial -->
	<button class="logo" on:click={() => goto('/')} type="button">Sound808</button>
	<ul>
		<li><a href="/musicas">Músicas</a></li>
		<li><a href="/generos">Géneros</a></li>
		<li><a href="/artistas">Artistas</a></li>
		<li><a href="/albuns">Álbuns</a></li>
	</ul>
</nav>

<!-- Corpo do conteúdo -->
<main>
	<slot></slot>
	<!-- Aqui ficará o conteúdo das páginas específicas -->
</main>

<!-- Footer -->
<footer>
	<p>t8ne - cyzuko - eduardoc0uto</p>
</footer>

<!-- Importar o global.css -->
<style>
	@import '../global.css';
</style>
