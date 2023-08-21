export interface Rubros {
    nombre: string;
    codigo: string;
    id?: number;
}
export interface RubroResponse {
    nombre: string;
    codigo: string;
}

export interface ListaRubros {
    lista: Rubros[]
}