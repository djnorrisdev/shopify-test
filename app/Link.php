<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    public function user()
    {
        return $this->belongsTo('App/User');
    }


// One link has one shortlink, and one shortlink belongs to one link. (one-to-one relationship). shortlink() is linked to link() in Shortlink.php.

    public function shortlink()
    {
        return $this->hasOne('App\Models\Shortlink');
    }

    public function clicks()
    {
        return $this->hasManyThrough(
            'App\Models\Click', // first argument is the final model, Click
            'App\Models\Shortlink', // second argument is the intermediate model, Shortlink 
            'link_id', // Foreign key on shortlinks table (name of the foreign key on the intermediate model, Shortlink)
            'shortlink_id', // Foreign key on clicks table
            'id', // Local key on links table (is the local key, id, of the current model, Link)
            'id' // Local key on shortlinks table (local key, id, of the intermediate model, Shortlink)
        );
    }
}
