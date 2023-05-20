

from datetime import datetime
import pandas as pd
from pandas import to_datetime
from datetime import datetime

def goles_a_favor_ultimos_cinco(equipo, fecha_init,df):
    #Comprueba que los últimos 5 partidos jugados por ese equipo pertenezcan a la temporada en cuestión
    #por lo que si le pedimos la predicción un 5 de septiembre solo tendrá en cuenta los partidos jugados hasta el 5 de sept pero a partir del 1 de agosto, 
    #es decir de la temporada nueva que estamos pidiendo
    fecha_str = fecha_init.strftime("%d/%m/%Y")
    fecha = datetime.strptime(fecha_str, "%d/%m/%Y")

    year = int(fecha.strftime("%Y"))
    
    if year == 1999:
        if pd.to_datetime(fecha) >= pd.Timestamp("1999-08-01"):
            temporada = f"{year}-{int(str(year+1)[-4:])}"
        else:
            temporada = f"{year-1}-{int(str(year)[-2:])}"
    elif year == 2000:
        if pd.to_datetime(fecha) <= pd.Timestamp("2000-08-01"):
            temporada = f"{year-1}-{int(str(year)[-4:])}"
        else:
            temporada = f"{year}-{int(str(year+1)[-2:])}"
            
    elif fecha.strftime("%Y-%m-%d") >= f"{year}-08-01":
        temporada = f"{year}-{int(str(year+1)[-2:])}"
    else:
        temporada = f"{year-1}-{int(str(year)[-2:])}"
        
    if len(temporada) == 6:
        temporada = f"{temporada[0:4]}-0{temporada[-1]}"
        
    partidos_equipo = df[((df['HomeTeam'] == equipo) | (df['AwayTeam'] == equipo)) & (df['Date'] < fecha_init) & (df['Season'] == temporada)]
    partidos_ordenados = partidos_equipo.sort_values('Date', ascending=False)
    partidos_ultimos_cinco = partidos_ordenados[(partidos_ordenados['HomeTeam'] == equipo) | (partidos_ordenados['AwayTeam'] == equipo)].head(5)
    goles = 0
    for i, partido in partidos_ultimos_cinco.iterrows():
        if partido['HomeTeam'] == equipo:
            goles += partido['FTHG']
        elif partido['AwayTeam'] == equipo:
            goles += partido['FTAG']
    return goles
    
    

def goles_en_contra_ultimos_cinco(equipo, fecha_init,df):
    
    fecha_str = fecha_init.strftime("%d/%m/%Y")
    fecha = datetime.strptime(fecha_str, "%d/%m/%Y")
    year = int(fecha.strftime("%Y"))    
    if year == 1999:
        if pd.to_datetime(fecha) >= pd.Timestamp("1999-08-01"):
            temporada = f"{year}-{int(str(year+1)[-4:])}"
        else:
            temporada = f"{year-1}-{int(str(year)[-2:])}"
    elif year == 2000:
        if pd.to_datetime(fecha) <= pd.Timestamp("2000-08-01"):
            temporada = f"{year-1}-{int(str(year)[-4:])}"
        else:
            temporada = f"{year}-{int(str(year+1)[-2:])}"
    elif fecha.strftime("%Y-%m-%d") >= f"{year}-08-01":
        temporada = f"{year}-{int(str(year+1)[-2:])}"
    else:
        temporada = f"{year-1}-{int(str(year)[-2:])}"
    
    if len(temporada) == 6:
        temporada = f"{temporada[0:4]}-0{temporada[-1]}"
        
    partidos_equipo = df[((df['HomeTeam'] == equipo) | (df['AwayTeam'] == equipo)) & (df['Date'] < fecha_init) & (df['Season'] == temporada)]
    partidos_ordenados = partidos_equipo.sort_values('Date', ascending=False)
    partidos_ultimos_cinco = partidos_ordenados[(partidos_ordenados['HomeTeam'] == equipo) | (partidos_ordenados['AwayTeam'] == equipo)].head(5)
    goles = 0
    for i, partido in partidos_ultimos_cinco.iterrows():
        if partido['HomeTeam'] == equipo:
            goles += partido['FTAG']
        elif partido['AwayTeam'] == equipo:
            goles += partido['FTHG']
    return goles


