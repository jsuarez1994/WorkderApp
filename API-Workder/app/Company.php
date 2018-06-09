<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
//Entidad de la tabla Company
class Company extends Model {
    protected $table = 'company';
    public $timestamps = false;
}
