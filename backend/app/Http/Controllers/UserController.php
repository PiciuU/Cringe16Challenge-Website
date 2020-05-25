<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;

class UserController extends Controller
{

    // public function register(Request $request)
    // {
    //     $validator = Validator::make($request->json()->all(), [
    //         'name' => 'required|string|max:255',
    //         'password' => 'required|string|min:6',
    //     ]);

    //     if($validator->fails()) {
    //         return response()->json($validator->errors()->toJson(), 400);
    //     }

    //     $user = User::create([
    //         'name' => $request->json()->get('name'),
    //         'password' => Hash::make($request->json()->get('password')),
    //     ]);

    //     $token = JWTAuth::fromUser($user);

    //     return response()->json(compact('user','token'), 201);
    // }

    public function login(Request $request)
    {
        $credentials = $request->json()->all();
        //JWTAuth::factory()->setTTL(1);

        try {
            if(!$token = JWTAuth::attempt($credentials)){
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch(JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        return response()->json(compact('token'));
    }

    public function getAuthenticatedUser()
    {
        try {
            if(!$user = JWTAuth::parseToken()->authenticate()){
                return reponse()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        return response()->json(compact('user'));
    }

    public function logout()
    {
        $token = JWTAuth::getToken();
        if ($token) {
            JWTAuth::invalidate($token);
        }
        return response()->json([
            'status' => 0
        ], 200);
    }

    public function refreshToken() {
        $token = JWTAuth::getToken();
        $new_token = JWTAuth::refresh($token);

        return response()->json(compact('new_token'));
    }

    public function checkExpiration() {
        $token = JWTAuth::getToken();
        $expiration = JWTAuth::decode($token)->get('exp');
        $expires_at = date('d M Y h:i', $expiration);

        return response()->json(compact('expires_at'));
    }

    public function checkToken(Request $request) {
        $token = JWTAuth::getToken();
        return response()->json($token);
    }
}
