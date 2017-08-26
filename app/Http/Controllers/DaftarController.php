<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
//extras
use App\Daftar;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;

class DaftarController extends Controller
{   
    public function manageItem()
    {
        return view('web.home');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $lists = Daftar::latest()->paginate(5);
        
        return response()->json($lists, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $list = new Daftar;
        $list->name =  $request->input('name');
        $list->address =  $request->input('address');
        $list->email =  $request->input('email');
        $list->contact = $request->input('contact') ;
        $list->save();
        
        return response()->json($list, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = DB::connection('mongodb')->collection('lists')->where('_id', $id)->first();
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    

    public function update(Request $request, $id)
    {        
        $update = DB::connection('mongodb')->collection('lists')->where('_id', $id)->update([
            'name' => $request->input('name'),
            'address' => $request->input('address'),
            'email' => $request->input('email'),
            'contact' => $request->input('contact')
        ] );
        
        return response()->json($update, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $delete = DB::connection('mongodb')->collection('lists')->where('_id', $id)->delete();
        return response()->json($delete); 
    }
}
