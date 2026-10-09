export interface ZonaRespuesta {
  id: number;
  nombre: string;
  latitud: number;
  longitud: number;
  temperatura: number;
  acumulacion_agua: boolean;
  total_sintomas: number;
  nivel_riesgo: 'VERDE' | 'AMARILLO' | 'ROJO';
}