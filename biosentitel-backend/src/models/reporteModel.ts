export interface reporteRow {
  id: number;
  zona_id: number;
  enfermedad_vector: 'Dengue' | 'Zika' | 'Chikungunya';
  cantidad_casos: string | number;
  observaciones?: string;
  fecha_reporte?: string | Date;
}

export interface reporteInput {
  zona_id: number;
  enfermedad_vector: 'Dengue' | 'Zika' | 'Chikungunya';
  cantidad_casos: number;
  observaciones?: string;
}