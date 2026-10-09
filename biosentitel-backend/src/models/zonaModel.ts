export interface zonaRow {
    id: number;
    nombre: string;
    latitud: string | number;
    longitud: string | number;
    fecha_craecion: Date | string;
}

export interface zonaRespuesta {
    id: number;
    nombre: string;
    latitud: number;
    longitud: number;
    fecha_creacion: Date;
}