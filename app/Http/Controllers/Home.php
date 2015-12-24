<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Redirect, Input, Auth, Log;

class Home extends Controller{
    public function index()
    {
        $data = Input::get('data');
        echo json_encode($data);
    }
}


 ?>
