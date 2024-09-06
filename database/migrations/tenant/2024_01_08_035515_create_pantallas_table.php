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
        Schema::create('pantallas', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('areas_id');
            $table->foreign('areas_id')->references('id')->on('areas');

            $table->unsignedBigInteger('carteleras_id')->nullable();
            $table->foreign('carteleras_id')->references('id')->on('carteleras');
            
            $table->string('pantalla');
            $table->string('code')->nullable();
            $table->char('estado');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pantallas');
    }
};
