<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('campanas', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('evaluador_id');
            $table->foreign('evaluador_id')->references('id')->on('users');

            $table->unsignedBigInteger('tipo_respuesta_id');

            $table->string('nombre');
            $table->text('eje');
            $table->text('objetivo');
            $table->text('impacto');
            $table->text('pregunta');
            $table->string('logro_esperado');
            $table->string('descripcion_kpi');
            $table->string('valor_malo');
            $table->string('valor_regular');
            $table->string('valor_bueno');
            $table->string('encuesta');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campanas');
    }
};
