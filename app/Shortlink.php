<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shortlink extends Model
{
    // Relationship between links and shortlink. Can now use laravel orm to get access to everything having to do with links and shortlinks.
    public function link()
    {
        return $this->belongsTo('App\Link');
    }
}
