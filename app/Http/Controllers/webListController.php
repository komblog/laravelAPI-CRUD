<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
//extras
use App\webList;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;

class webListController extends Controller
{
    public function index()
    {
    	$lists = DB::connection('mongodb')->collection('lists')->paginate(2);
        
        return view('web.home', ['lists' => $lists]);
    }
}
