<!doctype html>

<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

	<div id="content-wrapper">

		<header>
			<div class="container-fluid">
				<div class="row">
					<nav class="navbar navbar-default navbar-static-top">
						<div class="navbar-header">
							<?php if (has_nav_menu("main_nav")): ?>
							<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-responsive-collapse">
			    				<span class="sr-only"><?php _e('Navigation', 'puntozero'); ?></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
							<?php endif ?>
							<a class="navbar-brand" title="<?php bloginfo('description'); ?>" href="<?php echo esc_url(home_url('/')); ?>">
								<img id="logo-image" src="<?php echo get_bloginfo('template_directory');?>/images/logo.png" class="logo" alt="<?php echo bloginfo('name'); ?>" />
							</a>
						</div>

						<?php if (has_nav_menu("main_nav")): ?>
						<div id="navbar-responsive-collapse" class="collapse navbar-collapse">
							<?php
							    puntozero_display_main_menu();
							?>

						</div>
						<?php endif ?>
					</nav>
				</div>
			</div>
		</header>

		<div id="page-content">
