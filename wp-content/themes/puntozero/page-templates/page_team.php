<?php
/**
 * Template Name: Team
 *
 * @package WordPress
 * @subpackage Puntozero
 * @since Puntozero 1.0
 */

 ?>

 <?php get_header(); ?>

 <div id="content" class="row team">
 	<div class="container-fluid">
 	<div id="main" class="page col-sm-12 col-md-12" role="main">
        <div class="team-content">

 		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
 		<?php puntozero_display_team(false); ?>
 		<?php endwhile; ?>
 		<?php else : ?>
 		<article id="post-not-found" class="block">
 		    <p><?php _e("No pages found.", "puntozero"); ?></p>
 		</article>
 		<?php endif; ?>
        </div>
 	</div>
 	</div>

 </div>

 <?php get_footer(); ?>
