<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\DB;
use App\Helpers\JwtAuth;

class UserController extends Controller{

    function __construct(){}
    
    public function register(Request $req){
        //Recoger post
        $json = $req->input('json', null);
        $params = json_decode($json);

        if(!is_null($json)){
            $role = 'Personal';
            $email = (isset($params->email)) ? $params->email : null;
            $password = (isset($params->password)) ? $params->password : null;
            $name = (isset($params->name)) ? $params->name : null;
            $surname = (isset($params->surname)) ? $params->surname : null;
            $age = (isset($params->age)) ? $params->age : null;
            $sex = (isset($params->sex)) ? $params->sex : null;
            $id_Company = (isset($params->id_Company)) ? $params->id_Company : null;
            $id_Orders = null;
        

            //Si no existe los campos no registrará
            if(!is_null($email) && !is_null($password) && !is_null($id_Company)){
                $user = new User();
                $user->rol = $role;
                $user->email = $email;
                //Enciptaremos contraseña
                    $pwd = hash('sha256', $password);
                $user->password = $pwd;
                $user->name = $name;
                $user->surname = $surname;
                $user->age = $age;
                $user->sex = $sex;
                $user->id_Company = $id_Company;
                $user->id_Orders = $id_Orders;
                

                //Comprobar usuario duplicado
                $isset_user = User::where('email', '=', $email)->first();

                if(count($isset_user) == 0){
                    //Guardar Usuario
                    $user->save();
                    $data = array(
                        'status' => 'success',
                        'code' => 200,
                        'message' => 'Usuario creado'
                    );
                }else{
                    //No guarda Usuario
                    $data = array(
                        'status' => 'error',
                        'code' => 400,
                        'message' => 'Usuario duplicado'
                    );
                }

                
            }else{
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'Usuario no creado. Rellene todos los datos'
                );
            }

        }else{
            $data = array(
                'status' => 'error',
                'code' => 400,
                'message' => 'Datos pasados a la API incorrectamente'
            );
        }

        return response()->json($data, 200);
    }


    public function login(Request $req){
        $jwtAuth = new JwtAuth();

        //Recibir POST
        $json = $req->input('json', null);
        $params = json_decode($json);

        $email =(!is_null($json) && isset($params->email)) ? $params->email : null;
        $password = (!is_null($json) && isset($params->password)) ? $params->password : null;
        //Cifrar password
            $pwd = hash('sha256', $password);
        $getToken = (!is_null($json) && isset($params->gettoken)) ? $params->gettoken : null;

        if(!is_null($email) && !is_null($password) && (is_null($getToken) || $getToken == 'false')){
            $signup = $jwtAuth->signup($email, $pwd);//Devuelve el objeto codificado, si pones TRUE devuelve decodificado

        }elseif($getToken != null){
            $signup = $jwtAuth->signup($email, $pwd, $getToken);

        }else{
            $signup = array(
                'status' => 'error',
                'message' => 'Envia tus datos por POST'
            );
        }

        return response()->json($signup, 200);
        
    }

    //Muestra usuarios de una compañia con rol Personal.
    public function usersCompany($id_Company){
        $users = User::where([['id_Company',$id_Company],['rol', 'Personal']])->get();

        if(count($users) > 0){
            return response()->json([
                'users' => $users,
                'status' => 'success'
            ],200);
        }else{
            return response()->json([
                'message' => 'No hay empleados de dicha compañia.',
                'status' => 'error'
            ],200);
        }
    }

    //Muestra todos los empleados de una empresa
    public function allUsersCompany($id_Company){
        $users = User::where('id_Company',$id_Company)->get();

        if(count($users) > 0){
            return response()->json([
                'users' => $users,
                'status' => 'success'
            ],200);
        }else{
            return response()->json([
                'message' => 'No hay empleados de dicha compañia.',
                'status' => 'error'
            ],200);
        }
    }

    //Muestra detalle Usuario
    public function show($id){

        $user = User::find($id);

        if(is_object($user)){
                return response()->json([
                    'user' => $user,
                    'status' => 'success'
                ],200);
        }else{
            return response()->json([
                'message' => 'Error al mostrar el usuario',
                'status' => 'success'
            ],200);
        }
    }
}
