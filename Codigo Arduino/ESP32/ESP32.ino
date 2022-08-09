//---Agregar librerias para la coneccion a wifi, NTPClient, DHT11 y a la placa ESP32---------------
#include <NTPClient.h>
#include <WiFiUdp.h>
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include "DHT.h"

//----------- Colocar el pin data del dth-----------------
#define DHTPIN 2
//Declarar el tipo de sensor que se esta utilizando
#define DHTTYPE DHT11
//llamar a la variable del pin y el tipo sensor en un objeto llamado dht
DHT dht(DHTPIN, DHTTYPE);

//---------------- Firebase-------------------------------
//Proporciona la información para el proceso de generar los tokens.
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>

//------------ Definir credenciales WiFi -----------------
#define WIFI_SSID "TP-LINK_0B0E82"
#define WIFI_PASSWORD "78643406"

// -------------------- Colocar API Key --------------------
#define API_KEY "AIzaSyCuLMB77BpnlmyEgIg6NDn5pKrmLhRHUq4"

//---------------- Colocar el "project ID" ----------------
#define FIREBASE_PROJECT_ID "pdsmthmutgz"

//-------Colocar el correo y contraseña de firebase de auth del proyecto--------
#define USER_EMAIL "candelarioher20@gmail.com"
#define USER_PASSWORD "conexion12**@"

//-------- Definir objetos de Firebase----------
// Definir el objeto de Firebase Data
FirebaseData fbdo;
//Objeto de autenticación de Firebase
FirebaseAuth auth;
//Objeto de configuración de Firebase
FirebaseConfig config;


//---------- Variable para las tareas --------------------
bool taskCompleted = false;

unsigned long dataMillis = 0;    // Almacenamiento de la ultima vez que se lanzo nuestro evento.

//------- Definir pin para el Higrometro -----------
float Humedad = analogRead(4);

//----------- Definir el cliente NTP para obtener tiempo---------
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);

//---- Inicializar las variables para la fecha y el tiempo ---------
String formattedDate;
String dayStamp;
String timeStamp;

//---------------------------------------------------

//Función para la devolución del llamado de Firestore
void fcsUploadCallback(CFS_UploadStatusInfo info)
{
  if (info.status == fb_esp_cfs_upload_status_init)
  {
    Serial.printf("\nUploading data (%d)...\n", info.size);
  }
  else if (info.status == fb_esp_cfs_upload_status_upload)
  {
    Serial.printf("Uploaded %d%s\n", (int)info.progress, "%");
  }
  else if (info.status == fb_esp_cfs_upload_status_complete)
  {
    Serial.println("Upload completed ");
  }
  else if (info.status == fb_esp_cfs_upload_status_process_response)
  {
    Serial.print("Processing the response... ");
  }
  else if (info.status == fb_esp_cfs_upload_status_error)
  {
    Serial.printf("Upload failed, %s\n", info.errorMsg.c_str());
  }
}

void setup()
{
  //Inicializar el monitor serial;
  Serial.println(F("DHT11 ..... OK"));
  dht.begin();
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  //Impresión de la dirección IP local e inicialización del servidor web
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  //-------Configuración de la API KEY asignada --------------
  config.api_key = API_KEY;

  / ------ Configuración de las credenciales de inicio de sesión del usuario asignadas -------- -
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  //----- Confiración de la función de devolución de llamada para la tarea de generación de tokens de ejecución prolongada --------
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

  Firebase.begin(&config, &auth);

  Firebase.reconnectWiFi(true);

  //Inicialización del cliente NTP para obtener la fecha y la hora de un servidor NTP
  timeClient.begin();

  //Método para ajustar el tiempo a mi zona horaria en segundos (México‎(UTC-5)‎)
  timeClient.setTimeOffset(-18000);
}

void loop()
{
  //Validación de la fecha y hora correctas
  while (!timeClient.update()) {
    timeClient.forceUpdate();
  }

  //Llamado de Firebase.ready() para gestionar las tareas de autenticación y respuesta.
  if (Firebase.ready() && (millis() - dataMillis > 180000 || dataMillis == 0))
  {
    dataMillis = millis();
    if (!taskCompleted)
    {
      taskCompleted = true;

      FirebaseJson content;

      //Creación del documento anidado en la ruta padre
      String documentPath = "Placas";

      //------------------HUMEDAD-----------------
      //Creación de la colección y documento para el sensor de humedad (higrometro)
      content.set("fields/Humedad/doubleValue", Humedad);

      //---------------TEMPERATURA----------------
      float t = dht.readTemperature();    // Leectura la temperatura relativa
      int temperatura = t;                // Declaración de la lectura del dht para Firestore
      if (isnan(t)) {                     // Comprobación si existe algún error en la lectura
        //Creación de la colección y documento para el sensor de temperatura (DHT11) sin datos
        content.set("fields/Temperatura/stringValue", " DHT11 Sin datos");

      }
      else {
        //Creación de la colección y documento para el sensor de temperatura (DHT11) con datos
        content.set("fields/Temperatura/doubleValue", temperatura);
      }

      //------------------FECHA-------------------
      //Método para la conversión de la fecha y hora legible
      formattedDate = timeClient.getFormattedDate();

      // Extracción de la fecha por separado de la hora
      int splitT = formattedDate.indexOf("T");
      dayStamp = formattedDate.substring(0, splitT);
      Serial.print("Fecha: ");
      Serial.println(dayStamp);

      //Creación de la colección y documento para la fecha
      content.set("fields/Fecha/stringValue", dayStamp);

      //------------------HORA-------------------
      // Extraccion de la hora por separado de la fecha
      timeStamp = formattedDate.substring(splitT + 1, formattedDate.length() - 1);
      Serial.print("HORA: ");
      Serial.println(timeStamp);

      //Creación de la colección y documento para la hora
      content.set("fields/Hora/stringValue", timeStamp);

      //------------------------------------------

      String doc_path = "projects/";
      doc_path += FIREBASE_PROJECT_ID;
      doc_path += "/databases/(default)/documents/coll_id/doc_id";

      Serial.print("Create a document... ");
      if (Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw()))
        Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
      else
        Serial.println(fbdo.errorReason());

    }
  }
}
