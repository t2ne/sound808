export type Genero ={
    id: number;
    nome: string;
  }
  
  export async function getGeneros(): Promise<Genero[]> {
    const res = await fetch('http://localhost:3000/api/generos');
    if (!res.ok) throw new Error('Erro no fetch de géneros...');
    return await res.json();
  }
  
  export async function addGenero(genero: Omit<Genero, 'id'>): Promise<Genero> {
    const res = await fetch('http://localhost:3000/api/generos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(genero),
    });
  
    if (!res.ok) throw new Error('Erro na adição do género...');
    return await res.json();
  }
  
  export async function updateGenero(id: number, genero: Genero): Promise<Genero> {
    const res = await fetch(`http://localhost:3000/api/generos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(genero),
    });
  
    if (!res.ok) throw new Error('Erro no update do género...');
    return await res.json();
  }
  
  export async function deleteGenero(id: number): Promise<void> {
    const res = await fetch(`http://localhost:3000/api/generos/${id}`, {
      method: 'DELETE',
    });
  
    if (!res.ok) throw new Error('Erro na remoção do género...');
  }
  
  export async function getGeneroById(id: number): Promise<Genero> {
    const res = await fetch(`http://localhost:3000/api/generos/${id}`);
    if (!res.ok) throw new Error('Erro no fetch do género...');
    return await res.json();
  }
  