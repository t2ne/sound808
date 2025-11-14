<script lang="ts">
	import { page } from '$app/stores';
	import { deleteGenero } from '$lib/api/generos';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let generoId: string | null = null;
	let confirmationMessage: string = '';
	let messageClass: string = '';
	let error: string | null = null;
	let hideButtons = false;

	onMount(() => {
		generoId = $page.params.id;
		if (generoId) {
			confirmationMessage = `Tem certeza que deseja remover este género?`;
		} else {
			confirmationMessage = 'ID inválido!';
			messageClass = 'error-message';
			error = 'Não foi possível obter o ID do género.';
		}
	});

	async function deleteGeneroConfirm() {
		if (generoId) {
			try {
				hideButtons = true;
				await deleteGenero(parseInt(generoId));
				messageClass = 'info-message';
				confirmationMessage = 'Género removido com sucesso!';
				setTimeout(() => {
					goto('/generos');
				}, 1500);
			} catch (err) {
				console.error('Erro ao remover o género:', err);
				messageClass = 'error-message';
				confirmationMessage = 'Erro ao tentar remover o género. Por favor, tente novamente.';
				hideButtons = false;
			}
		}
	}

	function cancelDelete() {
		goto('/generos');
	}
</script>

<div class="confirmation-container" style="text-align: center;">
	{#if error}
		<p class="error-message">{error}</p>
	{:else}
		<h2 style="margin-top:15%">{confirmationMessage}</h2>
		{#if messageClass}
			<p class={messageClass}></p>
		{/if}
		<div style="margin-top: 4%;">
			{#if !hideButtons}
				<button on:click={deleteGeneroConfirm} class="remove-button">Sim, remover</button>
				<button on:click={cancelDelete} class="view-details">Cancelar</button>
			{/if}
		</div>
	{/if}
</div>
