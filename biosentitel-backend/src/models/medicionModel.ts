export interface medicionRow {
  id: number;
  zona_id: number;
  temperatura: string | number;
  acumulacion_agua: number | boolean;
  fecha_registro?: string | Date;
}

export interface medicionInput {
  zona_id: number;
  temperatura: number;
  acumulacion_agua: boolean;
}