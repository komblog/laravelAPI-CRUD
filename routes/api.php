<?php

use App\Daftar;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('lists', 'DaftarController@index'); //index
Route::get('lists/{id}', 'DaftarController@show'); //show
Route::post('lists', 'DaftarController@store'); //store
Route::put('lists/{id}', 'DaftarController@update'); //update
Route::delete('lists/{id}', 'DaftarController@destroy'); //delete