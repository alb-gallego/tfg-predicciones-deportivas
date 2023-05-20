import 'package:flutter/widgets.dart';
import '../screens/screens.dart';

class AppRoutes {
  static Map<String, Widget Function(BuildContext)> getAppRoutes() {
    return {
      'main': (_) => const MainScreen(),
      'matchdetail': (_) => const MatchDetailScreen()
    };
  }
}