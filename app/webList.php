<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class webList extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'lists';

    protected $guarded = [];
    public $timestamps = false;
}
