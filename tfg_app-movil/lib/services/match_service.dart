import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';

import '../models/models.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class MatchService extends ChangeNotifier {
  final String _baseUrl = '10.100.39.253:3000'; // PONER LA IP DEL PORTÁTIL PARA QUE FUNCIONE CORRECTAMENTE
  List<Match> _matches = [];

  List<Match> get matches => _matches;
  set matches(List<Match> val) {
    _matches = val;
    notifyListeners();
  }

  Future<bool> getItems() async {
    if (matches.isNotEmpty) return true;
    final url = Uri.http(_baseUrl, '/partidos');
    
    try {
      final resp = await http.get(url);
      
      List<dynamic> rawdata = jsonDecode(resp.body);

      List<Match> aux = [];

      rawdata.forEach((element) {
        final matchResult = Match.fromJson(element);
        aux.add(matchResult);
      });

      matches = aux;
      
      return true;
    } catch (e) {
      print('Error al obtener los datos: $e');
      return false;
    }
  }
//   Future<Match?> getMatchById(String id) async {
//   final url = Uri.http(_baseUrl, '/partidos/$id');
//   if (kDebugMode) {
//     print(url);
//   }
//   try {
//     final resp = await http.get(url);
//     final dynamic data = jsonDecode(resp.body);
//     final matchResult = Match.fromJson(data);
//     return matchResult;
//   } catch (e) {
//     print('Error al obtener el partido con el ID $id: $e');
//     return null;
//   }
// }

  
}