import 'package:flutter/material.dart';

class MatchDate extends StatelessWidget {
  final String date;
  const MatchDate({
    super.key,
    required this.date,
  });

  @override
  Widget build(BuildContext context) {
    final dateSplit = date.split('-');
    final day = dateSplit[0];
    final month = dateSplit[1];
    final year = dateSplit[2];
    return Container(
      margin: const EdgeInsets.only(top: 20),
      child: Text(
        '$day/$month/$year',
        style: TextStyle(fontSize: 17),
      ),
    );
  }
}
