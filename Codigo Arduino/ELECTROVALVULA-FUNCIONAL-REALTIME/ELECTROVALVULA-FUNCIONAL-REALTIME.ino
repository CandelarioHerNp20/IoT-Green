#include <NTPClient.h>                                                            //Libreria para hacer uso de la fecha y hora
#include <WiFi.h>                                                                 //Libreria para wifi 
#include <IOXhop_FirebaseESP32.h>                                                 //Libreria de firebase 
#define FIREBASE_HOST "https://pdsmthmutgz-default-rtdb.firebaseio.com/"          //Dirección del nombre del proyecto de firebase 
#define FIREBASE_AUTH "JvGNs6qfNlkhPCrre1vsc3qjnKf6UB1SU1S68Xi9"                  //La clave secreta generada a partir de FireBase 
#define WIFI_SSID "TP-LINK_0B0E82"                                                //Nombre de la red wifi 
#define WIFI_PASSWORD "78643406"                                                  //Contraseña de red wifi 


// -------------------Varables para firebase-----------------------
String fireStatus = "";
int Time = 1;
String horaDia = "";
String horaNoche = "";

//----------- Definir el cliente NTP para obtener tiempo---------
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);
// para obtener la hora actual
String formattedDate;
String timeStamp;

//----------Declaración de riego establecido por defecto---------
String RiegoM = "07:30";
String RiegoT = "20:00";

//-------------------------Pin del relay---------------------------
int releyPin = 2;

void setup() {

  Serial.begin(115200);                           //Inicializacion del serial
  delay(1000);
  pinMode(2, OUTPUT);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);           //conectando a la red
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {

    Serial.print(".");
    delay(500);

  }
  Serial.println();
  Serial.print("Connected to ");
  Serial.println(WIFI_SSID);
  Serial.print("IP Address is : ");
  Serial.println(WiFi.localIP());                   //Dirección local
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);     // Conectando a firebase

  Firebase.setString("Estados/Estado", "OFF");      //Estableciendo apagado de led
  timeClient.begin();                               //Inicialización del cliente NTP para obtener la fecha y la hora de un servidor NTP
  timeClient.setTimeOffset(-18000);                  //Método para ajustar el tiempo a mi zona horaria en segundos (México‎(UTC-5)‎)

}

void loop() {
  // Validación de la fecha y hora del servidor NTP
  while (!timeClient.update()) {
    timeClient.forceUpdate();
  }
  //---------------------------------------
  formattedDate = timeClient.getFormattedDate();     //Método para la conversión de la fecha y hora legible

  // Extracción de la fecha por separado de la hora ya que solo necetitamos la hora y los minutos
  int splitT = formattedDate.indexOf("T");
  timeStamp = formattedDate.substring(splitT + 1, formattedDate.length() - 4);
  Serial.println("Hora Actual");
  Serial.println(timeStamp);

  //----------Obtención de los datos de las colecciones------------
  fireStatus = Firebase.getString("Estados/Estado");
  Time = Firebase.getInt("Estados/Tiempo");
  horaDia = Firebase.getString("Estados/HoraDia");
  horaNoche = Firebase.getString("Estados/HoraNoche");

  int tiempoRiego = ((Time) * 60000);                     //Conversión del tiempo establecido en firebase por milisegundos

  /*Se inicializan condicionales if, elseif, else en donde si el programa cumple la condicion la ejecuta 
  La primera condición nos indica que si la variable del estado(fireStatus) enviada desde Realtime es ON asi mismo si la hora del dia(horaDia)
  establecida en Realtime es la misma que la del tiempo de la región(timeStamp) se debe encender la electrovalula junto con el tiempo indicado 
  en la variable(tiempoRiego) tambien indicadauna vez ejecutado lo anterios se apagara y regresara al estado OFF.Asi mismo si no es de dia 
  ejecuta la condicional para el riego de la noche si es la hora de noche(horaNoche) establecida en Realtime es igual al tiempo de la 
  region(timeStamp) se encendera la electrovalvula junto con el tiempo indicado en la variable(tiempoRiego) tambien indicado, una vez ejecutado 
  lo anterior se apagara y regresara al estado OFF*/

  if (fireStatus == "ON" ) {
    if (horaDia ==  timeStamp) {
      Serial.println("ON");
      digitalWrite(releyPin, HIGH);
      delay(tiempoRiego);
      digitalWrite(releyPin, LOW);
      Firebase.setString("Estados/Estado", "OFF");
    } else if (horaNoche == timeStamp) {
      Serial.println("ON");
      digitalWrite(releyPin, HIGH);
      delay(tiempoRiego);
      digitalWrite(releyPin, LOW);
      Firebase.setString("Estados/Estado", "OFF");
    }
  }

  /*Dentro de esta condiciona si el estado establecido es diferente tanto de encencido(ON) como de apagado(OFF) se ejecutara el el riego
  establecido por defecto si es igual al tiempo de la región junto al tiempo de riego establecido por defecto esto para el riego de la mañana*/
  else if ((fireStatus != "ON" ) && (fireStatus != "OFF")) {
    Serial.println("Modo predeterminado");
    if (timeStamp == RiegoM) {
      Serial.println("ON");
      digitalWrite(releyPin, HIGH);
      delay(120000);
    } else {
      digitalWrite(releyPin, LOW);
    }
  }


  /*Y para finalizar dentro de esta condicional else si el estado es diferente tanto de encencido(ON) como de apagado(OFF) se ejecutara el el riego
  establecido por default si es igual al tiempo de la región junto al tiempo de riego establecido por defecto esto para el riego de la noche*/
  else  ((fireStatus != "ON" ) && (fireStatus != "OFF"));
  if (timeStamp == RiegoT ) {
    Serial.println("ON");
    digitalWrite(releyPin, HIGH);
    delay(120000);
  } else {
    digitalWrite(releyPin, LOW);
  }
}
