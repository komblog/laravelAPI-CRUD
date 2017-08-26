<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Daftar extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'lists';

    protected $fillable = [
    	'name', 'address', 'email', 'contact',
    ];
}
