import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from keras.layers import Dense
from keras.models import Sequential


df = pd.read_csv("/kaggle/working/partidos_caracteristicas-6.csv")
df['Ganador'] = df['Ganador'].map({'D': 0, 'H': 1, 'A': 2}) #Ganador era de tipo string y tiene que ser tipo float para poder entrenar
X = df[['GolesFavL5', 'GolesConL5', 'PuntosL5', 'PosicionLocal', ' GolesFavV5', 'GolesConV5', 'PuntosV5', 'PosicionVisitante']]


y = df[['Ganador', 'Goles Local', 'Goles Visitante']] # Seleccionamos las etiquetas de salida

X = pd.get_dummies(X)

print(df.columns)
# Dividimos los datos en conjunto de entrenamiento (80%) y conjunto de prueba (20%)
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Crear modelo secuencial
model = Sequential()

# Añadir capa de entrada con 12 neuronas y función de activación relu
model.add(Dense(12, input_dim=X.shape[1], activation='relu'))

# Añadir capa oculta con 8 neuronas y función de activación relu
model.add(Dense(8, activation='relu'))

# Añadir capa de salida con función de activación softmax
model.add(Dense(3, activation='softmax'))

# Compilar el modelo con función de pérdida categorical_crossentropy y optimizador adam
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Entrenar el modelo con 100 iteraciones
model.fit(X_train, y_train, epochs=100, batch_size=10)

# Evaluar el modelo en el conjunto de prueba
score = model.evaluate(X_test, y_test, verbose=0)

# Imprimir el score de precisión
print('Precisión: ', score[1])


