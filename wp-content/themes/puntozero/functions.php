<?php

// Declaration of theme supported features
function puntozero_theme_support() {
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption'
    ));
    add_theme_support('post-thumbnails');      // wp thumbnails (sizes handled in functions.php)
    set_post_thumbnail_size(125, 125, true);   // default thumb size
    add_theme_support('automatic-feed-links'); // rss thingy
    add_theme_support('custom-background', array(
        'default-color' => '#595959',
        'default-image' => get_template_directory_uri() . '/default-background.jpg',
        'default-repeat' => 'no-repeat',
        'default-position-x' => 'center',
        'default-attachment' => 'fixed',
    ));
    add_theme_support( 'title-tag' );
    register_nav_menus(                      // wp3+ menus
        array(
            'main_nav' => __('Main Menu', 'puntozero'),   // main nav in header
        )
    );
    add_image_size( 'puntozero_featured', 1140, 1140 * (9 / 21), true);
    add_image_size( 'puntozero_blog_thumb', 900, 700, true);
    load_theme_textdomain( 'puntozero', get_template_directory() . '/languages' );
}
add_action('after_setup_theme','puntozero_theme_support');

function puntozero_theme_scripts() {
    // For child themes
    wp_register_style( 'wpbs-style', get_stylesheet_directory_uri() . '/style.css', array(), null, 'all' );
    wp_enqueue_style( 'wpbs-style' );
    wp_register_script( 'bower-libs',
        get_template_directory_uri() . '/app.min.js',
        array('jquery'),
        null );
    wp_enqueue_script('bower-libs');

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'puntozero_theme_scripts' );

function puntozero_load_fonts() {
    wp_register_style('puntozero_googleFonts', '//fonts.googleapis.com/css?family=Lato:400,700');
    wp_enqueue_style('puntozero_googleFonts');
}

add_action('wp_print_styles', 'puntozero_load_fonts');

// Set content width
if ( ! isset( $content_width ) )
    $content_width = 750;

// Sidebar and Footer declaration
function puntozero_register_sidebars() {
    register_sidebar(array(
        'id' => 'sidebar-right',
        'name' => __('Right Sidebar', 'puntozero'),
        'description' => __('Used on every page.', 'puntozero'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h4 class="widgettitle">',
        'after_title' => '</h4>',
    ));
    register_sidebar(array(
    	'id' => 'sidebar-left',
    	'name' => __('Left Sidebar', 'puntozero'),
    	'description' => __('Used on every page.', 'puntozero'),
    	'before_widget' => '<div id="%1$s" class="widget %2$s">',
    	'after_widget' => '</div>',
    	'before_title' => '<h4 class="widgettitle">',
    	'after_title' => '</h4>',
    ));

    register_sidebar(array(
      'id' => 'footer1',
      'name' => __('Footer', 'puntozero'),
      'before_widget' => '<div id="%1$s" class="widget col-xs-6 col-sm-4 col-md-3 %2$s">',
      'after_widget' => '</div>',
      'before_title' => '<h4 class="widgettitle">',
      'after_title' => '</h4>',
    ));

}
add_action( 'widgets_init', 'puntozero_register_sidebars' );

function register_categories_menu() {
  register_nav_menu('categories-menu',__( 'Categories Menu' ));
}
add_action( 'init', 'register_categories_menu' );

// Menu output mods
class puntozero_Bootstrap_walker extends Walker_Nav_Menu {

    function start_el(&$output, $object, $depth = 0, $args = Array(), $current_object_id = 0) {

        global $wp_query;
        $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

        $dropdown = $args->has_children && $depth == 0;

        $class_names = $value = '';

        // If the item has children, add the dropdown class for bootstrap
        if ( $dropdown ) {
            $class_names = "dropdown ";
        }

        $classes = empty( $object->classes ) ? array() : (array) $object->classes;

        $class_names .= join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $object ) );
        $class_names = ' class="'. esc_attr( $class_names ) . '"';

        $output .= $indent . '<li id="menu-item-'. $object->ID . '"' . $value . $class_names .'>';

        if ( $dropdown ) {
            $attributes = ' href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"';
        } else {
            $attributes  = ! empty( $object->attr_title ) ? ' title="'  . esc_attr( $object->attr_title ) .'"' : '';
            $attributes .= ! empty( $object->target )     ? ' target="' . esc_attr( $object->target     ) .'"' : '';
            $attributes .= ! empty( $object->xfn )        ? ' rel="'    . esc_attr( $object->xfn        ) .'"' : '';
            $attributes .= ! empty( $object->url )        ? ' href="'   . esc_attr( $object->url        ) .'"' : '';
        }

        $item_output = $args->before;
        $item_output .= '<a'. $attributes .'>';
        $item_output .= $args->link_before .apply_filters( 'the_title', $object->title, $object->ID );
        $item_output .= $args->link_after;

        // if the item has children add the caret just before closing the anchor tag
        if ( $dropdown ) {
            $item_output .= ' <b class="caret"></b>';
        }
        $item_output .= '</a>';

        $item_output .= $args->after;

        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $object, $depth, $args );
    } // end start_el function

    function start_lvl(&$output, $depth = 0, $args = Array()) {
        $indent = str_repeat("\t", $depth);
        $output .= "\n$indent<ul class='dropdown-menu' role='menu'>\n";
    }

    function display_element( $element, &$children_elements, $max_depth, $depth=0, $args, &$output ){
        $id_field = $this->db_fields['id'];
        if ( is_object( $args[0] ) ) {
            $args[0]->has_children = ! empty( $children_elements[$element->$id_field] );
        }
        return parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );
    }
}

