<?php

namespace App\Http\Controllers;

use App\Click;
use App\Shortlink;
use Illuminate\Http\Request;

class ShortlinkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($slug)
    {
        // Test by going to https://utmapp.test/600d955e140a7. 600d955e140a7 came from shortlinks table in db. 

        // Find in shortlink table first item where slug matches $slug.
        $shortlink = Shortlink::firstwhere('slug', $slug);
        $click = new Click;
        $click->shortlink_id = $shortlink->id;
        $click->save();
        // Beacuse link() from Shortlink.php and Link.php are connected, link() is a method available to use. Finds data within link table . Use ->link below without calling it like this: ->link().
        
        return redirect($shortlink->link->link_url);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Shortlink  $shortlink
     * @return \Illuminate\Http\Response
     */
    public function show(Shortlink $shortlink)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Shortlink  $shortlink
     * @return \Illuminate\Http\Response
     */
    public function edit(Shortlink $shortlink)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Shortlink  $shortlink
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Shortlink $shortlink)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Shortlink  $shortlink
     * @return \Illuminate\Http\Response
     */
    public function destroy(Shortlink $shortlink)
    {
        //
    }
}
