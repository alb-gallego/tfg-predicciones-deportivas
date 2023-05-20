import 'dart:convert';


class Match{
  int id;
  String equipoLocal;
  String equipoVisitante;
  String fecha;
  int golesLocalDescanso;
  int golesVisitanteDescanso;
  int golesLocalFinal;
  int golesVisitanteFinal;
  int porcentajeEmpate;
  int porcentajeVictoriaLocal;
  int porcentajeVictoriaVisitante;

  Match({
    required this.id,
    required this.equipoLocal,
    required this.equipoVisitante,
    required this.fecha,
    required this.golesLocalDescanso,
    required this.golesVisitanteDescanso,
    required this.golesLocalFinal,
    required this.golesVisitanteFinal,
    required this.porcentajeEmpate,
    required this.porcentajeVictoriaLocal,
    required this.porcentajeVictoriaVisitante,

  });

  factory Match.fromRawJson(String str) =>
      Match.fromJson(json.decode(str));



  String toRawJson() => json.encode(toJson());

  factory Match.fromJson(Map<String, dynamic> json) {
    return Match(
      id : json['id'],
      equipoLocal: json['equipo_local'],
      equipoVisitante: json['equipo_visitante'],
      fecha: json['fecha'],
      golesLocalDescanso: json['goles_local_descanso'],
      golesVisitanteDescanso: json['goles_visitante_descanso'],
      golesLocalFinal: json['goles_local_final'],
      golesVisitanteFinal: json['goles_visitante_final'],
      porcentajeEmpate: json['porcentaje_empate'],
      porcentajeVictoriaLocal: json['porcentaje_victoria_local'],
      porcentajeVictoriaVisitante: json['porcentaje_victoria_visitante'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'equipo_local': equipoLocal,
      'equipo_visitante': equipoVisitante,
      'fecha': fecha,
      'goles_local_descanso': golesLocalDescanso,
      'goles_visitante_descanso': golesVisitanteDescanso,
      'goles_local_final': golesLocalFinal,
      'goles_visitante_final': golesVisitanteFinal,
      'porcentaje_empate': porcentajeEmpate,
      'porcentaje_victoria_local': porcentajeVictoriaLocal,
      'porcentaje_victoria_visitante': porcentajeVictoriaVisitante,
    };
  }



}