def goles_a_favor_descanso_ultimos_cinco(equipo, fecha_init,df):
    fecha_str = fecha_init.strftime("%d/%m/%Y")
    fecha = datetime.strptime(fecha_str, "%d/%m/%Y")
    year = int(fecha.strftime("%Y"))    

    if year == 1999:
        if pd.to_datetime(fecha) >= pd.Timestamp("1999-08-01"):
            temporada = f"{year}-{int(str(year+1)[-4:])}"
        else:
            temporada = f"{year-1}-{int(str(year)[-2:])}"
    elif year == 2000:
        if pd.to_datetime(fecha) <= pd.Timestamp("2000-08-01"):
            temporada = f"{year-1}-{int(str(year)[-4:])}"
        else:
            temporada = f"{year}-{int(str(year+1)[-2:])}"
    elif fecha.strftime("%Y-%m-%d") >= f"{year}-08-01": 
        temporada = f"{year}-{int(str(year+1)[-2:])}"
    else:
        temporada = f"{year-1}-{int(str(year)[-2:])}"
    if len(temporada) == 6:
        temporada = f"{temporada[0:4]}-0{temporada[-1]}"
        
    partidos_equipo = df[((df['HomeTeam'] == equipo) | (df['AwayTeam'] == equipo)) & (df['Date'] < fecha_init) & (df['Season'] == temporada)]
    partidos_ordenados = partidos_equipo.sort_values('Date', ascending=False)
    partidos_ultimos_cinco = partidos_ordenados[(partidos_ordenados['HomeTeam'] == equipo) | (partidos_ordenados['AwayTeam'] == equipo)].head(5)
    goles = 0
    for i, partido in partidos_ultimos_cinco.iterrows():
        if partido['HomeTeam'] == equipo:
            goles += partido['HTHG']
        elif partido['AwayTeam'] == equipo:
            goles += partido['HTAG']
    return goles


def goles_en_contra_descanso_ultimos_cinco(equipo, fecha_init,df):
    fecha_str = fecha_init.strftime("%d/%m/%Y")
    fecha = datetime.strptime(fecha_str, "%d/%m/%Y")
    year = int(fecha.strftime("%Y"))    

    if year == 1999:
        if pd.to_datetime(fecha) >= pd.Timestamp("1999-08-01"):
            temporada = f"{year}-{int(str(year+1)[-4:])}"
        else:
            temporada = f"{year-1}-{int(str(year)[-2:])}"
    elif year == 2000:
        if pd.to_datetime(fecha) <= pd.Timestamp("2000-08-01"):
            temporada = f"{year-1}-{int(str(year)[-4:])}"
        else:
            temporada = f"{year}-{int(str(year+1)[-2:])}"
    elif fecha.strftime("%Y-%m-%d") >= f"{year}-08-01": 
        temporada = f"{year}-{int(str(year+1)[-2:])}"
    else:
        temporada = f"{year-1}-{int(str(year)[-2:])}"
    if len(temporada) == 6:
        temporada = f"{temporada[0:4]}-0{temporada[-1]}"
        
    partidos_equipo = df[((df['HomeTeam'] == equipo) | (df['AwayTeam'] == equipo)) & (df['Date'] < fecha_init) & (df['Season'] == temporada)]
    partidos_ordenados = partidos_equipo.sort_values('Date', ascending=False)
    partidos_ultimos_cinco = partidos_ordenados[(partidos_ordenados['HomeTeam'] == equipo) | (partidos_ordenados['AwayTeam'] == equipo)].head(5)
    goles = 0
    for i, partido in partidos_ultimos_cinco.iterrows():
        if partido['HomeTeam'] == equipo:
            goles += partido['HTAG']
        elif partido['AwayTeam'] == equipo:
            goles += partido['HTHG']
    return goles


