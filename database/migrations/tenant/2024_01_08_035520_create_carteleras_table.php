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

            $table->unsignedBigInteger('campanas_id')->nullable();
            $table->foreign('campanas_id')->references('id')->on('campanas');

            $table->unsignedBigInteger('disenos_id');
            $table->foreign('disenos_id')->references('id')->on('disenos');

            $table->string('marquesina')->nullable();
            $table->date('fecha_inicial')->nullable();
            $table->date('fecha_final')->nullable();

            $table->char('orientaciones_id');
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
