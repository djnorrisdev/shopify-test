<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Link;
use Faker\Generator as Faker;

$factory->define(Link::class, function (Faker $faker) {
    return [
        'original_content_title' => $faker->realText(40),
        'link_url' =>'https://codegainzapp.myshopify.com/discount/50JULY4?redirect=%2Fproducts%2Fherschel&utm_source=test1&utm_source=test2&utm_source=test3&utm_source=test4',
        'campaign_source' => $faker->randomElement(array('facebook', 'instagram', 'twitter', 'tiktok', 'youtube')),
        'campaign_medium' => $faker->word(),
        'campaign_name' => $faker->word(),
        'campaign_term' => $faker->word(),
        'campaign_content' => $faker->word(),
        'discount_code' => $faker->word(),
        'original_content_url' => 'https://codegainzapp.myshopify.com/products/adidas-classic-backpack-legend-ink-multicolour',
        'link_img_url' => $faker->randomElement(array('https://cdn.shopify.com/s/files/1/0531/5507/0121/collections/7e6bb0fa16ee31d6537c58e4d9d453a8_501651da-f1a3-4f9e-8edc-36d78c024294.png?v=1610806098', 'https://cdn.shopify.com/s/files/1/0531/5507/0121/products/09ba62adafa6de79108792f1e5467f6e.jpg?v=1610805372', 'https://cdn.shopify.com/s/files/1/0531/5507/0121/products/85cc58608bf138a50036bcfe86a3a362.jpg?v=1610805453')),
        'link_type' => $faker->randomElement(array('product', 'collection', 'custom')),
        'original_content_id' => 'gid://shopify/Product/6399366168745',
        'user_id' => 1,
        'created_at' => $faker->dateTimeBetween('-30 Days', '+1 week'),
        'updated_at' => $faker->dateTimeBetween('-30 Days', '+1 week'),
    ];
});

// $table->bigIncrements('id');
// $table->longText('link_url');
// $table->string('original_content_title');
// $table->string('campaign_source')->nullable();
// $table->string('campaign_medium')->nullable();
// $table->string('campaign_name')->nullable();
// $table->string('campaign_term')->nullable();
// $table->string('campaign_content')->nullable();
// $table->string('discount_code')->nullable();
// $table->longText('original_content_url');
// $table->string('link_type');
// $table->longText('link_img_url')->nullable();
// $table->longText('original_content_id')->nullable();
// $table->bigInteger('user_id')->unsigned();
// $table->timestamps();