// Add Twitter Bootstrap's standard 'active' class name to the active nav link item
function puntozero_add_active_class($classes, $item) {
    if( in_array('current-menu-item', $classes) ) {
        $classes[] = "active";
    }

    return $classes;
}
add_filter('nav_menu_css_class', 'puntozero_add_active_class', 10, 2 );


// Return an alternate title, without prefix, for every type used in the get_the_archive_title().
function filter_get_the_archive_title( $title ) {
    if( is_category() ) {
        $title = single_cat_title( '', false );
    }
    return $title;
};
add_filter( 'get_the_archive_title', 'filter_get_the_archive_title', 10, 1 );


function the_category_unlinked($separator = ' ') {
    $categories = (array) get_the_category();
    $thelist = 'test ';
    foreach($categories as $category) {    // concate
        $thelist .= $separator . $category->category_nicename;
        $thelist .= $separator . get_category_parents($category, false, ' ', true);
    }
    return $thelist;
}

// display the main menu bootstrap-style
// this menu is limited to 2 levels (that's a bootstrap limitation)
function puntozero_display_main_menu() {
    wp_nav_menu(
        array(
            'theme_location' => 'main_nav', /* where in the theme it's assigned */
            'menu' => 'main_nav', /* menu name */
            'menu_class' => 'nav navbar-nav',
            'container' => false, /* container class */
            'depth' => 2,
            'walker' => new puntozero_Bootstrap_walker(),
        )
    );
}

/*
  A function used in multiple places to generate the metadata of a post.
*/
function puntozero_display_post_meta() {
?>

    <ul class="meta text-muted list-inline">
        <li>
            <a href="<?php the_permalink() ?>">
                <span class="glyphicon glyphicon-time"></span>
                <?php the_date(); ?>
            </a>
        </li>
        <li>
            <a href="<?php echo get_author_posts_url(get_the_author_meta('ID'));?>">
                <span class="glyphicon glyphicon-user"></span>
                <?php the_author(); ?>
            </a>
        </li>
        <?php if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) : ?>
        <li>
            <?php
                $sp = '<span class="glyphicon glyphicon-comment"></span> ';
                comments_popup_link($sp . __( 'Leave a comment', "puntozero"), $sp . __( '1 Comment', "puntozero"), $sp . __( '% Comments', "puntozero"));
            ?>
        </li>
        <?php endif; ?>
        <?php edit_post_link(__( 'Edit', "puntozero"), '<li><span class="glyphicon glyphicon-pencil"></span> ', '</li>'); ?>
    </ul>

