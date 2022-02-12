
P = 0  # Prueba 1
H = 0  # Prueba 2 -> 2P+4
L = 0  # Prueba 3 -> (P+H)/5

# Segun el enunciado, la prueba 1 es el valor de la masa muscular
# por lo tanto se pide el valor de pasa muscular
# para ello usamos la funcion input("mensaje que quieras mostrar")


# Este while es un ciclo que se repite mientras la condicion dentro de los parentesis sea verdadera
# Como en este caso la variable P se definió igual a cero (0), la condicion empieza en verdadero
while(P <= 0):
    # Se coloca float() y dentro el input porque la funcion input devuelve un texto, pero queremos un numero, por lo que si lo
    # encerramos dentro de float(valor) obtendremos la conversion de texto a numero
    P = float(input("Ingrese valor de masa muscular: "))
    # cuando el usuario ingrese un valor, este se guarda en P, al guardarse, el ciclo while() comprueba si el valor ingresado
    # es menor o igual a cero, en caso de que si, vuelve a pedir el valor P, sino, continua con el codigo de abajo

# En el enunciado indica que 2*Prueba1 = Prueba2 - 4
# Por lo tanto Prueba2 = 2*Prueba1 + 4 despejando, en este caso Prueba1 es P y Prueba2 es H:
H = (2*P)+4

# En el enunciado dice que 5*Prueba3 = Prueba1 + Prueba2
# Despejando tenemos Prueba3 = (Prueba1 + Prueba2) / 5, sindo L Prueba3:
L = (P+H)/5

# Y por ultimo el total de puntajes es la suma de las tres pruebas
total = P + H + L

# Se usa print("Con el mensaje que prefieras") para mostrarle un texto o valor al usuario, por lo que se utiliza para
# mostrar los resultados
print("El usuario obtuvo los puntajes:")
print("Prueba 1:", P)
print("Prueba 2:", H)
print("Prueba 3:", L)
print("Con un puntaje total de:", total)

# Por ultimo creamos una variable categoria, que es la que indicara en qué categoria quedo el participante
categoria = 0

# Con la palabra reservada if ponemos a prueba una o mas condiciones, y si estas son verdaderas, ejecutará el codigo debajo de este:
if total > 0 and total <= 20:
    # Este condicional verifica que el total esta entre 0 y 20
    categoria = 1  # Si el total esta entre ese rango, se asigna el valor de la categoria a 1
elif total >= 21 and total <= 30:
    categoria = 2  # Si el total esta entre ese rango, se asigna el valor de la categoria a 2
elif total >= 31 and total <= 50:
    categoria = 3  # Si el total esta entre ese rango, se asigna el valor de la categoria a 3
elif total >= 51:
    categoria = 4  # Si el total es mayor o igual a 51, se asigna el valor de la categoria a 4

# Por ultimo se imprime el la categoria en la que quedó el usuario
print("Y quedó en la categoría:", categoria)
