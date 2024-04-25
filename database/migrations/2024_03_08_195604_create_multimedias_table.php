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
        Schema::create('multimedias', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('carteleras_id');
            $table->foreign('carteleras_id')->references('id')->on('carteleras');

            $table->string('src');
            $table->string('type');
            $table->string('mimetype');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('multimedias');
    }
};
