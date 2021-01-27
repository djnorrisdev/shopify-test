<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        # Create a recurring "Demo" plan for $5.00, with 7 trial days, which will be presented on install to the shop and have the ability to issue usage charges to a maximum of $10.00
        #INSERT INTO plans (`type`,`name`,`price`,`interval`,`capped_amount`,`terms`,`trial_days`,`test`,`on_install`,`created_at`,`updated_at`) VALUES ('RECURRING','Test Plan',5.00,'EVERY_30_DAYS',10.00,'Test terms',7,FALSE,1,NULL,NULL);
        DB::table('plans')->insert([
            'type' => 'RECURRING',
            'name' => 'Silver Plan',
            'price' => 10.00,
            'interval' => 'EVERY_30_DAYS',
            'capped_amount' => NULL,
            'terms' => NULL,
            'trial_days' => '7',
            'test' => true,// FALSE in prod
            'on_install' => 0,
            'created_at' => NULL,
            'updated_at' => NULL,
        ]);

        DB::table('plans')->insert([
            'type' => 'RECURRING',
            'name' => 'Gold Plan',
            'price' => 25.00,
            'interval' => 'EVERY_30_DAYS',
            'capped_amount' => NULL,
            'terms' => NULL,
            'trial_days' => '7',
            'test' => TRUE,// FALSE in prod
            'on_install' => 1,
            'created_at' => NULL,
            'updated_at' => NULL,
        ]);

    }
}
