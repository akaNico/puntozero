<?php get_header(); ?>

<div id="content">
	<div class="blog-container">
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-12 col-md-10 col-md-offset-1">
					<?php wp_nav_menu( array( 'theme_location' => 'blog-main-menu', 'container_class' => 'main_blog_menu_class'  ) ); ?>
					<?php wp_nav_menu( array( 'theme_location' => 'categories-menu', 'container_class' => 'categories_menu_class'  ) ); ?>
					<div class="clearfix">&nbsp;</div>
				</div>
			</div>
			<div class="row <?php echo the_category_unlinked(' '); ?>">
				<div id="main" class="post col-sm-12 col-md-7 col-md-offset-1" role="main">
					<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

						<?php puntozero_display_post(false); ?>
						<?php if ( function_exists( 'ADDTOANY_SHARE_SAVE_KIT' ) ) { ADDTOANY_SHARE_SAVE_KIT(); } ?>
						<?php comments_template('',true); ?>
						<?php if (get_next_post() || get_previous_post()) { ?>
						<nav class="block">
							<ul class="pager pager-unspaced">
								<li class="previous"><?php previous_post_link('%link', "&laquo; " . __( 'Previous Post', "puntozero")); ?></li>
								<li class="next"><?php next_post_link('%link', __( 'Next Post', "puntozero") . " &raquo;"); ?></li>
							</ul>
						</nav>
						<?php } ?>

						<?php endwhile; ?>
					<?php else : ?>

						<article id="post-not-found" class="block">
						    <p><?php _e("No posts found.", "puntozero"); ?></p>
						</article>

					<?php endif; ?>
				</div>
				<?php get_sidebar("right"); ?>
			</div>
		</div>
	</div>
</div>

<?php get_footer(); ?>
