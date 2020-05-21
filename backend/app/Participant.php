<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    protected $table = 'participants';

    protected $fillable = [
        'name', 'nomination_from', 'video', 'avatar','status',
    ];
}
