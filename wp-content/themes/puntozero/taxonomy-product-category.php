<?php get_header(); ?>

<div id="content">
    <div class="blog-container">
        <div class="container-fluid">
            <div id="main" class="col-sm-12 col-md-10 col-md-offset-1" role="main">
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
    			<div class="container-fluid container-fluid-without-padding">
                    <div class="row <?php echo the_category_unlinked(' '); ?>">
						<?php if (have_posts()) : ?>
    						<?php while (have_posts()) : the_post(); ?>
        						<?php puntozero_display_product(true); ?>
    						<?php endwhile; ?>
    						<?php puntozero_page_navi(); ?>
						<?php else : ?>
						<article id="post-not-found" class="block">
						    <p><?php _e("No items found.", "puntozero"); ?></p>
						</article>
						<?php endif; ?>
					</div>
                </div>
            </div>
        </div>
	</div>
</div>

<?php get_footer(); ?>
