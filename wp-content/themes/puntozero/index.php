<?php get_header(); ?>

<div id="content">
    <div class="blog-container">
        <div class="container-fluid">
            <div id="main" class="col-sm-12 col-md-10 col-md-offset-1" role="main">
                <?php wp_nav_menu( array( 'theme_location' => 'blog-main-menu', 'container_class' => 'main_blog_menu_class'  ) ); ?>
    			<?php wp_nav_menu( array( 'theme_location' => 'categories-menu', 'container_class' => 'categories_menu_class'  ) ); ?>

    			<div class="clearfix">&nbsp;</div>
    			<div class="container-fluid">
                    <div class="row">
                        <div class="col-sx-12 col-md-9">
                            <div class="row">
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
                        </div>
                        <?php get_sidebar("right"); ?>
                    </div>
                </div>
            </div>
        </div>
	</div>
</div>

<?php get_footer(); ?>
