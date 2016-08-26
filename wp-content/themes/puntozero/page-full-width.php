<?php
/*
Template Name: Full Width Page
*/
?>

<?php get_header(); ?>

<div id="content" class="row">
	<div class="container-fluid page-full-with">
	<div id="main" class="page col-sm-12 col-md-10 col-md-offset-1" role="main">

		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<?php puntozero_display_page_full_with(); ?>

		<?php comments_template(); ?>

		<?php endwhile; ?>

		<?php else : ?>

		<article id="post-not-found" class="block">
		    <p><?php _e("No pages found.", "puntozero"); ?></p>
		</article>

		<?php endif; ?>

	</div>
	</div>

</div>

<?php get_footer(); ?>
