<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { updateGenero } from '$lib/api/generos';

	let nome = '';
	let message = '';
	let messageType = '';
	let generoId: string = '';

	onMount(async () => {
		try {
			const generoIdFromParams = $page.params.id;
			generoId = generoIdFromParams;

			const res = await fetch(`http://localhost:3000/api/generos/${generoId}`);
			if (!res.ok) {
				throw new Error('Erro ao carregar o género');
			}
			const genero = await res.json();
			nome = genero.nome;
		} catch (err) {
			console.error('Erro ao carregar dados:', err);
			message = 'Não foi possível carregar os dados. Por favor, tente novamente mais tarde.';
			messageType = 'error';
		}
	});

	async function submitForm() {
		try {
			const res = await fetch(`http://localhost:3000/api/generos/${generoId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					nome
				})
			});

			if (!res.ok) {
				throw new Error('Erro ao atualizar o género');
			}

			message = 'Género atualizado com sucesso!';
			messageType = 'info';
			goto('/generos');
		} catch (err) {
			console.error('Erro ao atualizar o género:', err);
			message = 'Erro ao atualizar o género. Por favor, tente novamente mais tarde.';
			messageType = 'error';
		}
	}

	function goBack() {
		window.location.href = '/generos';
	}
</script>

<button
	class="back-button"
	on:click={goBack}
	type="button"
	aria-label="Voltar para a lista de géneros"
>
	← Voltar
</button>

<h1>Atualizar Género</h1>

<form on:submit|preventDefault={submitForm} class="submit-form">
	<label>
		Nome:
		<input type="text" bind:value={nome} required />
	</label>
	<br />
	<button type="submit" class="view-details">Atualizar Género</button>
</form>

{#if message}
	<div class={messageType === 'info' ? 'info-message' : 'error-message'}>
		{message}
	</div>
{/if}
