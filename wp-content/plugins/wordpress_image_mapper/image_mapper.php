<?php   

/**
 * Plugin Name: Wordpress Image Mapper
 * Plugin URI: http://www.shindiristudio.com/imagemapper/
 * Description: Image Mapper for Wordpress
 * Author: Shindiri Studio
 * Version: 2.8.1
 * Author URI: http://www.shindiristudio.com/
 * 
 * Text Domain:       wordpress_image_mapper
 * Domain Path:       /languages
 */

function my_i_mapper_get_attachment_id($url, $ignore_path = false) {
	if (! $ignore_path) {
		
		$dir = wp_upload_dir ();
		
		$dir = trailingslashit ( $dir ['baseurl'] );
		
		if (false === strpos ( $url, $dir ))
			
			return false;
	}
	
	$file = basename ( $url );
	//echo $file;
	$query = array (
			
			'post_type' => 'attachment',
			
			'fields' => 'ids',
			
			'meta_query' => array (
					
					array (
							
                        'value' => $file,

                        'compare' => 'LIKE' 
					)
					 
			)
			 
	)
	;
	
	$query ['meta_query'] [0] ['key'] = '_wp_attached_file';
	
	$ids = get_posts ( $query );
	//print_r($ids);
	foreach ( $ids as $id ) {
        
        $attachment_img_src = wp_get_attachment_image_src ( $id, 'full' );
		
		$match = array_shift ( $attachment_img_src );
		
		if ($url == $match || ($ignore_path && strstr ( $match, $file )))
			
			return $id;
	}
}
if (!class_exists("ImageMapperAdmin")) 
{
	require_once dirname( __FILE__ ) . '/image_mapper_class.php';	
	$imagemapper = new ImageMapperAdmin (__FILE__);
}


?>