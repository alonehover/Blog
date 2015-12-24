<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('list', function () {
    return view('list');
});


Route::post('home','Home@index');

Route::get('home', function(){
    echo "get";
});

Route::group(['prefix' => 'admin','namespace'=>'Manage'], function () {
    Route::get('home','ArticleController@create');
});

Route::get('home/{id}', 'ArticleController@show');

Route::get('get_ah',function(){
    $home = App\Author::where('author_id','=','1')->first();
    echo "ah`s first article name is ".$home -> name;
});

Route::get('article',function(){
    $articles = App\Article::all();
    foreach ($articles as $article) {
        echo $article->name . '||' . $article->author->name . '<br />';
    }
});
