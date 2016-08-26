<?php
require '../../../../wp-blog-header.php';
if(!defined('ABSPATH'))die('');
if(!is_user_logged_in())die('');
if(!current_user_can('manage_options'))die('');
?>
<html>
<head>
    <title><?php esc_html_e( 'Preview Imapper', 'wordpress_image_mapper' ) ?></title>
    <style type="text/css">
    html,body{
        color:black !important;
        background-color:white !important;
    }
    </style>
    <?php wp_head();?>
</head>
    <body>
    <h4 style="text-align: center;margin-top:20px;margin-bottom:10px"><?php esc_html_e( 'This is preview of last saved Image Mapper, please save changes to view it.', 'wordpress_image_mapper' ) ?></h4>
    <?php 
    if ( isset( $_GET['my_id'] ) ) {
        echo do_shortcode('[image_mapper id="'.$_GET['my_id'].'"]');
    }
    ?>
    </body>

</html>
<?php
