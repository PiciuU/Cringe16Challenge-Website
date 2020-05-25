<?php

namespace App\Http\Controllers;

use App\Data;
use App\Backup;
use File;
use App\FileUpload;
use Illuminate\Http\Request;

class DataController extends Controller
{
    public function data(Request $request)
    {
        $data = Data::all();
        return response()->json($data);
    }

    public function updateSettings(Request $request)
    {
        $data = Data::find('1');

        if($request->has('diagram_zoom')) { $data->diagram_zoom = $request->input('diagram_zoom'); }
        if($request->has('mobile_zoom')) { $data->mobile_zoom = $request->input('mobile_zoom'); }
        if($request->has('zoom_value')) { $data->zoom_value = $request->input('zoom_value'); }
        if($request->has('mobile_zoom_value')) { $data->mobile_zoom_value = $request->input('mobile_zoom_value'); }
        if($request->has('divider')) { $data->divider = $request->input('divider'); }

        $data->save();
        return response()->json($request,201);
    }

    public function updateAnswer(Request $request)
    {
        $data = Data::find('1');
        $data->last_answer_video = $request->input('last_answer_video');
        $data->last_answer_thumbnail = $request->input('last_answer_thumbnail');
        $data->last_answer_title = $request->input('last_answer_title');

        $data->save();
        return response()->json($request,201);
    }

    public function updateAnswers(Request $request)
    {
        $data = Data::find('1');
        $data->answered = $request->input('answered');

        if(empty($request->input('answered'))) return response()->json(['fail' => 'Niepoprawny format danych!'], 400);

        $data->save();
        return response()->json($request,201);
    }

    public function updateNominations(Request $request)
    {
        $data = Data::find('1');
        $data->nominations = $request->input('nominations');

        if(empty($request->input('nominations'))) return response()->json(['fail' => 'Niepoprawny format danych!'], 400);

        $data->save();
        return response()->json($request,201);
    }

    public function gallery() {
        $path = public_path()."/imgs/"; // $path = base_path('../private_html/imgs/');
        $files = File::files($path);

        $gallery = [];

        foreach($files as $file) {
            $name = $file->getFileName();
            array_push($gallery,$name);
        }
        return response()->json($gallery);
    }

    public function uploadImage(Request $request)
    {
        $fileName = $request->input('fileName');
            if($request->get('image'))
            {
               $image = $request->get('image');
               $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
               \Image::make($request->get('image'))->save(public_path('imgs/').$fileName.".jpg");
             }

            return response()->json(['success' => 'Przesyłanie zdjęcia zakończone sukcesem!'], 200);
    }

    /* BACKUP */

    public function backup(Request $request)
    {
        $data = Data::find('2');
        return response()->json($data);
    }

    // Przywrócenie ostatnich poprawnych danych
    public function restoreBackup(Request $request)
    {
        $data = Data::find('1');
        $backup_data = Data::find('2');

        $data->answered = $backup_data->answered;
        $data->nominations = $backup_data->nominations;
        $data->last_answer_video = $backup_data->last_answer_video;
        $data->last_answer_thumbnail = $backup_data->last_answer_thumbnail;
        $data->last_answer_title = $backup_data->last_answer_title;
        $data->diagram_zoom = $backup_data->diagram_zoom;
        $data->mobile_zoom = $backup_data->mobile_zoom;
        $data->zoom_value = $backup_data->zoom_value;
        $data->mobile_zoom_value = $backup_data->mobile_zoom_value;
        $data->divider = $backup_data->divider;

        $data->save();
        return response()->json(['success' => 'Poprawnie przywrócono ostatnią bazę danych!'], 200);
    }

    public function overwriteBackup(Request $request)
    {
        $new_data = Data::find('1');
        $backup_data = Data::find('2');

        $backup = Backup::create($backup_data->toArray());

        $backup_data->answered = $new_data->answered;
        $backup_data->nominations = $new_data->nominations;
        $backup_data->last_answer_video = $new_data->last_answer_video;
        $backup_data->last_answer_thumbnail = $new_data->last_answer_thumbnail;
        $backup_data->last_answer_title = $new_data->last_answer_title;
        $backup_data->diagram_zoom = $new_data->diagram_zoom;
        $backup_data->mobile_zoom = $new_data->mobile_zoom;
        $backup_data->zoom_value = $new_data->zoom_value;
        $backup_data->mobile_zoom_value = $new_data->mobile_zoom_value;
        $backup_data->divider = $new_data->divider;

        $backup_data->save();
        return response()->json(['success' => 'Poprawnie nadpisano ostatnią bazę danych!'], 200);
    }
}
