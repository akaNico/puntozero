<?php get_header(); ?>

<div id="content" class="row">

	<div id="main" class="<?php puntozero_main_classes(); ?>" role="main">

		<?php if (have_posts()) : ?>

		<?php while (have_posts()) : the_post(); ?>

		<?php puntozero_display_post(true); ?>

		<?php endwhile; ?>

		<?php puntozero_page_navi(); ?>

		<?php else : ?>

		<article id="post-not-found" class="block">
		    <p><?php _e("No posts found.", "puntozero"); ?></p>
		</article>

		<?php endif; ?>

	</div>

	<?php get_sidebar("left"); ?>
	<?php get_sidebar("right"); ?>

</div>

<?php get_footer(); ?>
