<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class ClickSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $shortlinks = App\Shortlink::all();

        foreach ($shortlinks as $shortlink) {
            for($i=0; $i <= 50; $i++) {
                $click = new App\Click;
                $click->shortlink_id = $shortlink->id;
                $click->created_at = $faker->dateTimeBetween('-7 Days', '+1 week');
                $click->save();
            }
        }
    }
}
