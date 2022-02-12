#include <iostream>
#include <stdlib.h>
#include <conio.h>

//using namespace std;

struct persona
{
    char nombre[20];
    char apellido[20];
    char direccion[50];
    int compTel;
    int edad;
    int tel;
} persona1;

int main()
{
    int compTel = 0;

    std::cout << "Nombre: ";
    std::cin >> persona1.nombre;
    std::cout << "Apellido: ";
    std::cin >> persona1.apellido;
    std::cout << "Escriba direccion de su domicilio: ";
    std::cin >> persona1.direccion;
    std::cout << "Seleccione la compania telefonica que utiliza:\n";
    std::cout << "1.Tigo\n";
    std::cout << "2.Movistar \n";
    std::cout << "3.Digicel \n";
    std::cout << "4.Claro\n";
    std::cout << "Opcion: ";
    std::cin >> compTel;

    std::cout << "Digite su numero de telefono: ";
    std::cin >> persona1.tel;
    std::cout << "Edad: ";
    std::cin >> persona1.edad;

    std::cout << "\n\n\n";
    std::cout << "\n Los datos que fueron ingresado son :\n";
    std::cout << "Nombre: " << persona1.nombre << std::endl;
    std::cout << "Apellido: " << persona1.apellido << std::endl;
    std::cout << "Direccion de Domicilio:" << persona1.direccion << std::endl;
    std::cout << "Su numero Telefonico es :" << persona1.tel << std::endl;
    std::cout << "\n";
    switch (compTel)
    {
    case 1:
        std::cout << "La empresa Telefonica que ultiza es :Tigo";
        break;
    case 2:
        std::cout << "La empresa Telefonica que utiliza es :Movistar  ";
        break;
    case 3:
        std::cout << "La empresa telefonica que utiliza es :Digicel";
        break;

    case 4:
        std::cout << "La empresa telefonica que utliza es :Claro ";
        break;

    default:
        std::cout << "La empresa telefonica ingresada no existe .\n ";
        break;
    }
    std::cout << "\nEdad: " << persona1.edad << std::endl;

    getch();
    return 0;
}