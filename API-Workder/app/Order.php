<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

class Order extends Model{
    protected $table = 'orders';
    public $timestamps = false;

    public function user(){
        return $this->belongsTo('App\User', 'id_Users');
    }
}
