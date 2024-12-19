interface Genero {
    id: number;
    nome: string;
  }
  
  // Fetch all generos
  export async function getGeneros(): Promise<Genero[]> {
    const res = await fetch('http://localhost:5000/api/generos');
    if (!res.ok) throw new Error('Erro no fetch de géneros...');
    return await res.json();
  }
  
  // Add a new genero
  export async function addGenero(genero: Omit<Genero, 'id'>): Promise<Genero> {
    const res = await fetch('http://localhost:5000/api/generos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(genero),
    });
  
    if (!res.ok) throw new Error('Erro na adição do género...');
    return await res.json();
  }
  
  // Update an existing genero
  export async function updateGenero(id: number, genero: Genero): Promise<Genero> {
    const res = await fetch(`http://localhost:5000/api/generos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(genero),
    });
  
    if (!res.ok) throw new Error('Erro no update do género...');
    return await res.json();
  }
  
  // Delete a genero
  export async function deleteGenero(id: number): Promise<void> {
    const res = await fetch(`http://localhost:5000/api/generos/${id}`, {
      method: 'DELETE',
    });
  
    if (!res.ok) throw new Error('Erro na remoção do género...');
  }
  
  // Fetch a genero by its ID
  export async function getGeneroById(id: number): Promise<Genero> {
    const res = await fetch(`http://localhost:5000/api/generos/${id}`);
    if (!res.ok) throw new Error('Erro no fetch do género...');
    return await res.json();
  }
  