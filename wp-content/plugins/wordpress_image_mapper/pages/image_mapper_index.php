<?php 
/*
 * iMapper main admin menu page, also list of all created shortcodes
 * 
 * Admin menu page: Image Mapper
 */
?>
<div class="wrap imapper-admin-wrapper">
	<h2 class="imapper-backend-header"><?php esc_html_e( 'WordPress Image Mapper', 'wordpress_image_mapper' ); ?>
			<a href="<?php echo admin_url( "admin.php?page=imagemapper_edit" ); ?>" class="add-new-h2"><?php esc_html_e( 'Add New', 'wordpress_image_mapper' ); ?></a>
	</h2>
<?php

?>


<table class="wp-list-table widefat fixed">
	<thead>
		<tr>
			<th width="5%"><?php esc_html_e( 'ID', 'wordpress_image_mapper' ); ?></th>
			<th width="35%"><?php esc_html_e( 'Add', 'Name' ); ?></th>
			<th width="40%"><?php esc_html_e( 'Shortcode', 'wordpress_image_mapper' ); ?></th>
			<th width="35%"><?php esc_html_e( 'Actions', 'wordpress_image_mapper' ); ?></th>					
		</tr>
	</thead>
	
	<tfoot>
		<tr>
			<th><?php esc_html_e( 'ID', 'wordpress_image_mapper' ); ?></th>
			<th><?php esc_html_e( 'Name', 'wordpress_image_mapper' ); ?></th>
			<th><?php esc_html_e( 'Shortcode', 'wordpress_image_mapper' ); ?></th>
			<th><?php esc_html_e( 'Actions', 'wordpress_image_mapper' ); ?></th>					
		</tr>
	</tfoot>
	
	<tbody>
		<?php 
			global $wpdb;
			$prefix = $wpdb->prefix;

			if(array_key_exists('action', $_GET) && $_GET['action'] == 'delete') {
				$wpdb->query('DELETE FROM '. $prefix . 'image_mapper WHERE id = '.$_GET['id']);
			}
			$mappers = $wpdb->get_results("SELECT * FROM " . $prefix . "image_mapper ORDER BY id");
			if (count($mappers) == 0) {
				echo '<tr>'.
						 '<td colspan="100%">No instances of Image Mapper found.</td>'.
					 '</tr>';
			} else {
				$tname;
				foreach ($mappers as $mapper) {
					$mname = $mapper->name;
					if(!$mname) {
						$mname = 'Image Mapper #' . $mapper->id . ' (untitled)';
					}
					echo '<tr>'.
							'<td>' . $mapper->id . '</td>'.						
							'<td>' . '<a href="' . admin_url('admin.php?page=imagemapper_edit&id=' . $mapper->id) . '" title="Edit">'.$mname.'</a>' . '</td>'.
							'<td> [image_mapper id="' . $mapper->id . '"]</td>' .		
							'<td>' . '<a class="imapper-edit-button" href="' . admin_url('admin.php?page=imagemapper_edit&id=' . $mapper->id) . '" title="' . esc_html__( 'Edit this item', 'wordpress_image_mapper' ) . '">' . esc_html__( 'Edit', 'wordpress_image_mapper' ) . '</a> '.									  
								  '<a class="imapper-delete-button" href="' . admin_url('admin.php?page=imagemapper&action=delete&id='  . $mapper->id) . '" title="' . esc_html__( 'Delete this item', 'wordpress_image_mapper' ) . '" >' . esc_html__( 'Delete', 'wordpress_image_mapper' ) . '</a>'.
							'</td>'.														
						'</tr>';
				}
			}
		?>
		
	</tbody>		 
</table>
<div style="margin-top:20px;">

<h2 class="imapper-backend-header"><?php esc_html_e( 'Step by step instructions:', 'wordpress_image_mapper' ); ?></h2>
<ul class="imapper-backend-ul">
    <li><h3>1. <?php echo wp_kses_post( sprintf( __( 'Click the %s button', 'wordpress_image_mapper' ), '<span class="emphasize">"' . esc_html__( 'Add New', 'wordpress_image_mapper' ) . '"</span>' ) ); ?></h3></li>
	<li><h3>2. <?php echo wp_kses_post( sprintf( __( 'Name your mapper and click %s button to insert your image', 'wordpress_image_mapper' ), '<span class="emphasize">"' . esc_html__( 'Change', 'wordpress_image_mapper' ) . '"</span>' ) ); ?></h3></li>
	<li><h3>3. <?php echo wp_kses_post( sprintf( __( 'Click anywhere on the image to %s', 'wordpress_image_mapper' ), '<span class="emphasize">' . esc_html__( 'add a pin', 'wordpress_image_mapper' ) . '</span>' ) ); ?></h3></li>
	<li><h3>4. <?php echo wp_kses_post( sprintf( __( 'Added pins are shown %1$s and content of the pins can be edited %2$s', 'wordpress_image_mapper' ), '<span class="emphasize">' . esc_html__( 'directly on the image', 'wordpress_image_mapper' ) . '</span>', '<span class="emphasize">' . esc_html__( 'below the image', 'wordpress_image_mapper' ) . '</span>' ) ); ?></h3></li>
	<li><h3>5. <?php echo wp_kses_post( sprintf( __( '%s are located on the right sidebar', 'wordpress_image_mapper' ), '<span class="emphasize">' . esc_html__( 'Settings for pins', 'wordpress_image_mapper' ) . '</span>' ) ); ?></h3></li>
	<li><h3>6. <?php echo wp_kses_post( sprintf( __( 'Save and %s', 'wordpress_image_mapper' ), '<span class="emphasize">"' . esc_html__( 'publish', 'wordpress_image_mapper' ) . '"</span>' ) ); ?></h3></li>
	<li><h3>7. <?php esc_html_e( 'Enjoy', 'wordpress_image_mapper' ); ?></h3></li>
</ul>
</div>
</div>