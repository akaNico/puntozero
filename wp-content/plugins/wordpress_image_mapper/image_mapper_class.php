<?php

	class ImageMapperAdmin
	{
		var $main, $path, $name, $url;
        
        /*
         * Used in media uploader to set default pin size for sizes select field
         * 
         * @since 2.8
         * @access private
         * 
         * @param   string    $default_pin_size   Used in media uploader to set default pin size for sizes select field
         */
        private $default_pin_size = 'sh-imapper-smallest';
		
		function __construct($file)
		{
			$this->main = $file;
			$this->init();
			return $this;
		}
		
		function init() 
		{
			$this->path = dirname( __FILE__ );//file path to the iMapper's folder
			$this->name = basename( $this->path );//iMapper's folder name
			$this->url = plugins_url( "/{$this->name}/" );//url path to the iMapper's folder
			
			if(is_admin()) 
			{
				add_action('admin_menu', array(&$this, 'admin_menu')); //adds additional options to admin panel's menu
				//custom AJAX handlers
				add_action('wp_ajax_mapper_save', array(&$this, 'ajax_save'));  
				add_action('wp_ajax_mapper_preview', array(&$this, 'ajax_preview'));
				add_action('wp_ajax_mapper_frontend_get', array(&$this, 'ajax_frontend_get'));
				add_action('wp_ajax_nopriv_mapper_frontend_get', array(&$this, 'ajax_frontend_get'));
			}
			else
			{
				add_action('wp', array(&$this, 'frontend_includes'));//called after WP object is set up
				add_shortcode('image_mapper', array(&$this, 'shortcode') );//binds an image_mapper shortcode to a function
			}
            
            /* Global admin and public */
            add_action( 'init', array( $this, 'add_image_sizes' ) );
            add_filter( 'image_size_names_choose', array( $this, 'imapper_image_sizes' ) );
            // Load plugin textdomain
            add_action( 'init', array( $this, 'load_textdomain' ) );
            
            //run "activate" function when plugin is activated
            register_activation_hook( $this->main , array( $this, 'activate' ) );
            // Manage tables in Multisite
            if ( is_multisite() ) {
                add_action( 'wpmu_new_blog', array( $this, 'new_mu_blog_create_table' ) );
                add_filter( 'wpmu_drop_tables', array( $this, 'delete_imapper_mu_table' ) );
            }
            
		}

		/*
         * Creates iMapper database table when the plugin is initialized
         * 
         * @since 2.8
         * @param   boolean   $networkwide   If plugin network activated than value is TRUE
         * @global $wpdb
         */
		function activate( $networkwide = NULL ) {
			global $wpdb;
            
            if ( function_exists( 'is_multisite' ) && is_multisite() ) {
                
                //check if it is network activated if so run the activation function for each id
                if( $networkwide ) {

                   $old_blog =  $wpdb->blogid;

                   //Get all blogs
                   $all_sites = wp_get_sites();

                   foreach ( $all_sites as $site ) {

                       switch_to_blog( $site['blog_id'] );
                       $this->create_db_table();
                   }

                   switch_to_blog( $old_blog );
                   return;
                    
                }
                
            }
            
            $this->create_db_table();
	
		}	
        
        /*
         * Create plugin table on new blog creation in multisite if it does'n exists
         * @since 2.8
         */
        public function new_mu_blog_create_table( $blog_id ) {

            if ( is_plugin_active_for_network( 'wordpress_image_mapper/image_mapper.php' ) ) {
                switch_to_blog( $blog_id );
                $this->create_db_table();
                restore_current_blog();
            }
            
        }
        
        /*
         * Create table in database
         * 
         * @since 2.8
         * @global $wpdb
         */
        private function create_db_table() {
            
            global $wpdb;
            
            $table_name = $wpdb->prefix . 'image_mapper';
            
            if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {
				$image_mapper_sql = "CREATE TABLE IF NOT EXISTS " . $table_name . " 
							(
							  id mediumint(9) NOT NULL AUTO_INCREMENT,
							  name tinytext NOT NULL COLLATE utf8_general_ci,
							  settings text NOT NULL COLLATE utf8_general_ci,
							  items text NOT NULL COLLATE utf8_general_ci,
							  PRIMARY KEY (id)
							);";
		
				require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
				dbDelta($image_mapper_sql);			
			}
            
        }
        
        /**
        * Delete subscribe table when multisite blog is deleted
        *
        * @global $wpdb
        */
        public function delete_imapper_mu_table( $tables ) {
            global $wpdb;
            $tables[] = $wpdb->prefix . 'image_mapper';
            return $tables;
        }
		
		/*Adds iMapper menu pages for admin users*/
		function admin_menu() 
		{
			$mappermenu = add_menu_page( 'Image Mapper', 'Image Mapper', 'manage_options', 'imagemapper', array(&$this, 'admin_page'));
			$submenu = add_submenu_page( 'imagemapper', 'Image Mapper', 'Add New', 'manage_options', 'imagemapper_edit', array(&$this, 'admin_edit_page'));
			
			//add_action('load-'.$mappermenu, array(&$this, 'admin_menu_scripts')); 
			add_action('load-'.$submenu, array(&$this, 'admin_menu_scripts')); 
			add_action('load-'.$mappermenu, array(&$this, 'admin_menu_styles')); 
			add_action('load-'.$submenu, array(&$this, 'admin_menu_styles')); 

		}
        
        /*
         * Add new image sizes for media uploader and pins
         * @since 2.8
         */
        function add_image_sizes() {
            // Add other useful image sizes for use through Add Media modal
            add_image_size( 'sh-imapper-smallest', 100 );
        }
        
        /*
         * Register image sizes for use in Add Media modal
         * @since 2.8
         */
        function imapper_image_sizes( $sizes ) {
            
            return array_merge( $sizes, array(
                'sh-imapper-smallest' => esc_html__( 'Small iMapper pin', 'wordpress_image_mapper' )
            ) );
            
        }

		/*Enqueues admin scripts*/
		function admin_menu_scripts() 
		{
            
			wp_enqueue_script('post');
			wp_enqueue_script('farbtastic');
			wp_enqueue_script('thickbox');
			wp_enqueue_script('image-mapper-admin-js', $this->url . 'js/image_mapper_admin.js' );
            $data = array( 
                'default_pin_size' => $this->default_pin_size,
                'new_default_pins_all' => $this->add_new_default_pins( 'iconImage' ), // For replacing all pins from right Basic pin settings metabox
                'new_default_pins_single' => $this->add_new_default_pins( 'iconImage_1' ), // For replacing singe pin from active pin settings,
                // Strings for translation
                'delete_pin_string' => esc_html__( 'Delete pin', 'wordpress_image_mapper' ), 
                'duplicate_pin_string' => esc_html__( 'Duplicate pin', 'wordpress_image_mapper' ), 
                'modal_select_your_pin' => esc_html__( 'Select your pin', 'wordpress_image_mapper' ),
                'modal_default_pins' => esc_html__( 'Default iMapper pins', 'wordpress_image_mapper' ),
                'modal_import_pins' => esc_html__( 'Import Your own pin', 'wordpress_image_mapper' ),
                'modal_upload_pin' => esc_html__( 'Upload custom pin', 'wordpress_image_mapper' ),
                'modal_select_pin_size' => esc_html__( 'Please select pin size', 'wordpress_image_mapper' ),
                'modal_insert_custom_pin' => esc_html__( 'Insert custom pin', 'wordpress_image_mapper' ),
                'modal_close' => esc_html__( 'Close', 'wordpress_image_mapper' ),
                'close_all_pin_tabs' => esc_html__( 'Please Close All Pin Tabs to save your work !', 'wordpress_image_mapper' ),
                'save_imapper_first' => esc_html__( 'Save imapper to view changes !', 'wordpress_image_mapper' ),
                'preview_string' => esc_html__( 'Preview', 'wordpress_image_mapper' ),
                'map_pin_string' => esc_html__( 'Map pin', 'wordpress_image_mapper' ),
                'sliding_pin_string' => esc_html__( 'Sliding pin', 'wordpress_image_mapper' ),
                'shadow_pin_string' => esc_html__( 'Shadow pin', 'wordpress_image_mapper' ),
                'glowing_pin_string' => esc_html__( 'Glowing pin', 'wordpress_image_mapper' ),
                'icon_pin_string' => esc_html__( 'Pin with icon', 'wordpress_image_mapper' ),
                'area_pin_string' => esc_html__( 'Area Pin', 'wordpress_image_mapper' ),
                'tab_pin_string' => esc_html__( 'Tab pin', 'wordpress_image_mapper' ),
                'select_option_top' => esc_html__( 'Top', 'wordpress_image_mapper' ),
                'select_option_bottom' => esc_html__( 'Bottom', 'wordpress_image_mapper' ),
                'choose_pin_image' => esc_html__( 'Change pin', 'wordpress_image_mapper' ),
            );
            wp_localize_script( 'image-mapper-admin-js', 'image_mapper_admin_js_data', $data );
			
			wp_enqueue_media();
			wp_enqueue_script( 'custom-header' );
			
			wp_enqueue_script('jQuery-mousew', $this->url . 'js/frontend/jquery.mousewheel.min.js' );
			wp_enqueue_script('jQuery-customScroll-imapper', $this->url . 'js/frontend/jquery.mCustomScrollbar.min.js' );
			
			wp_enqueue_script('jquery-ui-core', array(), 1.0, true);
			wp_enqueue_script('jquery-ui-widget', array(), 1.0, true);
			wp_enqueue_script('jquery-ui-sortable', array(), 1.0, true);
			wp_enqueue_script('jquery-ui-slider', array(), 1.0, true);
			wp_enqueue_script('jquery-ui-draggable', array(), 1.0, true);
			wp_enqueue_script('jquery-ui-resizable', array(), 1.0, true);
			wp_enqueue_script('jquery-effects-core');
			wp_deregister_script('iris');
			wp_enqueue_script('iris-imapper', $this->url . 'js/iris.min.js', array(), 1.0, true);
			
			wp_enqueue_script('rollover-imapper', $this->url . 'js/frontend/rollover.js' );
		}
		
		function admin_menu_styles() 
		{
			wp_enqueue_style('farbtastic');	
			wp_enqueue_style('thickbox');
			wp_enqueue_style( 'image-mapper-admin-css', $this->url . 'css/image_mapper_admin.css' );
			wp_enqueue_style( 'image-mapper-thick-css', $this->url . 'css/thickbox.css' );
			wp_enqueue_style( 'image-mapper-css', $this->url . 'css/frontend/image_mapper.css' );
			wp_enqueue_style( 'customScroll-css', $this->url . 'css/frontend/jquery.mCustomScrollbar.css' );
			wp_enqueue_style('imapper-font-awesome-css', $this->url . 'font-awesome/css/font-awesome.min.css');
			wp_enqueue_style('icon-pin-css', $this->url . 'mapper_icons/style.css');
		}
		
        /*
         * Save iMapper via ajax from edit screen
         */
		function ajax_save() 
		{
			$id = false;
			$settings = '';
			$items = '';
		
			foreach( $_POST as $key => $value) 
			{
				if ($key != 'action') 
				{
					if ($key == 'image_mapper_id')
					{
						if ($value != '')
						{
							$id = (int)$value;
						}
					}
					else if ($key == 'image_mapper_title')
					{
						$name = stripslashes($value);
					}
					else if(strpos($key,'sort') === 0)
					{
						if (substr($key, 4, 1) != '-')
							$items .= $key . '::' . stripslashes($value) . '||';
					}
					else 
					{
						$settings .= $key . '::' . stripslashes($value) . '||';
					}
				}
			}
			if ($items != '') $items = substr($items,0,-2);
			if ($settings != '') $settings = substr($settings,0,-2);
			global $wpdb;
			$table_name = $wpdb->prefix . 'image_mapper';
			if($id) 
			{	
				$wpdb->update(
					$table_name,
					array(
						'name'=>$name,
						'settings'=>$settings,
						'items'=>$items),
					array( 'id' => $id ),
					array( 
						'%s',
						'%s',
						'%s'),
					array('%d')
				);
			}
			else 
			{
				$wpdb->insert(
					$table_name,
					array(
						'name'=>$name,
						'settings'=>$settings,
						'items'=>$items),	
					array(
						'%s',
						'%s',
						'%s')						
					
				);
				$id = $wpdb->insert_id;
			}
			
				
			echo $id;
			die();
		}
		
		function admin_page() 
		{
			include_once($this->path . '/pages/image_mapper_index.php');
		}
	
		function admin_edit_page() 
		{
			include_once($this->path . '/pages/image_mapper_edit.php');
		}
	
		function shortcode($atts) 
		{
			extract(shortcode_atts(array
			(
				'id' => ''
			), $atts));

			include($this->path . '/pages/image_mapper_frontend.php');
			$frontHtml = preg_replace('/\s+/', ' ',$frontHtml);

			return do_shortcode($frontHtml);
		}
		
		function frontend_includes() 
		{
			wp_enqueue_script('jquery');
			wp_enqueue_script('jquery-ui-core');
			wp_enqueue_script('jquery-effects-core');
			wp_enqueue_script('jQuery-image-mapper', $this->url . 'js/frontend/jquery.image_mapper.js' );
            $data = array( 
                'plugin_root_url' => plugin_dir_url( __FILE__ ) // Used in js to define url for some images
            );
            wp_localize_script( 'jQuery-image-mapper', 'image_mapper_frontend_js_data', $data );
            
			wp_enqueue_script('jQuery-mousew-imapper', $this->url . 'js/frontend/jquery.mousewheel.min.js' );
			wp_enqueue_script('jQuery-customScroll-imapper', $this->url . 'js/frontend/jquery.mCustomScrollbar.min.js' );
 			wp_enqueue_script('rollover-imapper', $this->url . 'js/frontend/rollover.js' );
			wp_enqueue_script('jquery-prettyPhoto-imapper', $this->url . 'js/frontend/jquery.prettyPhoto.js' );//promenjen prettyPhoto
			//wp_enqueue_script('imapper-pie', $this->url . 'js/PIE.js');//izbaceno par skripti
			
			wp_enqueue_style( 'image-mapper-css', $this->url . 'css/frontend/image_mapper.css' );
			wp_enqueue_style( 'customScroll-css-imapper', $this->url . 'css/frontend/jquery.mCustomScrollbar.css' );
			wp_enqueue_style( 'prettyPhoto-css-imapper', $this->url . 'css/frontend/prettyPhoto.css' );
			wp_enqueue_style('imapper-font-awesome-css', $this->url . 'font-awesome/css/font-awesome.min.css');
			wp_enqueue_style('icon-pin-css', $this->url . 'mapper_icons/style.css');
			
		}
        
        /*
         * Add new default pins beside the ones before version 2.8. Onlu filenames with small letters and - as separator allowed
         * 
         * @since 2.8
         * @param   string   $class   Pin css class to be added
         * 
         * return   string   Html as list of icons
         */
        public function add_new_default_pins( $class = '' ) {
            
            $dir = plugin_dir_path( __FILE__ ) . 'images/new_default_icons';
            $files = scandir( $dir );
            $icons = '';
            
            foreach ( $files as $file ) {
                
                if ( $file === '.' || $file === '..' ) {
                    continue;
                }
                
                $name = ucfirst( str_replace( '-', ' ', $file ) );
                
                $icons .= '<a class="' . esc_attr( $class ) . '" href="#"><div class="imapper-icon-wrap"><img src="' . esc_url( plugins_url( 'images/new_default_icons/' . $file, __FILE__ ) ) . '"></div><span>' . esc_html( $name ) . '</span></a>';
                
            }
            
            return $icons;
            
        }
        
        /*
         * Set up textdomain
         * 
         * @since  2.8
         */
        public function load_textdomain() {
            // Localization of plugin
            load_plugin_textdomain( 'wordpress_image_mapper', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
        }
	}
?>