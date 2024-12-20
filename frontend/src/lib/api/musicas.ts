// lib/api/musicas.ts

export type Musica = {
	id: number;
	nome: string;
	tempo: string;
	id_album: number;
  }
  
  // Fetch all musicas
  export async function getMusicas(): Promise<Musica[]> {
	const res = await fetch('http://localhost:3000/api/musicas');
	if (!res.ok) throw new Error('Erro no fetch de músicas...');
	return await res.json();
  }
  
  // Add a new musica
  export async function addMusica(musica: Omit<Musica, 'id'>): Promise<Musica> {
	const res = await fetch('http://localhost:3000/api/musicas', {
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify(musica),
	});
  
	if (!res.ok) throw new Error('Erro na adição da música...');
	return await res.json();
  }
  
  // Update an existing musica
  export async function updateMusica(id: number, musica: Musica): Promise<Musica> {
	const res = await fetch(`http://localhost:3000/api/musicas/${id}`, {
	  method: 'PUT',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify(musica),
	});
  
	if (!res.ok) throw new Error('Erro no update da música...');
	return await res.json();
  }
  
  // Delete a musica
  export async function deleteMusica(id: number): Promise<void> {
	const res = await fetch(`http://localhost:3000/api/musicas/${id}`, {
	  method: 'DELETE',
	});
  
	if (!res.ok) throw new Error('Erro na remoção da música...');
  }
  
// Fetch a musica by its ID
export async function getMusicaById(id: number): Promise<Musica> {
	const res = await fetch(`http://localhost:3000/api/musicas/${id}`);
	if (!res.ok) throw new Error('Erro no fetch da música...');
	return await res.json();
  }
  