<?php
}

function puntozero_page_navi() {
    global $wp_query;

    ?>

    <?php if (get_next_posts_link() || get_previous_posts_link()) { ?>
        <nav class="block">
            <ul class="pager pager-unspaced">
                <li class="previous"><?php next_posts_link("&laquo; " . __('Older posts', "puntozero")); ?></li>
                <li class="next"><?php previous_posts_link(__('Newer posts', "puntozero") . " &rsquo;"); ?></li>
            </ul>
        </nav>
    <?php } ?>

    <?php
}

function puntozero_display_post($multiple_on_page) { ?>

    <?php if ($multiple_on_page) : ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class("block post-item col-md-4 ".the_category_unlinked(' ')); ?> role="article">
        <div class="post-date img-rounded">
            <div class="post-day">
                <?php echo get_the_date('j'); ?>
            </div>
            <div class="post-month-year">
                <?php echo get_the_date('M Y'); ?>
            </div>
        </div>
        <?php if (has_post_thumbnail()) { ?>
        <div class="featured-image">
            <a href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>">
                <?php $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'puntozero_blog_thumb' ); ?>
                <img src="<?php echo $thumbnail['0']; ?>" class="img-responsive" alt="<?php the_title_attribute(); ?>" />
            </a>
        </div>
        <?php } ?>
        <header>
            <div class="article-header">
                <h2 class="h1"><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
            </div>
        </header>
        <section class="post_content">
            <?php
                echo substr(get_the_excerpt(), 0, 100);
            ?>
            <a href="<?php the_permalink() ?>" class="pull-right text-uppercase" title="<?php the_title_attribute(); ?>">
                <?php echo __('Read more', 'puntozero') ?>
            </a>
        </section>
    </article>
    <?php else: ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class("block"); ?> role="article">
        <header>
            <?php if (has_post_thumbnail()) { ?>
                <div class="featured-image">
                    <?php $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'puntozero_featured' ); ?>
                    <img src="<?php echo $thumbnail['0']; ?>" class="img-responsive" alt="<?php the_title_attribute(); ?>" />
                </div>
            <?php } ?>
            <div class="article-header">
                <p class="post-date">
                    <?php echo get_the_date('j F Y'); ?>
                </p>
                <h1><?php the_title(); ?></h1>
            </div>
        </header>
        <section class="post_content">
            <?php
                the_content();
                wp_link_pages();
            ?>
        </section>
        <footer>
            <?php the_tags('<p class="tags">', ' ', '</p>'); ?>
        </footer>
    </article>
<?php endif; ?>
<?php }

function puntozero_main_classes() {
    $nbr_sidebars = (is_active_sidebar('sidebar-left') ? 1 : 0) + (is_active_sidebar('sidebar-right') ? 1 : 0);
    $classes = "";
    if ($nbr_sidebars == 0) {
        $classes .= "col-sm-12";
    } else if ($nbr_sidebars == 1) {
        $classes .= "col-md-8";
    } else {
        $classes .= "col-md-6";
    }
    if (is_active_sidebar( 'sidebar-left' )) {
        $classes .= " col-md-push-".($nbr_sidebars == 2 ? 3 : 4);
    }
    echo $classes;
}

function puntozero_sidebar_left_classes() {
    $nbr_sidebars = (is_active_sidebar('sidebar-left') ? 1 : 0) + (is_active_sidebar('sidebar-right') ? 1 : 0);
    echo 'col-md-'.($nbr_sidebars == 2 ? 3 : 4).' col-md-pull-'.($nbr_sidebars == 2 ? 6 : 8);
}

function puntozero_sidebar_right_classes() {
    $nbr_sidebars = (is_active_sidebar('sidebar-left') ? 1 : 0) + (is_active_sidebar('sidebar-right') ? 1 : 0);
    echo 'col-md-'.($nbr_sidebars == 2 ? 3 : 4);
}
