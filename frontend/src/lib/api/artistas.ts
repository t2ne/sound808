export type Artista = {
    id: number;
    nome: string;
    idade: number;
    nacionalidade: string;
  }
  
  export async function getArtistas(): Promise<Artista[]> {
    const res = await fetch('http://localhost:3000/api/artistas');
    if (!res.ok) throw new Error('Erro no fetch de artistas...');
    return await res.json();
  }
  
  export async function addArtista(artista: Omit<Artista, 'id'>): Promise<Artista> {
    const res = await fetch('http://localhost:3000/api/artistas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(artista),
    });
  
    if (!res.ok) throw new Error('Erro na adição do artista...');
    return await res.json();
  }
  
  export async function updateArtista(id: number, artista: Artista): Promise<Artista> {
    const res = await fetch(`http://localhost:3000/api/artistas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(artista),
    });
  
    if (!res.ok) throw new Error('Erro no update do artista...');
    return await res.json();
  }
  
  export async function deleteArtista(id: number): Promise<void> {
    const res = await fetch(`http://localhost:3000/api/artistas/${id}`, {
      method: 'DELETE',
    });
  
    if (!res.ok) throw new Error('Erro na remoção do artista...');
  }
  
  export async function getArtistaById(id: number): Promise<Artista> {
    const res = await fetch(`http://localhost:3000/api/artistas/${id}`);
    if (!res.ok) throw new Error('Erro no fetch do artista...');
    return await res.json();
  }
  