import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import db from '../config/db';
import { zonaRow, zonaRespuesta } from '../models/zonaModel';

export const obtenerZonasRadar = async (req: Request, res: Response): Promise<Response> => {
  try {
    const sqlQuery = `
      SELECT 
        z.id,
        z.nombre,
        z.latitud,
        z.longitud,
        COALESCE(m.temperatura, 0) AS temperatura,
        COALESCE(m.acumulacion_agua, FALSE) AS acumulacion_agua,
        COALESCE(SUM(s.cantidad_casos), 0) AS total_sintomas
      FROM zonas z
      LEFT JOIN mediciones_ambientales m ON z.id = m.zona_id 
        AND m.id = (SELECT MAX(id) FROM mediciones_ambientales WHERE zona_id = z.id)
      LEFT JOIN reportes_sintomas s ON z.id = s.zona_id
      GROUP BY z.id;
    `;

    const [filas] = await db.query<RowDataPacket[]>(sqlQuery);
    const zonas = filas as unknown as zonaRow[];

    const zonasProcesadas: zonaRespuesta[] = zonas.map((zona) => {
      const temp = Number(zona.temperatura);
      const agua = Boolean(zona.acumulacion_agua);
      const sintomas = Number(zona.total_sintomas);

      let nivelRiesgo: 'VERDE' | 'AMARILLO' | 'ROJO' = 'VERDE';

      if (temp > 27 && agua && sintomas >= 10) {
        nivelRiesgo = 'ROJO';
      } else if (temp > 25 || agua || sintomas >= 3) {
        nivelRiesgo = 'AMARILLO';
      }

      return {
        id: zona.id,
        nombre: zona.nombre,
        latitud: Number(zona.latitud),
        longitud: Number(zona.longitud),
        temperatura: temp,
        acumulacion_agua: agua,
        total_sintomas: sintomas,
        nivel_riesgo: nivelRiesgo
      };
    });

    return res.status(200).json(zonasProcesadas);
  } catch (error) {
    console.error('Error al obtener zonas:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};