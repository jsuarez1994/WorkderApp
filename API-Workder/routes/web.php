<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


//Ruta User
Route::post('api/register', 'UserController@register');
Route::post('api/login', 'UserController@login');
Route::resource('/api/user', 'UserController');
Route::get('api/usersCompany/{id_Company}', 'UserController@usersCompany');
Route::get('api/allUsersCompany/{id_Company}', 'UserController@allUsersCompany');

//Ruta Order
Route::resource('/api/orders', 'OrderController');
Route::get('/api/getorders/{id}', 'OrderController@getOrders');
Route::match(['put', 'patch'], '/api/complete/{id}', 'OrderController@completed');//Asigna el atributo finish a 0, significa que esta terminada
Route::get('/api/ordersCompany/{id_Company}/{completed}', 'OrderController@ordersCompany');//Muestra ordenes de una misma compañia que estén completadas

//Ruta Company
Route::resource('/api/company', 'CompanyController');