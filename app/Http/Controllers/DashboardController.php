<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use DB;

class DashboardController extends Controller
{
    public function index() {
        // Start filtering of user by plan name
        // $user = Auth::user();
        // if($user->plan['name'] == 'Silver Plan') {
        //     return 'no access to this page';
        // } else {
        // return view('home');
        // }
        // End filtering of user by plan name
        return view('home');
    }

    public function dashboardAPI()
    {
        $userID = Auth::id();
        // SELECT count(c.id) FROM utmapp.clicks AS c INNER JOIN utmapp.shortlinks as s ON c.shortlink_id = s.id WHERE c.created_at BETWEEN now() - interval 6 day and now() and s.user_id = 2;
        //turning raw query into laravel orm 
        $totalClicks = DB::table('clicks as c')
        ->select(DB::raw('COUNT(c.id) as TotalClicks'))
        ->join('shortlinks', 'c.shortlink_id', '=', 'shortlinks.id')
        ->whereRaw('c.created_at >= NOW() + INTERVAL -6 DAY AND c.created_at < NOW() + INTERVAL 0 DAY and shortlinks.user_id = ?', [$userID]) 
        ->get();

        $totalLinks = DB::table('links')
        ->select(DB::raw('COUNT(*) as TotalLinks'))
        ->whereRaw('created_at>= NOW() + INTERVAL -6 DAY AND created_at < NOW() + INTERVAL 0 DAY and user_id = ?', [$userID] )
        ->get();

        $clicksData = DB::table('clicks as c')
        ->select(DB::raw("DATE_FORMAT(c.created_at, '%m/%d') AS date, count(c.id) as total, 'click' as 'type'"))
        ->join('shortlinks as s', 'c.shortlink_id', '=', 's.id')
        ->whereRaw('c.created_at >= current_date() + INTERVAL -6 DAY AND c.created_at < current_date() + INTERVAL 1 DAY and s.user_id = ?', [$userID]) 
        ->groupBy('date')
        ->orderBy('date', 'asc')
        ->get();

        $linksData = DB::table('links as l')
        ->select(DB::raw("DATE_FORMAT(l.created_at, '%m/%d') AS date, count(l.id) as total, 'click' as 'type'"))
        ->whereRaw('created_at >= current_date() + INTERVAL -6 DAY AND created_at < current_date() + INTERVAL 1 DAY and user_id = ?', [$userID]) 
        ->groupBy('date')
        ->orderBy('date', 'asc')
        ->get();

        $sourceTotal = DB::table('clicks as c')
        ->select(DB::raw('COUNT(c.id) as total, l.campaign_source'))
        ->join('shortlinks as s', 'c.shortlink_id', '=', 's.id')
        ->join('links as l', 's.link_id', '=', 'l.id')
        ->whereRaw('c.created_at >= current_date() + INTERVAL -6 DAY AND c.created_at < current_date() + INTERVAL 1 DAY and s.user_id = ?', [$userID])
        ->groupBy('l.campaign_source')
        ->orderBy('l.campaign_source', 'asc')
        ->get();

        return response()->json([
            'totalClicks' => $totalClicks[0]->TotalClicks,
            'totalLinks' => $totalLinks[0]->TotalLinks,
            'linksData' => $linksData,
            'clicksData' => $clicksData,
            'sourceTotal' => $sourceTotal
            // Example of passing plan with json response to get plan data into Js
            // 'userPlan => $user->plan;
        ]);
    }

    public function graphql(Request $request) {
        $shop = Auth::user(); // codegainz.shopify.myapp.com
        $request = $shop->api()->graph($request->input('query'));
          // dd($request['body']); // dd() is for dumping data. Php uses arrays instead of json, so need to encode data as json below.
        return json_encode($request['body']['data']);
    }
}
