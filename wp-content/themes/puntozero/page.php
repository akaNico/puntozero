<?php get_header(); ?>

<div id="content" class="row">

	<div class="container-fluid">
	<div id="main" class="page <?php puntozero_main_classes(); ?> col-md-offset-1" role="main">

		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<?php puntozero_display_post(false); ?>

		<?php comments_template('',true); ?>

		<?php endwhile; ?>

		<?php else : ?>

		<article id="post-not-found" class="block">
		    <p><?php _e("No pages found.", "puntozero"); ?></p>
		</article>

		<?php endif; ?>

	</div>

	<?php get_sidebar("left"); ?>
	<?php get_sidebar("right"); ?>

</div>
</div>

<?php get_footer(); ?>
