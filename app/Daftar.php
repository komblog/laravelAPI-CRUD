<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Daftar extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'lists';

    protected $guarded = [];
    public $timestamps = false;
}
