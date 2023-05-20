import 'package:flutter/material.dart';

class MatchWinnerWidget extends StatelessWidget {
  final int porcentajeVictoriaLocal;
  final int porcentajeEmpate;
  final int porcentajeVictoriaVisitante;

  const MatchWinnerWidget(  {
    super.key,
    required this.porcentajeVictoriaLocal,
    required this.porcentajeEmpate,
    required this.porcentajeVictoriaVisitante,
  });

  @override
  Widget build(BuildContext context) {
    const tstyle = TextStyle(
        fontSize: 25,
        fontWeight: FontWeight.bold,
        decoration: TextDecoration.none,
        backgroundColor: Colors.transparent);
    return Container(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
          Column(
            children: [
            Text('1', style: const TextStyle(
              fontSize: 15, fontWeight: FontWeight.bold),),
            const SizedBox(
              height: 3,),
            Text('$porcentajeVictoriaLocal%', style: const TextStyle(
              fontSize: 20, fontWeight: FontWeight.bold),),
              ]
            ),const SizedBox(
              width: 12,),
            Column(
            children: [
              const Text('X', style: TextStyle(
              fontSize: 15, fontWeight: FontWeight.bold),),
            const SizedBox(
              height: 3,),
            Text('$porcentajeEmpate%', style: const TextStyle(
              fontSize: 20, fontWeight: FontWeight.bold),),
            ]),
            const SizedBox(
              width: 12,),
            Column(
            children: [
              Text('2', style: const TextStyle(
              fontSize: 15, fontWeight: FontWeight.bold),),
            const SizedBox(
              height: 3,),
            Text('$porcentajeVictoriaVisitante%', style: const TextStyle(
              fontSize: 20, fontWeight: FontWeight.bold),),
            ]),
          
        ],)
    );
  }
}
