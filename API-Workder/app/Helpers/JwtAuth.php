<?php
namespace App\Helpers;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\User;

class JwtAuth{

    public $key;

    public function __construct(){
        $this->key = 'esta-es-mi-clave-secreta-523423423*';
    }

    public function signup($email, $password, $getToken=null){

        $user = User::where(
            [   'email' => $email,
                'password' => $password
            ])->first();        

        if(is_object($user)){
            //Generar Token y Devolverlo
            $token = array(
                'sub' => $user->id, //Indice Token
                'email' => $user->email,
                'name' => $user->name,
                'surname' => $user->surname,
                'id_Company' => $user->id_Company,
                'rol' => $user->rol,
                'iat' => time(), //Propiedad de cuando se ha creado el token
                'exp' => time() + (7*24*60*60) //Cuando expira Token
            );

            $jwt =  JWT::encode($token, $this->key, 'HS256'); //Token y clave secreta y algoritmo codificacion
            $decode = JWT::decode($jwt, $this->key, array('HS256')); //Devuelve el objeto en sí


            //Esto hace que si le pasamos getToken nos devolveria el objeto cifrado
            if(is_null($getToken))
                return $jwt;
            else
                return $decode;

        }else{
            //Devuelve error
            return array('status' => 'error', 'message' => 'Login Fallido');
        }

    }

    public function checkToken($jwt, $getIdentity=false){
        $auth = false;

        try{
            $decoded = JWT::decode($jwt, $this->key, array('HS256'));

            
        }catch(\UnexpextedValueException $e){
            $auth=false;
        }catch(\DomainException $e){
            $auth=false;
        }

        if(isset($decoded) && is_object($decoded) && isset($decoded->sub))
            $auth = true;
        else
            $auth = false;

        if($getIdentity)
            return $decoded;

        return $auth;
    }

}