<?php
/**
 * Template Name: Homepage
 *
 * @package WordPress
 * @subpackage Puntozero
 * @since Puntozero 1.0
 */

 ?>

 <?php get_header(); ?>

 <div id="content" class="row">
 	<div class="container-fluid">
 	<div id="main" class="page col-sm-12 col-md-12" role="main">
        <div class="homepage">

        <?php get_sidebar("homepage_slider"); ?>
        <?php wp_nav_menu( array( 'theme_location' => 'home-categories-menu', 'container_class' => 'home_categories_menu_class'  ) ); ?>
        <?php get_sidebar("home_before_three_columns"); ?>
        <?php get_sidebar("homepage_three_columns"); ?>
 		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
 		<?php puntozero_display_homepage(); ?>
 		<?php endwhile; ?>

        <div class="row contacts">
            <div class="col-sm-12 col-md-12">
                <?php get_sidebar("homepage_contacts_title"); ?>
            </div>
            <div class="col-sm-offset-1 col-sm-10 col-md-5 homepage_contacts_text">
                <?php get_sidebar("homepage_contacts_text"); ?>
            </div>
            <div class="col-sm-offset-1 col-sm-10 col-md-offset-0 col-md-5 homepage_contacts_form">
                <?php get_sidebar("homepage_contacts_form"); ?>
            </div>
        </div>

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
