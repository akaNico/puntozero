<?php get_header(); ?>

<div id="content">
	<div class="blog-container">
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-12 col-md-10 col-md-offset-1">
					<?php wp_nav_menu( array( 'theme_location' => 'product-main-categories-menu', 'container_class' => 'main_product_categories_menu_class'  ) ); ?>

	                <?php
	                    if(findProductCategoryAnchestor('man') != null || findProductCategoryAnchestor('uomo') != null){
	                        wp_nav_menu( array( 'theme_location' => 'product-categories-man-menu', 'container_class' => 'categories_menu_class product-categories-menu'  ) );
	                    }
	                    if(findProductCategoryAnchestor('woman') != null || findProductCategoryAnchestor('donna') != null){
	                        wp_nav_menu( array( 'theme_location' => 'product-categories-woman-menu', 'container_class' => 'categories_menu_class product-categories-menu'  ) );
	                    }
	                ?>
	    			<div class="clearfix">&nbsp;</div>
				</div>
			</div>
			<div class="row">
				<div id="main" class="post col-sm-12 col-md-10 col-md-offset-1" role="main">
					<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

						<?php puntozero_display_product(false); ?>

						<?php/* if (get_next_post() || get_previous_post()) { ?>
						<nav class="block">
							<ul class="pager pager-unspaced">
								<li class="previous"><?php previous_post_link('%link', "&laquo; " . __( 'Previous Post', "puntozero")); ?></li>
								<li class="next"><?php next_post_link('%link', __( 'Next Post', "puntozero") . " &raquo;"); ?></li>
							</ul>
						</nav>
						<?php } */ ?>

						<?php endwhile; ?>
					<?php else : ?>

						<article id="post-not-found" class="block">
						    <p><?php _e("No products found.", "puntozero"); ?></p>
						</article>

					<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
</div>

<?php get_footer(); ?>
