import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:tfg_app/widgets/widgets.dart';
import 'package:tfg_app/services/services.dart';
import 'package:tfg_app/models/models.dart';


class MatchDetailScreen extends StatelessWidget {
const MatchDetailScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final Match match = ModalRoute.of(context)?.settings.arguments as Match;
    final size = MediaQuery.of(context).size;
    return Scaffold(
        body: SafeArea(
            child: SingleChildScrollView(
      child: Container(
        child: Column(
          children: [
            Row(
              children: [
                IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(
                      Icons.chevron_left_outlined,
                      size: 40,
                    )),
                const Text(
                  'Detalles del partido',
                  style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 35),
              child: Column(
                children: [
                  
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      TeamShieldName(
                        teamName: match.equipoLocal,
                      ),
                      Column(
                        children: [
                          Icon(
                            Icons.calendar_today,
                            size: 24,
                            color: Colors.black,
                          ),
                          const SizedBox(
                      height: 5,),
                          Text(
                            match.fecha,
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ),
                      TeamShieldName(
                        teamName: match.equipoVisitante,
                      )
                    ],
                  ),
                  const Divider(
                    thickness: 4,
                    height: 50,
                    color: Colors.black,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      Text('Resultado esperado al final', style: TextStyle(
                        fontSize: 25, fontWeight: FontWeight.w700),)
                    ],),
                    const SizedBox(
                      height: 20,),
                   Center(
                  child: Container(
                    width: 65,
                    child: Row(
                      children: [
                        MatchResultWidget(
                          goalA: match.golesLocalFinal,
                          goalB: match.golesVisitanteFinal,
                        ),
                      ],
                    ),
                  ),
                ),
                const Divider(
                    thickness: 4,
                    height: 50,
                    color: Colors.black,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      Text('Resultado esperado 1ª parte', style: TextStyle(
                        fontSize: 25, fontWeight: FontWeight.w700),)
                    ],),
                    const SizedBox(
                      height: 20,),
                   Center(
                  child: Container(
                    width: 65,
                    child: Row(
                      children: [
                        MatchResultWidget(
                          goalA: match.golesLocalDescanso,
                          goalB: match.golesVisitanteDescanso,
                        ),
                      ],
                    ),
                  ),
                ), 
                const Divider(
                    thickness: 4,
                    height: 50,
                    color: Colors.black,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      Text('Porcentajes de victoria', style: TextStyle(
                        fontSize: 25, fontWeight: FontWeight.w700),)
                    ],),
                    const SizedBox(
                      height: 20,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                      Column(
                        children: [
                        
                        Text('1', style: TextStyle(
                          fontSize: 25, fontWeight: FontWeight.bold),),
                        const SizedBox(
                          height: 5,),
                        Text(match.porcentajeVictoriaLocal.toString() + ' %', style: TextStyle(
                          fontSize: 35, fontWeight: FontWeight.normal),),
                          ]
                        ),const SizedBox(
                          width: 30,),
                        Column(
                        children: [
                          Text('X', style: TextStyle(
                          fontSize: 25, fontWeight: FontWeight.bold),),
                        const SizedBox(
                          height: 5,),
                        Text(match.porcentajeEmpate.toString() + ' %', style: TextStyle(
                          fontSize: 35, fontWeight: FontWeight.normal),),
                        ]),
                        const SizedBox(
                          width: 30,),
                        Column(
                        children: [
                          Text('2', style: TextStyle(
                          fontSize: 25, fontWeight: FontWeight.bold),),
                        const SizedBox(
                          height: 5,),
                        Text(match.porcentajeVictoriaVisitante.toString() + ' %', style: TextStyle(
                          fontSize: 35, fontWeight: FontWeight.normal),),
                        ]),
                      
                    ],)
                    
                    
          ],
        ),
      ),
    ]
    )
    )
    )
    )
    );
  }
  }