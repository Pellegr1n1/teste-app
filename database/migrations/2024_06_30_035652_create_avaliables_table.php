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
        Schema::create('avaliables', function (Blueprint $table) {
            $table->id();
            $table->decimal('value');
            $table->unsignedBigInteger('idorder');
            $table->unsignedBigInteger('iduser');
            $table->timestamps();

            $table->foreign('idorder')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('iduser')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avaliables');
    }
};
