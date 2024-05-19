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
            $table->string('nmproduct')->nullable(false);
            $table->integer('qtproduct')->nullable(false);
            $table->decimal('price')->nullable(false);
            $table->unsignedBigInteger('iduser')->nullable(false);
            $table->unsignedBigInteger('idcategory')->nullable(false);
            $table->string('image_path')->nullable();
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
