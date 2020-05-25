<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Backup extends Model
{
    protected $table = 'backups';

    protected $fillable = [
        'answered', 'nominations', 'last_answer_video', 'last_answer_thumbnail','last_answer_title','diagram_zoom','mobile_zoom','zoom_value','mobile_zoom_value','divider',
    ];
}
