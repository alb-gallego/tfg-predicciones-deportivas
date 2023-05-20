import 'package:animate_do/animate_do.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:tfg_app/services/match_service.dart';
import 'package:tfg_app/widgets/widgets.dart';




class MainScreen extends StatelessWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final matchService = Provider.of<MatchService>(context);
    return Scaffold(
        body: SafeArea(
      child: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        child: Container(
          margin: const EdgeInsets.symmetric(
            horizontal: 25,
          ),
          child: Column(
            children: [
              const _Header(),
              FutureBuilder(
                  future: matchService.getItems(),
                  builder: (context, snapshot) {
                    if (!snapshot.hasData || snapshot.data == false) {
                      return Column(
                        children: const [
                          SizedBox(
                            height: 20,
                          ),
                          Text('Cargando resultados'),
                          SizedBox(
                            height: 20,
                          ),
                          CircularProgressIndicator(),
                        ],
                      );
                    }
                    return ConstrainedBox(
                      constraints: BoxConstraints(maxHeight: size.height),
                      child: ListView.builder(
                        itemCount: matchService.matches.length,
                        itemBuilder: (context, index) {
                          if (index == matchService.matches.length - 1) {
                            return Container(
                              margin: const EdgeInsets.only(bottom: 200),
                              child: FadeInLeft(
                                  child: MatchCard(
                                match: matchService.matches[index],
                              )),                              
                            );
                          }
                          return FadeInLeft(
                            
                            child: MatchCard(
                            match: matchService.matches[index],
                          )
                          );
                        },
                      ),
                    );
                  })
            ],
          ),
        ),
      ),
    ));
  }
}

class _Header extends StatelessWidget {
  const _Header({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      child: Row(
        children: const [
          Text(
            'Partidos',
            style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold)
          )
        ],
      ),
    );
  }
}
