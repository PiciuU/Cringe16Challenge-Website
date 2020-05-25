<?php

namespace App\Http\Controllers;

use App\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ParticipantController extends Controller
{
    public function answer(Request $request)
    {
        // $validator = Validator::make($request->json()->all(), [
        //     'name' => 'required|string|max:255',
        //     'nomination_from' => 'required|string|max:255',
        //     'video' => 'required|text',
        //     'avatar' => 'text',
        // ]);

        // if($validator->fails()) {
        //     return response()->json($validator->errors()->toJson(), 400);
        // }

        // $answer = Participant::create([
        //     'name' => $request->json()->get('name'),
        //     'nomination_from' => $request->json()->get('nomination_from'),
        //     'video' => $request->json()->get('video'),
        //     'avatar' => $request->json()->get('avatar'),
        // ]);

        $answer = Participant::create($request->all());

        return response()->json(compact('request'), 201);
    }

    public function applications() {
        $data = Participant::where('status','=',0)->get();
        return response()->json($data);
    }

    public function closeApplication(Request $request) {
        $application = Participant::find($request->id);
        $application->status = 1;
        $application->save();
        return response()->json(['success' => 'Poprawnie zamknięto oczekujące zgłoszenie!'], 200);
    }
}
