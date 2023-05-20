# This Python 3 environment comes with many helpful analytics libraries installed
# It is defined by the kaggle/python Docker image: https://github.com/kaggle/docker-python
# For example, here's several helpful packages to load

from aux import goles_a_favor_ultimos_cinco, goles_en_contra_ultimos_cinco, puntos_ultimos_cinco,goles_a_favor_descanso_ultimos_cinco,goles_en_contra_descanso_ultimos_cinco, posicion_equipo_en_una_fecha
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
from pandas import to_datetime
from datetime import datetime

# Input data files are available in the read-only "../input/" directory
# For example, running this (by clicking run or p dressing Shift+Enter) will list all files under the input directory

import os
df = pd.read_csv('LaLiga_Matches_1995-2021.csv', parse_dates=['Date'], dayfirst=True)

# print(df.head())

columnas = ['Temporada', 'Fecha', 'EquipoLocal', 'GolesFavL5', 'GolesConL5', 'PuntosL5', 'PosicionLocal', 'GolesFav1L5', 'GolesCont1L5', 'EquipoVisitante', ' GolesFavV5', 'GolesConV5', 'PuntosV5', 'PosicionVisitante', 'GolesFav1V5', 'GolesCon1V5']
df_nuevo = pd.DataFrame(columns=columnas)
df_nuevo.head()


partidos = df

datos_partidos = []
for _, partido in partidos.iterrows():
    temporada = partido['Season']
    fecha =  partido['Date']

    print(type(fecha))
    ganador = partido['FTR']
    goles_local = partido['FTHG']
    goles_visitante = partido['FTAG']
    goles_local_primera_parte = partido['HTHG']
    goles_visitante_primera_parte = partido['HTAG']
    
    # EQUIPO LOCAL
    equipo_local = partido['HomeTeam']
    goles_a_favor_local_ultimos_5 = goles_a_favor_ultimos_cinco(equipo_local, fecha,df)
    goles_en_contra_local_ultimos_5 = goles_en_contra_ultimos_cinco(equipo_local, fecha,df)
    puntos_local_ultimos_5 = puntos_ultimos_cinco( equipo_local, fecha,df)
    posicion_local = posicion_equipo_en_una_fecha(equipo_local, fecha,df)
    goles_a_favor_primera_parte_local_ultimos_5 = goles_a_favor_descanso_ultimos_cinco(equipo_local, fecha,df)
    goles_en_contra_primera_parte_local_ultimos_5 = goles_en_contra_descanso_ultimos_cinco(equipo_local, fecha,df)
 
    
    # EQUIPO VISITANTE
    equipo_visitante = partido['AwayTeam']
    goles_a_favor_visitante_ultimos_5 = goles_a_favor_ultimos_cinco(equipo_visitante, fecha,df)
    goles_en_contra_visitante_ultimos_5 = goles_en_contra_ultimos_cinco(equipo_visitante, fecha,df)
    puntos_visitante_ultimos_5 = puntos_ultimos_cinco( equipo_visitante, fecha,df)
    posicion_visitante = posicion_equipo_en_una_fecha(equipo_visitante, fecha,df)
    goles_a_favor_primera_parte_visitante_ultimos_5 = goles_a_favor_descanso_ultimos_cinco(equipo_visitante, fecha,df)
    goles_en_contra_primera_parte_visitante_ultimos_5 = goles_en_contra_descanso_ultimos_cinco(equipo_visitante, fecha,df)

    nueva_fila = {'Temporada': temporada, 'Fecha': fecha,'Ganador': ganador, 'Goles Local': goles_local,'Goles Visitante': goles_visitante, 'Goles Local primera parte': goles_local_primera_parte, 'Goles Visitante primera parte': goles_visitante_primera_parte, 'EquipoLocal': equipo_local, 'GolesFavL5': goles_a_favor_local_ultimos_5, 'GolesConL5': goles_en_contra_local_ultimos_5, 'PuntosL5': puntos_local_ultimos_5, 'PosicionLocal': posicion_local, 'GolesFav1L5': goles_a_favor_primera_parte_local_ultimos_5, 'GolesCont1L5': goles_en_contra_primera_parte_local_ultimos_5,
                  'EquipoVisitante': equipo_visitante, ' GolesFavV5': goles_a_favor_visitante_ultimos_5, 'GolesConV5': goles_en_contra_visitante_ultimos_5, 'PuntosV5': puntos_visitante_ultimos_5, 'PosicionVisitante': posicion_visitante, 'GolesFav1V5': goles_a_favor_primera_parte_visitante_ultimos_5, 'GolesCon1V5': goles_en_contra_primera_parte_visitante_ultimos_5}
    
    df_nuevo = df_nuevo.append(nueva_fila, ignore_index=True)
df_nuevo.to_csv('partidos_caracteristicas.csv', index=False)
df_nuevo.head()
