<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use Illuminate\Support\Facades\DB;
use App\Order;
use App\User;
use App\Company;

class OrderController extends Controller{
    
    //Método que devuelve todas las ordenes de trabajo
    //de dicho usuario logeado
    public function getOrders($id){ 
        //Obtiene las ordenes no terminadas del usuario logado.
        $orders = Order::where([['id_Users',$id] , ['finish',1]])->get();
        

        if(count($orders) > 0){
            return response()->json([
                'orders' => $orders,
                'status' => 'success'
            ],200);
        }else{
            return response()->json([
                'message' => 'El usuario no tiene ordenes',
                'status' => 'error'
            ],200);
        }
    }

    //Funcion que indica una tarea a completada.
    public function completed($id){
        $order = Order::where('id',$id)->update(['finish'=>0]);
        if(is_object($order)){
            $data =[
                'order' => $order,
                'status' => 'success',
                'code' => 200
            ];
        }else{
            $data = array(
                'message' => 'Login incorrecto',
                'status' => 'success',
                'code' => 300
            );
        }

        return response()->json($data,200);
    }

    //Muestra en detalle la orden seleccionada
    public function show($id){

        $order = Order::find($id);

        if(is_object($order)){
            return response()->json([
                'order' => $order,
                'status' => 'success'
            ],200);
        }else{
            return response()->json([
                'message' => 'Error al mostrar la orden',
                'status' => 'success'
            ],200);
        }
    }

    //Inserta una orden de trabajo solo si el rol de usuario es 'Boss'
    public function store(Request $req){
        $jwtAuth = new JwtAuth();
        $hash = $req->header('Authorization', null);
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){
            $json = $req->input('json', null);
            $params = json_decode($json);
            $params_array = json_decode($json, true);
            $user = $jwtAuth->checkToken($hash, true);
            //$req->merge($params_array);
            $validate = \Validator::make($params_array,[
                'title' => 'required',
                'description' => 'required',
                'difficulty' => 'required',
                'dateInit' => 'required',
                'dateInit' => 'required',
                'dateFinish' => 'required',
                'id_Users' => 'required',
            ]);

            if($validate->fails())
                return response()->json($validate->error(), 400);
        

            //Solo podrán asignar ordenes de trabajo los jefes de empresa.
            if($user->rol == 'Boss'){

                $user = $this->getUser($params->id_Users);

                $order = new Order();
                $order->title = $params->title;
                $order->description = $params->description;
                $order->difficulty = $params->difficulty;
                $order->dateInit = $params->dateInit;
                $order->dateFinish = $params->dateFinish;
                $order->id_Users = $params->id_Users;
                $order->id_Company = $user->id_Company;
                $order->finish = 1;

                $order->save();

                $data = array(
                    'order' => $order,
                    'status' => 'success',
                    'code' => 200
                );
            }else{
                $data = array(
                    'message' => 'No tienes el cargo para asignar ordenes de trabajo',
                    'status' => 'success',
                    'code' => 200
                );
            }
        
        }else{
            $data = array(
                'message' => 'Login incorrecto',
                'status' => 'success',
                'code' => 300
            );
        }

        return response()->json($data,200);

    }

    //Metodo auxiliar para obtener inf Usuario
    public function getUser($id){
        $user = User::find($id);
        return $user;
    }

    public function update(Request $req, $id){
        $jwtAuth = new JwtAuth();
        $hash = $req->header('Authorization', null);
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken){
            $json = $req->input('json', null);
            //$params = json_decode($json);
            $params_array = json_decode($json,true);
            $user = $jwtAuth->checkToken($hash, true);
            //Validar Datos
            $valida = \Validator::make($params_array,[
                'title' => 'required',
                'description' => 'required',
                'difficulty' => 'required',
                'dateInit' => 'required',
                'dateInit' => 'required',
                'dateFinish' => 'required',
                'id_Users' => 'required',
            ]);

            if($valida->fails())
                return response()->json($valida->error(), 400);


            if($user->rol == "Boss"){
                    unset($params_array['id']);
                    unset($params_array['created_at']);
                    unset($params_array['finish']);
                    unset($params_array['id_Company']);
                    //Actualizar la orden
                    $order = Order::where('id',$id)->update($params_array);

                    $data = [
                        'status' => 'success',
                        'code' => 200 
                    ];
            }else{
                    $data = array(
                        'message' => "No tienes el cargo suficiente para actualizar una orden de trabajo",
                        'status' => 'success',
                        'code' => 200 
                    );
            }
        }else{
            $data = array(
                'message' => 'Login incorrecto',
                'status' => 'success',
                'code' => 300
            );
        }
        return response()->json($data,200);
    }

    public function destroy($id, Request $req){
        $jwtAuth = new JwtAuth();
        $hash = $req->header('Authorization', null);
        $checkToken = $jwtAuth->checkToken($hash);
        $user = $jwtAuth->checkToken($hash, true);


        if($checkToken){

            if($user->rol == "Boss"){
                $order = Order::find($id);
                $order->delete();

                $data = array(
                    'order' => $order,
                    'status' => 'success',
                    'code' => 200
                );
            }else{
                $data = array(
                    'message' => "No tienes el cargo suficiente para eliminar una orden.",
                    'status' => 'success',
                    'code' => 200
                );
            }
        }else{
            $data=array(
                'status' => 'error',
                'code' => 400,
                'message' => 'Login incorrecto'
            );
        }
        return response()->json($data,200);

    }

    //Muestra todas las ordenes asociadas a una compañia que ya están completadas 
    //o no segun el valor de la variable $completed.
    public function ordersCompany($id_Company,$completed){

        $orders = Order::where([['finish', $completed],
                                ['id_Company', $id_Company]])->get();

        if(is_object($orders)){
            return response()->json([
                'orders' => $orders,
                'status' => 'success'
            ],200);
        }else{
            return response()->json([
                'message' => 'Error al mostrar las ordenes',
                'status' => 'success'
            ],200);
        }
    }

}
