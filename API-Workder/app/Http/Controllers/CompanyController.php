<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Company;

class CompanyController extends Controller{

    public function index(){

        $company = Company::all();

        return response()->json([
            'company' => $company,
            'status' => 'success'
        ],200);
        
    }

    public function show($id){

        $company = Company::find($id);

        if(is_object($company)){
            return response()->json([
                'company' => $company,
                'status' => 'success'
            ],200);
        }else{
            return response()->json([
                'message' => 'Error al mostrar la Empresa',
                'status' => 'success'
            ],200);
        }
    }
    
}
