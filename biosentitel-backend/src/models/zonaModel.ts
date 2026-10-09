export interface zonaRow {
    id: number;
    nombre: string;
    latitud: string | number;
    longitud: string | number;
    temperatura: string | number;
    acumulacion_agua: number | boolean;
    total_sintomas: string | number;
}

export interface zonaRespuesta {
    id: number;
    nombre: string;
    latitud: number;
    longitud: number;
    temperatura: number;
    acumulacion_agua: boolean;
    total_sintomas: number;
    nivel_riesgo: 'VERDE'|'AMARILLO'|'ROJO'
}