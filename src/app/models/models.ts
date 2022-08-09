export interface Placa {
    // interface para uso en las graficas
    [x: string]: any;
    id?: string;
    Nombre?: string;
    Fecha?: Date;
    Hora?: string;
    Temperatura?: number;
    Humedad?: number ;
    Estado?: string
}

export interface usuario {
    //Intreface para la base de datos de los usuarios
    uid?: string;
    Nombre?: string;
    Correo?: string,
    Upassword?: string,
    Perfil?: 'normal'|null,
}

export class Electro {
    // clase para los datos de la electriovalbula
    $key: string;
    Estado?: string;
    Tiempo: string;
    HoraDia?:string;
    HoraNoche?: string;
}