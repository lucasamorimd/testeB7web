<?php

use App\Http\Controllers\Notes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('notes')->group(function () {
    Route::controller(Notes::class)->group( function () {
        Route::get('/list', 'list');
        Route::get('/trash', 'listTrash');
        Route::get('/getOne/{id_note}', 'get');
        Route::post('/new', 'store');
        Route::put('/edit', 'update');
        Route::put('/recicle', 'recicle');
        Route::delete('/delete', 'delete');
    });
});