def puntos_ultimos_cinco(equipo, fecha_init,df):
    fecha_str = fecha_init.strftime("%d/%m/%Y")
    fecha = datetime.strptime(fecha_str, "%d/%m/%Y")
    year = int(fecha.strftime("%Y"))    
    
    
    if year == 1999:
        if pd.to_datetime(fecha) >= pd.Timestamp("1999-08-01"):
            temporada = f"{year}-{int(str(year+1)[-4:])}"
        else:
            temporada = f"{year-1}-{int(str(year)[-2:])}"
    elif year == 2000:
        if pd.to_datetime(fecha) <= pd.Timestamp("2000-08-01"):
            temporada = f"{year-1}-{int(str(year)[-4:])}"
        else:
            temporada = f"{year}-{int(str(year+1)[-2:])}"
    elif fecha.strftime("%Y-%m-%d") >= f"{year}-08-01":
        temporada = f"{year}-{int(str(year+1)[-2:])}"
    else:
        temporada = f"{year-1}-{int(str(year)[-2:])}"
    if len(temporada) == 6:
        temporada = f"{temporada[0:4]}-0{temporada[-1]}"
        
    partidos_equipo = df[((df['HomeTeam'] == equipo) | (df['AwayTeam'] == equipo)) & (df['Date'] < fecha_init) & (df['Season'] == temporada)]
    partidos_ordenados = partidos_equipo.sort_values(['Date'], ascending=[False])
    partidos_ultimos_cinco = partidos_ordenados[(partidos_ordenados['HomeTeam'] == equipo) | (partidos_ordenados['AwayTeam'] == equipo)].head(5)
    puntos = 0
    for i, partido in partidos_ultimos_cinco.iterrows():
        if partido['HomeTeam'] == equipo:
            if(partido['FTR'] == 'H'):
                puntos += 3
            elif(partido['FTR'] == 'D'):
                puntos += 1
            elif(partido['FTR'] == 'A'):
                puntos += 0
        elif partido['AwayTeam'] == equipo:
            
            if(partido['FTR'] == 'A'):
                puntos += 3
            elif(partido['FTR'] == 'D'):
               
                puntos += 1
            elif(partido['FTR'] == 'H'):
               
                puntos += 0
            
    return puntos


def clasificacion_en_una_fecha(fecha_init,df):
    fecha_str = fecha_init.strftime("%d/%m/%Y")
    fecha = datetime.strptime(fecha_str, "%d/%m/%Y")
    year = int(fecha.strftime("%Y"))        
    if year == 1999:
        if pd.to_datetime(fecha) >= pd.Timestamp("1999-08-01"):
            temporada = f"{year}-{int(str(year+1)[-4:])}"
        else:
            temporada = f"{year-1}-{int(str(year)[-2:])}"
    elif year == 2000:
        if pd.to_datetime(fecha) <= pd.Timestamp("2000-08-01"):
            temporada = f"{year-1}-{int(str(year)[-4:])}"
        else:
            temporada = f"{year}-{int(str(year+1)[-2:])}"
    elif fecha_init >= pd.Timestamp(f"{year}-08-01"):
        temporada = f"{year}-{int(str(year+1)[-2:])}"
    else:
        temporada = f"{year-1}-{int(str(year)[-2:])}"
    if len(temporada) == 6:
        temporada = f"{temporada[0:4]}-0{temporada[-1]}"
        
    partidos = df[(df['Date'] < fecha_init) & (df['Season'] == temporada)]
    puntos = {}
    for _, partido in partidos.iterrows():
        if partido['HomeTeam'] not in puntos:
            puntos[partido['HomeTeam']] = 0
        if partido['AwayTeam'] not in puntos:
            puntos[partido['AwayTeam']] = 0
        if partido['FTR'] == 'D':
            puntos[partido['HomeTeam']] += 1
            puntos[partido['AwayTeam']] += 1
        elif partido['FTR'] == 'H':
            puntos[partido['HomeTeam']] += 3
        else:
            puntos[partido['AwayTeam']] += 3
    
    clasificacion = sorted(puntos.items(), key=lambda x: x[1], reverse=True)
    return clasificacion


def posicion_equipo_en_una_fecha(equipo, fecha,df):
    clasificacion = clasificacion_en_una_fecha(fecha,df)
    posicion = [i+1 for i, (eq, pts) in enumerate(clasificacion) if eq == equipo]
    if posicion:
        return posicion[0]
    else:
        return -1
    

# posicion_equipo_en_una_fecha('Betis', '1996-09-03')




