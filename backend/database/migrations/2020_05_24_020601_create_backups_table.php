<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBackupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('backups', function (Blueprint $table) {
            $table->id();
            $table->text('answered');
            $table->text('nominations');
            $table->string('last_answer_video');
            $table->string('last_answer_thumbnail');
            $table->string('last_answer_title');
            $table->float('diagram_zoom');
            $table->float('mobile_zoom');
            $table->float('zoom_value');
            $table->float('mobile_zoom_value');
            $table->float('divider');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('backups');
    }
}
