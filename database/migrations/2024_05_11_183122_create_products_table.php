<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('nmproduct');
            $table->integer('qtproduct');
            $table->decimal('price', 10, 2);
            $table->enum('fgenabled', [1, 2]);
            $table->unsignedBigInteger('iduser');
            $table->unsignedBigInteger('idcategory');
            $table->string('image');
            $table->timestamps();

            $table->foreign('iduser')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('idcategory')->references('id')->on('categories')->onDelete('cascade');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
