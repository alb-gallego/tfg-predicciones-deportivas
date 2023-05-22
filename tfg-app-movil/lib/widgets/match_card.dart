import 'package:flutter/material.dart';
import 'package:tfg_app/widgets/widgets.dart';
import '../models/models.dart';


class MatchCard extends StatelessWidget {
  final Match match;
  const MatchCard({
    super.key,
    required this.match,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () =>
          Navigator.pushNamed(context, 'matchdetail', arguments: match),
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 5),
        width: double.infinity,
        height: 200,
        decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(15),
            boxShadow: const [
              BoxShadow(blurRadius: 4, spreadRadius: 0.5, color: Colors.black45)
            ]),
        child: _MatchInfo(
          match: match,
        ),
      ),
    );
  }
}

class _MatchInfo extends StatelessWidget {
  final Match match;

  const _MatchInfo({
    super.key,
    required this.match,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
            

      padding: const EdgeInsets.symmetric(horizontal: 15),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              TeamShieldName(
                teamName: match.equipoLocal,
              ),
              MatchWinnerWidget(
                porcentajeVictoriaLocal: match.porcentajeVictoriaLocal,
                porcentajeEmpate: match.porcentajeEmpate,
                porcentajeVictoriaVisitante: match.porcentajeVictoriaVisitante,
              ),
              TeamShieldName(
                teamName: match.equipoVisitante,
              )
            ],
          ),
          MatchDate(
            date: match.fecha,
          )
        ],
      ),
    );
  }
}
