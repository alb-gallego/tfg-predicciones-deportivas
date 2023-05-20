import 'package:flutter/material.dart';


class TeamShieldName extends StatelessWidget {
  final String teamName;
  const TeamShieldName({
    super.key,
    required this.teamName,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 80,

      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [Image.asset(
             'assets/$teamName.png', 
             width: 60,
             height: 70,   
           ),],),
           Center(
            child: ( 
              Text(teamName, style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 17,
                ),textAlign: TextAlign.center,
            overflow: TextOverflow.fade,
            )
            ),
            )
         
        ],
      ),
    );
  }
}