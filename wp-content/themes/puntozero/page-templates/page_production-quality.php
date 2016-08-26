<?php
/**
 * Template Name: Production and Quality Control
 *
 * @package WordPress
 * @subpackage Puntozero
 * @since Puntozero 1.0
 */

 ?>

 <?php get_header(); ?>

 <div id="content" class="row style-development">
    <img src="<?php echo get_bloginfo('template_directory');?>/images/style-development-top-left.png" class="style-development-top-left" alt="style-development-top-left" />
    <img src="<?php echo get_bloginfo('template_directory');?>/images/style-development-bottom-right.png" class="style-development-bottom-right" alt="style-development-bottom-right" />

 	<div class="container-fluid">
 	<div id="main" class="page col-sm-12 col-md-12" role="main">
        <div class="style-development-content">

 		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
 		<?php puntozero_display_post(false); ?>
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
