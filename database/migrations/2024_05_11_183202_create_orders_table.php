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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->decimal('total');
            $table->decimal('tax');
            $table->unsignedBigInteger('iduser');
            $table->timestamps();

            $table->foreign('iduser')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->string('nmproduct');
            $table->decimal('price');
            $table->decimal('qtproduct');
            $table->unsignedBigInteger('iduser');
            $table->unsignedBigInteger('idcompany');
            $table->unsignedBigInteger('idcategory');
            $table->unsignedBigInteger('idorder');
            $table->unsignedBigInteger('idproduct');
            $table->timestamps();

            $table->foreign('iduser')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('idcompany')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('idcategory')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('idorder')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('idproduct')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
