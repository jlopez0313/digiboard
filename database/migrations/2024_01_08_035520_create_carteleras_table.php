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
        Schema::create('carteleras', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('pantallas_id');
            $table->foreign('pantallas_id')->references('id')->on('pantallas');

            $table->unsignedBigInteger('disenos_id');
            $table->foreign('disenos_id')->references('id')->on('disenos');

            $table->string('marquesina');
            $table->timestamp('fecha_inicial');
            $table->timestamp('fecha_final');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carteleras');
    }
};
