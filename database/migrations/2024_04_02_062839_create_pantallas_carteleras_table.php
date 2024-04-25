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
        Schema::create('pantallas_carteleras', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('pantallas_id');
            $table->foreign('pantallas_id')->references('id')->on('pantallas');

            $table->unsignedBigInteger('carteleras_id');
            $table->foreign('carteleras_id')->references('id')->on('carteleras');

            $table->char('estado');
            $table->string('code');
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pantallas_carteleras');
    }
};
