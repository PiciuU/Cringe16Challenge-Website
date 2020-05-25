<?php

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


// Opcja dostępna dla każdego - wysłanie aplikacji ze swoją odpowiedzią
Route::post('answer','ParticipantController@answer');

// API dla danych strony
Route::get('data','DataController@data');

// API dla zdjęć
Route::get('data/gallery', 'DataController@gallery');

// API dla systemu logowania - Administatorzy
Route::post('admin/login','UserController@login');
Route::get('admin/logout','UserController@logout');
Route::get('admin/token/refresh', 'UserController@refreshToken');

Route::group(['middleware' => ['jwt.verify']], function() {
    // API dla oczekujących aplikacji
    Route::get('data/applications', 'ParticipantController@applications');
    Route::put('data/applications/close','ParticipantController@closeApplication');

    // API dla ustawień danych strony
    Route::put('data/update/settings','DataController@updateSettings');
    Route::put('data/update/answer','DataController@updateAnswer');
    Route::put('data/update/answers','DataController@updateAnswers');
    Route::put('data/update/nominations','DataController@updateNominations');

    // API dla zdjęć
    Route::post('data/upload', 'DataController@uploadImage');

    // API dla backupów
    Route::get('data/backup','DataController@backup');
    Route::get('data/backup/restore','DataController@restoreBackup');
    Route::get('data/backup/overwrite','DataController@overwriteBackup');

    // API dla systemu logowania - Administatorzy
    Route::get('admin/token/check','UserController@getAuthenticatedUser');
});
