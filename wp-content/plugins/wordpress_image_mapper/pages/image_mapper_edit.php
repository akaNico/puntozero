<?php 
/*
 * Edit iMapper screen
 * 
 * All options set here are saved in db table "image_mapper" via ImageMapperAdmin/ajax_save function
 */
?>

<div class="wrap imapper-admin-wrapper">
	<?php 
    /*
     * Prepare icons for selection when in the right metabox choosen pin with icons
     */
	function sh_wmi_createIconList_12() {
        
        $iconList = require plugin_dir_path( __FILE__ ) . 'assets/font_awsome_icons.php';
        
        $iconDiv = '<div class="imapper-item-icon-list">';

        for ($i = 0; $i < count($iconList); $i++)
            if (($i + 1) % 10 != 0)
                $iconDiv .= '<a href="#"><i class="'.$iconList[$i].' fa"></i></a>';
            else
                $iconDiv .= '<a href="#"><i class="'.$iconList[$i].' fa"></i></a>';

        $iconDiv .= '</div>';

        return $iconDiv;
    }
	$title = '';

    /*
     * Set default init options for form fields
     */
	$settings = array
	(
		'item-back-color' => '#ffffff',
		'item-border-color' => '#ffffff',
		'item-my-tab-pin-color'=>'#000000',
		
		'item-font-size' => '12',
		'item-header-font-size' => '24',
		'item-font-type' => 'regular',
		'item-font-color' => '#545454',
		'item-width' => '270',
		'item-height' => '140',
		'item-border-radius' => '0',
		'item-open-style' => 'click',
		'dummy-imapper-item-pin-color' => '#0000ff',
		'item-design-style' => 'responsive',
		'pin-scaling-coef' => '0',
		'categories' => 'false',
		'show-all-category' => 'false',
		'all-category-text' => 'All',
		'lightbox-gallery' => 'false',
		'map-overlay' => 'false',
		'blur-effect' => 'false',
		'slide-animation' => 'false',
		'category-bckg-color' => '#CF6527',
		'category-bckg-active-color' => '#F2F2F2',
		'category-font-color' => '#F2F2F2',
		'category-font-active-color' => '#CF6527'
	);

    /*
     * Set settings
     * 
     * Check if new mapper screen is called or existing one with values is displayed (when $_GET['id'])
     * If no $_GET['id'] than set default settings
     */
	global $wpdb;
	if(isset($_GET['id'])) 
	{
		global $wpdb;
		$imagemapper = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'image_mapper WHERE id='.$_GET['id']);
		// echo '<pre>';print_r($imagemapper);echo '</pre>';
		$imagemapper = $imagemapper[0];//objekat sa mapper vrednostima iz baze
	}
	
    $pageName = esc_html__( 'Name your iMapper', 'wordpress_image_mapper' );
	
	
	if (isset($imagemapper))
	{
        /* Title field value */
		$title = $imagemapper->name;
        
        /* Parse settings if any saved */
		foreach(explode('||',$imagemapper->settings) as $val) //every general instance setting is changed with the saved option
		{

			$expl = explode('::',$val);
			
			$settings[$expl[0]] = $expl[1];
		}

		 // echo '<pre>';var_dump($settings);echo '</pre>';
	}
    
    /*
     * Start building all form fields
     */
	?>
	
	<input type="hidden" id="plugin-url" value="<?php echo $this->url; ?>" />
	
	<div class="form_result"></div>
	<form name="post_form"  method="post" id="post_form"><!-- items in this form should be saved -->
        <input type="hidden" name="image_mapper_id" id="image_mapper_id" value="<?php echo isset( $_GET['id'] ) ? esc_attr( $_GET['id'] ) : '' ; ?>" />
	
	<div id="poststuf">
<!-- ============== All metaboxes start ============== -->
		<div id="post-body" class="metabox-holder columns-2" style="margin-right:300px; padding:0;">
		
            <!-- ============== Central metaboxes start ============== -->
			<div id="post-body-content">
				
                <!-- ============== Enter title metabox ============== -->
				<div id="titlediv">
					<div id="titlewrap">
					<h2 class="imapper-backend-header"><?php echo $pageName; ?>
                        <a href="<?php echo admin_url( "admin.php?page=imagemapper" ); ?>" class="add-new-h2"><?php esc_html_e( 'Cancel', 'wordpress_image_mapper' ); ?></a>
                    </h2>
						<label class="hide-if-no-js" style="visibility:hidden" id="title-prompt-text" for="title"><?php esc_html_e( 'Enter title here', 'wordpress_image_mapper' ); ?></label>
						<input type="text" name="image_mapper_title" size="30" tabindex="1" value="<?php echo $title; ?>" id="title" autocomplete="off" />
					</div>
				</div>
				
				<div class="clear"></div>
                
                <!-- ============== Upload image to map ============== -->
                <?php 
                /*
                 * Added css class to check if map image is set
                 * @since 2.8
                 */
                $map_image_class = isset( $settings['map-image'] ) && !empty( $settings['map-image'] ) ? 'imapper-map-image-exists' : 'imapper-no-map-image';
                ?>
                <div class="map-wrapper <?php echo esc_attr( $map_image_class ); ?>">
				<h2 class="imapper-backend-header" style="padding:0 0 10px 0;"><?php esc_html_e( 'Map', 'wordpress_image_mapper' ); ?> <a href="#" id="map-change" class="imapper-change-map-image tsort-change add-new-h2"><?php esc_html_e( 'Change', 'wordpress_image_mapper' ); ?></a></h2>
					<div class="mapper-sort-image-wrapper">
                        <div class="imapper-no-map-image-notice">
                            <h2><?php esc_html_e( 'No Image Uploaded', 'wordpress_image_mapper' ); ?></h2>
                            <p><?php esc_html_e( 'Insert your new image and click on it to add pins', 'wordpress_image_mapper' ); ?></p>
                            <a href="#" class="imapper-change-map-image tsort-change add-new-h2"><?php esc_html_e( 'Add Your Image', 'wordpress_image_mapper' ); ?></a>
                        </div>
                        <div class="mapper-sort-image">
                            <img id="map-image" src="<?php echo (array_key_exists('map-image', $settings) && $settings['map-image'] != '') ? '' . $settings['map-image'] : ''; ?>" />
                            <input id="map-input" name="map-image" type="hidden" value="<?php echo isset( $settings['map-image'] ) ? $settings['map-image'] : ''; ?>" />
                            <a href="#" id="map-image-remove" class="tsort-remove"><?php esc_html_e( 'Remove', 'wordpress_image_mapper' ); ?></a>
                        </div>
                        <div style="clear:both;"></div>
					</div>
				</div>

				<div class="clear"></div>
                
                <!-- ============== Active pins area start ============== -->
				<div class="items">
					<h2 class="imapper-backend-header" style="padding:0 0 10px 0;"><?php esc_html_e( 'Active Pins', 'wordpress_image_mapper' ); ?></h2>
					<div class="clear"></div>
					<ul id="imapper-sortable-items" class="imapper-sortable">
					
					<?php 
					$itemsArray = array();
					if (isset($imagemapper) && $imagemapper->items != '') {
						$explode = explode('||',$imagemapper->items);//every option defined for individual items
						
							
						foreach ($explode as $it) {
							$ex2 = explode('::', $it);
							$key = substr($ex2[0],0,strpos($ex2[0],'-'));//izvlaci sort sa brojem
							$subkey = substr($ex2[0],strpos($ex2[0],'-')+1);//izvlaci ime opcije
							$itemsArray[$key][$subkey] = $ex2[1];//kreira array, gde je kljuc sort+broj, a sadrzaj imena i vrednosti polja. Category, link i ostalo se nalaze kao vrednosti ovog polja
						}
						 // echo '<pre>';print_r($itemsArray);echo '</pre>';
						$my_first_element='';
						foreach ($itemsArray as $key => $arr) {
							if(empty($my_first_element)){
								$my_first_element=$arr;
							}
							//ova petlja stampa iteme
							$num = substr($key,4);//izvlaci broj itema, tj. iz sortx, izvlaci x
					?>
						
						<li id="<?php echo $key; ?>" class="imapper-sortableItem">
                            <a href="#" class="imapper-duplicate-pin"><?php esc_html_e( 'Duplicate Pin', 'wordpress_image_mapper' ); ?></a>
							<div id="imapper-sort<?php echo $num; ?>-header" class="imapper-sort-header"><?php esc_html_e( 'Pin', 'wordpress_image_mapper' ); ?> <?php echo $num; ?> <small><i>- <span><?php echo $arr['imapper-item-title']; ?></span></i> </small><a href="#" class="imapper-delete add-new-h2"><?php esc_html_e( 'Delete Pin', 'wordpress_image_mapper' ); ?></a> &nbsp;</div><div class="dummy-adapter closed"></div>
						</li>
						
						<?php 	
						}
					} ?>
					
					</ul>
				</div>
				
                <?php 
                // Nisam siguran za sta ovo sluzi
                ?>
				<div id="style_preview"></div>
				
            <!-- ============== Active pins template used to create added pin options start ============== -->
                
                <?php 
                /*
                 * Some options appear in active pins only when selected in Basic Pin Settings right metabox
                 */
                ?>
                
				<div class="imapper_items_options"><!-- Opcije koje se prikazuju za sve iteme zajedno, njih korisnik vidi-->
					
					
					<ul id="imapper-sortable-dummy" class="imapper-sortable" style="visibility:hidden;">
                        
                        <!-- ============== Pin image and custom pin selector ============== -->
                        <li class="dummy-adapter-icon-wrapper">

                            <!-- ============== Pin tab color color picker for some pin version ============== -->
                            <div class="my_tab_tab_icon_color">
                            <?php esc_html_e( 'Choose Pin Tab Color', 'wordpress_image_mapper' ); ?>
                                <input type="text" style="background: none repeat scroll 0% 0% rgb(0, 0, 0);" value="#000000" class="color-picker-iris" name="item-my-tab-pin-new-color" id="item-back-color">
                                <div class="color-picker-iris-holder"></div>
                            </div>
                            <div class="my_pin_icon">
                                <img class="my_pin_new_icon_image"/>
                            </div>	
                            <input type="hidden" id="dummy-imapper-item-pin" name="dummy-imapper-item-pin" value=""/>
                            
                            <a class="my_choose_custom_pin"><?php esc_html_e( 'Change pin', 'wordpress_image_mapper' ); ?></a>
                            <a class="my_remove_custom_pin"><?php esc_html_e( 'Reset', 'wordpress_image_mapper' ); ?></a>
						</li>
                        
                        <!-- ============== Pin Title text input ============== -->
						<li>
							<label for="dummy-imapper-item-title"><?php esc_html_e( 'Pin Title', 'wordpress_image_mapper' ); ?></label> <br />
							<input  id="dummy-imapper-item-title" name="dummy-imapper-item-title" value="" type="text" />
						</li>
						<!-- <div class="clear"></div> -->
                        
                        <!-- ============== Pin Open Direction select ============== -->
						<li>
							<label for="dummy-imapper-item-open-position"><?php esc_html_e( 'Pin Open Direction', 'wordpress_image_mapper' ); ?></label><br />
							<div class="imapper-admin-select-wrapper">
									<span class="imapper-admin-select-span"><?php esc_html_e( 'Default', 'wordpress_image_mapper' ); ?><?php //echo ucfirst($settings['item-design-style']); ?></span>
							<select name="dummy-imapper-item-open-position" id="dummy-imapper-item-open-position">
								<option value="left"><?php esc_html_e( 'Left', 'wordpress_image_mapper' ); ?></option>
								<option value="right"><?php esc_html_e( 'Right', 'wordpress_image_mapper' ); ?></option>
								<option value="top"><?php esc_html_e( 'Top', 'wordpress_image_mapper' ); ?></option>
								<option value="bottom"><?php esc_html_e( 'Bottom', 'wordpress_image_mapper' ); ?></option>
							</select>
							</div>
						</li>
                        
                        <!-- ============== Pin click action select ============== -->
                        <li>
							<label for="dummy-imapper-item-click-action"><?php esc_html_e( 'Pin click action', 'wordpress_image_mapper' ); ?></label>
							<br />
							<div class="imapper-admin-select-wrapper">
									<span class="imapper-admin-select-span"><?php esc_html_e( 'Default', 'wordpress_image_mapper' ); ?><?php //echo ucfirst($settings['item-design-style']); ?></span>
							<select name="dummy-imapper-item-click-action" id="dummy-imapper-item-click-action">
								<option value="default"><?php esc_html_e( 'Default', 'wordpress_image_mapper' ); ?></option>
								<option value="none"><?php esc_html_e( 'None', 'wordpress_image_mapper' ); ?></option>
								<option value="link"><?php esc_html_e( 'Link', 'wordpress_image_mapper' ); ?></option>
								<option value="content"><?php esc_html_e( 'Content', 'wordpress_image_mapper' ); ?></option>
								<option value="contentBelow"><?php esc_html_e( 'Content below', 'wordpress_image_mapper' ); ?></option>
								<option value="lightboxImage"><?php esc_html_e( 'Lightbox image', 'wordpress_image_mapper' ); ?></option>
								<option value="lightboxIframe"><?php esc_html_e( 'Lightbox iframe', 'wordpress_image_mapper' ); ?></option>
							</select>
							</div>
						</li>
						<div class="clear"></div>

                        <!-- ============== Pin Content textbox ============== -->
						<li id="li-item-content">
							<label style="vertical-align: top;" for="dummy-imapper-item-content"><?php esc_html_e( 'Pin Content', 'wordpress_image_mapper' ); ?></label><br />
							<textarea rows="6" style="resize: none;" id="dummy-imapper-item-content" name="dummy-imapper-item-content" value="" type="text" ></textarea>
						</li>

                        <!-- ============== Pin link text input ============== -->
                        <li id="<?php echo isset( $key ) ? $key : ''; ?>-li-item-link">
							<label for="dummy-imapper-item-link"><?php esc_html_e( 'Pin link', 'wordpress_image_mapper' ); ?></label><br />
							<input id="dummy-imapper-item-link" name="dummy-imapper-item-link" value="" />
						</li>
                        
                        <!-- ============== Pin hover action select ============== -->
						<li>
						<label for="dummy-imapper-item-hover-action"><?php esc_html_e( 'Pin hover action', 'wordpress_image_mapper' ); ?></label><br />
						<div class="imapper-admin-select-wrapper">
									<span class="imapper-admin-select-span"><?php esc_html_e( 'Default', 'wordpress_image_mapper' ); ?><?php //echo ucfirst($settings['item-design-style']); ?></span>
									<select name="dummy-imapper-item-hover-action" id="dummy-imapper-item-hover-action">
										<option value="default"><?php esc_html_e( 'Default', 'wordpress_image_mapper' ); ?></option>
										<option value="none"><?php esc_html_e( 'None', 'wordpress_image_mapper' ); ?></option>
										<option value="content"><?php esc_html_e( 'Content', 'wordpress_image_mapper' ); ?></option>
									</select>
									</div>	
						</li>

                        <!-- ============== Pin category text input ============== -->
						<li id="dummy-li-item-category" style="width:60%;">
							<label for="dummy-imapper-item-category"><?php esc_html_e( 'Pin category', 'wordpress_image_mapper' ); ?></label><br />
							<input id="dummy-imapper-item-category" name="dummy-imapper-item-category" value="" type="text" />
						</li>
                        
                        <!-- ============== Multi content options for pin ============== -->
						<li id="dummy-li-item-multi-content">
                            <input type="button" id="item-content-button-new" value="<?php esc_attr_e( '+ Add new tab', 'wordpress_image_mapper' ); ?>"><input type="button" id="item-content-button-remove" value="<?php esc_attr_e( '- Remove last tab', 'wordpress_image_mapper' ); ?>"></li>
						<div class="clear"></div>
                        
                        <!-- ============== Icons for pin with icons to select ============== -->
						<li id="dummy-li-item-picture" style="position: relative;">
                            <label for="dummy-imapper-item-picture" style="display: inline-block; margin-top: -12px;"><?php esc_html_e( 'Item Pin Image', 'wordpress_image_mapper' ); ?></label><br />
                            <input id="dummy-imapper-item-picture" name="dummy-imapper-item-picture" value="fa-cloud-download" type="hidden">
                            <i id="dummy-imapper-pin-icon" class="fa icon-2x fa-cloud-download" style="width: 32px; height: 27px; border: 1px solid black; margin: 0 5px 0 0 !important;"></i>
                            <div class="icon-list-button">
                                <a class="arrow-down-admin-link" href="#">
                                    <div class="arrow-down-admin" style=""></div>
                                </a>
                                    
                            </div>
                            <?php 
                            // Icons for pin with icons
                            echo sh_wmi_createIconList_12(); 
                            ?>
						</li>
						
					

						

						

						
<?php
//$my_image_first_12=$settings['item-icon'];
/*if(!empty($my_first_element['imapper-item-new-pin'])){
	$my_image_first_12=$my_first_element['imapper-item-new-pin'];
	
} */

//if (array_key_exists('item-icon', $settings) && $settings['item-icon'] == $this->url . 'images/icons/6/area_pin.png') { ?>
						
                        <!-- ============== Area pin selected specific start ============== -->
                        
                        
						<li id="dummy-li-item-border-width">
							<label for="dummy-imapper-border-width"><?php esc_html_e( 'Border width', 'wordpress_image_mapper' ); ?></label><br />
							<input id="dummy-imapper-border-width" name="dummy-imapper-border-width" value="<?php if (isset($settings['dummy-imapper-border-width'])) echo $settings['dummy-imapper-border-width']; ?>" type="text" /> 
						</li>

						

						<li id="dummy-li-item-border-radius">
							<label for="dummy-imapper-border-radius"><?php esc_html_e( 'Border radius', 'wordpress_image_mapper' ); ?></label><br />
							<input id="dummy-imapper-border-radius" name="dummy-imapper-border-radius" value="<?php if (isset($settings['dummy-imapper-border-radius'])) echo $settings['dummy-imapper-border-radius']; ?>" type="text" /> 
						</li>

						<li id="dummy-li-item-border-color">
							<label for="dummy-imapper-border-color"><?php esc_html_e( 'Border color', 'wordpress_image_mapper' ); ?></label><br />
							<input class="color-picker-iris" id="dummy-imapper-border-color" name="dummy-imapper-border-color" value="<?php if (isset($settings['dummy-imapper-border-color'])) echo $settings['dummy-imapper-border-color']; ?>" type="text" style="background:#<?php if (isset($settings['dummy-imapper-border-color'])) echo $settings['dummy-imapper-border-color']; ?>;" /> 
							<div class="color-picker-iris-holder"></div>
						</li>

						<li id="dummy-li-item-area-width">
							<label for="dummy-imapper-area-width"><?php esc_html_e( 'Area pin width', 'wordpress_image_mapper' ); ?></label><br />
							<input id="dummy-imapper-area-width" name="dummy-imapper-area-width" value="<?php if (isset($settings['dummy-imapper-area-width'])) echo $settings['dummy-imapper-area-width']; else echo "100"; ?>" type="text" disabled /> 
						</li>

						<li id="dummy-li-item-area-height">
							<label for="dummy-imapper-area-height"><?php esc_html_e( 'Area pin height', 'wordpress_image_mapper' ); ?></label><br />
							<input id="dummy-imapper-area-height" name="dummy-imapper-area-height" value="<?php if (isset($settings['dummy-imapper-area-height'])) echo $settings['dummy-imapper-area-height']; else echo "100"; ?>" type="text"  disabled /> 
						</li>
						
						 <!-- ============== Area pin selected settings end ============== -->
                         
						<?php //} ?>

						
						
						
							<?php //if ((array_key_exists('item-icon', $settings) && $settings['item-icon'] == $this->url . 'images/icons/5/1.png') || (array_key_exists('item-icon', $settings) && $settings['item-icon'] == $this->url . 'images/icons/6/area_pin.png') || (array_key_exists('item-icon', $settings) && $settings['item-icon'] == $this->url . 'images/icons/7/icon_pin.png') ) { ?>
						
                        <!-- ============== Pin with icon settings ============== -->
                        <li id="dummy-li-item-pin-color">
							<?php /*<div style="float:left">*/ ?>
								<label for="dummy-imapper-item-pin-color"><?php esc_html_e( 'Pin Color', 'wordpress_image_mapper' ); ?></label>
								<br />
								<input id="dummy-imapper-item-pin-color" name="dummy-imapper-item-pin-color" class="color-picker-iris" value="<?php echo $settings['dummy-imapper-item-pin-color']; ?>" type="text" style="background:#<?php echo $settings['dummy-imapper-item-pin-color']; ?>;">
								<div class="color-picker-iris-holder"></div>
						</li>
						
						<?php //} ?>
						
					</ul>
					
					<?php 
                    /*
                     * On pageload (not when pin added but on save or refreash) create hidden settings group fields for each added pin
                     * 
                     * This is used to retreave all active pins from database
                     */
					$itemsArray = array();
					if (isset($imagemapper) && $imagemapper->items != '') {
						$explode = explode('||',$imagemapper->items);
						foreach ($explode as $it) {
							$ex2 = explode('::', $it);
							$key = substr($ex2[0],0,strpos($ex2[0],'-'));
							$subkey = substr($ex2[0],strpos($ex2[0],'-')+1);
							$itemsArray[$key][$subkey] = $ex2[1];
						}

					
						foreach ($itemsArray as $key => $arr) {
							$num = substr($key,4);
					?>
                <!-- ============== Create hidden settings group fields for each added pin start ============== -->
            
						<!-- opet se uzima num za svaki dodati pin -->
						<ul id="imapper-sortable-<?php echo $num; ?>" class="imapper-sortable-real" style="display:none;">
						<li>
							<input type="hidden" id="<?php echo $key; ?>-imapper-item-x" name="<?php echo $key; ?>-imapper-item-x" value="<?php echo $arr['imapper-item-x']; ?>" />
							<input type="hidden" id="<?php echo $key; ?>-imapper-item-y" name="<?php echo $key; ?>-imapper-item-y" value="<?php echo $arr['imapper-item-y']; ?>" />
                            <input type="hidden" id="<?php echo $key; ?>-imapper-item-x-normalized" name="<?php echo $key; ?>-imapper-item-x-normalized" class="imapper-item-x-normalized" value="<?php echo isset( $arr['imapper-item-x-normalized'] ) ? $arr['imapper-item-x-normalized'] : ''; ?>" />
                            <input type="hidden" id="<?php echo $key; ?>-imapper-item-y-normalized" name="<?php echo $key; ?>-imapper-item-y-normalized" class="imapper-item-y-normalized" value="<?php echo isset( $arr['imapper-item-y-normalized'] ) ? $arr['imapper-item-y-normalized'] : ''; ?>" />
						</li>
						<li id="<?php echo $key; ?>-li-item-new-pin-icon">
						<a class="my_choose_custom_pin"><?php esc_html_e( 'Change pin', 'wordpress_image_mapper' ); ?></a> <br />
						<div class="my_tab_tab_icon_color">
						<input type="text" style="background: none repeat scroll 0% 0% rgb(0, 0, 0);" value="<?php if(!empty($arr['item-my-tab-pin-new-color']))echo $arr['item-my-tab-pin-new-color']?>" class="color-picker-iris" name="<?php echo $key; ?>-item-my-tab-pin-new-color" id="<?php echo $key; ?>-item-my-tab-pin-new-color">
						</div>
						<div class="my_pin_icon">
							<img class="my_pin_new_icon_image" src="<?php if(!empty($arr['imapper-item-new-pin']))echo $arr['imapper-item-new-pin'];?>"/>
						</div>	
						<input type="hidden" id="<?php echo $key;?>-imapper-item-new-pin" name="<?php echo $key;?>-imapper-item-new-pin" value="<?php if(!empty($arr['imapper-item-new-pin']))echo $arr['imapper-item-new-pin'];?>"/>
						</li>
						<li>
						
						</li>
						<li>
							<label style="margin-left:5px;" for="<?php echo $key; ?>-imapper-item-title"><?php esc_html_e( 'Item Title', 'wordpress_image_mapper' ); ?></label>
							<input style="margin-left:5px;" id="<?php echo $key; ?>-imapper-item-title" name="<?php echo $key; ?>-imapper-item-title" value="<?php echo $arr['imapper-item-title']; ?>" type="text" />
						</li>
						<div class="clear"></div>

						<?php 
						$my_image_12=$settings['item-icon'];
						if(!empty($arr['imapper-item-new-pin'])){
							$my_image_12=$arr['imapper-item-new-pin'];}
						if (array_key_exists('item-icon', $settings) && $my_image_12 == $this->url . 'images/icons/6/area_pin.png') { ?>

						<li id="<?php echo $key; ?>-li-item-border-color">
							
							<input style="margin-left: 75px; width: 230px;" class="color-picker-iris" id="<?php echo $key; ?>-imapper-border-color" name="<?php echo $key; ?>-imapper-border-color" value="<?php echo $arr['imapper-border-color']; ?>" type="text" style="background:#<?php if (isset($arr['imapper-border-color'])) echo $arr['imapper-border-color']; ?>;" /> 
						</li>

						<li id="<?php echo $key; ?>-li-item-border-width">
						
							<input style="margin-left: 75px; width: 230px;" id="<?php echo $key; ?>-imapper-border-width" name="<?php echo $key; ?>-imapper-border-width" value="<?php if (isset($arr['imapper-border-width'])) echo $arr['imapper-border-width']; ?>" type="text" /> px
						</li>

						<li id="<?php echo $key; ?>-li-item-border-radius">
						
							<input style="margin-left: 75px; width: 230px;" id="<?php echo $key; ?>-imapper-border-radius" name="<?php echo $key; ?>-imapper-border-radius" value="<?php  if (isset($arr['imapper-border-radius'])) echo $arr['imapper-border-radius']; ?>" type="text" /> px
						</li>

						<li id="<?php echo $key; ?>-li-item-area-width">
							
							<input style="margin-left: 75px; width: 230px;" id="<?php echo $key; ?>-imapper-area-width" name="<?php echo $key; ?>-imapper-area-width" value="<?php if (isset($arr['imapper-area-width'])) echo $arr['imapper-area-width']; else echo "100"; ?>" type="text" /> px
							<input style="margin-left: 75px; width: 230px;" id="<?php echo $key; ?>-imapper-area-width-normalized" class="imapper-area-width-normalized" name="<?php echo $key; ?>-imapper-area-width-normalized" value="<?php if (isset($arr['imapper-area-width-normalized'])) echo $arr['imapper-area-width-normalized']; ?>" type="text" /> px
						</li>

						<li id="<?php echo $key; ?>-li-item-area-height">
						
							<input style="margin-left: 75px; width: 230px;" id="<?php echo $key; ?>-imapper-area-height" name="<?php echo $key; ?>-imapper-area-height" value="<?php if (isset($arr['imapper-area-height'])) echo $arr['imapper-area-height']; else echo "100"; ?>" type="text" /> px
							<input style="margin-left: 75px; width: 230px;" id="<?php echo $key; ?>-imapper-area-height-normalized" class="imapper-area-height-normalized" name="<?php echo $key; ?>-imapper-area-height-normalized" value="<?php if (isset($arr['imapper-area-height-normalized'])) echo $arr['imapper-area-height-normalized']; ?>" type="text" /> px
						</li>

						
						<?php } ?>

						<li id="<?php echo $key; ?>-li-item-category">
							<label for="<?php echo $key; ?>-imapper-item-category"><?php esc_html_e( 'Item category', 'wordpress_image_mapper' ); ?></label>
							<input style="margin-left: 75px; width: 230px;" id="<?php echo $key; ?>-imapper-item-category" name="<?php echo $key; ?>-imapper-item-category" value="<?php if (isset($arr['imapper-item-category'])) echo $arr['imapper-item-category']; ?>" type="text" />
						</li>

						<li id="<?php echo $key; ?>-li-item-link">
							<label for="<?php echo $key; ?>-imapper-item-link"><?php esc_html_e( 'Item link', 'wordpress_image_mapper' ); ?></label>
							<input style="margin-left: 75px; width: 230px;" id="<?php echo $key; ?>-imapper-item-link" name="<?php echo $key; ?>-imapper-item-link" value="<?php if (isset($arr['imapper-item-link'])) echo $arr['imapper-item-link']; ?>" type="text" />
						</li>

						<li>
							<label for="<?php echo $key; ?>-imapper-item-click-action"><?php esc_html_e( 'Item click action', 'wordpress_image_mapper' ); ?></label>
							<select style="margin-left: 20px; width: 230px;" name="<?php echo $key; ?>-imapper-item-click-action" id="<?php echo $key; ?>-imapper-item-click-action">
								<option value="default"  <?php echo (($arr['imapper-item-click-action'] == 'default') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Default', 'wordpress_image_mapper' ); ?></option>
								<option value="none"  <?php echo (($arr['imapper-item-click-action'] == 'none') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'None', 'wordpress_image_mapper' ); ?></option>
								<option value="link"  <?php echo (($arr['imapper-item-click-action'] == 'link') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Link', 'wordpress_image_mapper' ); ?></option>
								<option value="content"  <?php echo (($arr['imapper-item-click-action'] == 'content') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Content', 'wordpress_image_mapper' ); ?></option>
								<option value="contentBelow"  <?php echo (($arr['imapper-item-click-action'] == 'contentBelow') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Content below', 'wordpress_image_mapper' ); ?></option>
								<option value="lightboxImage"  <?php echo (($arr['imapper-item-click-action'] == 'lightboxImage') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Lightbox image', 'wordpress_image_mapper' ); ?></option>
								<option value="lightboxIframe"  <?php echo (($arr['imapper-item-click-action'] == 'lightboxIframe') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Lightbox iframe', 'wordpress_image_mapper' ); ?></option>
							</select>
						</li>

						<li>
							<label for="<?php echo $key; ?>-imapper-item-hover-action"><?php esc_html_e( 'Item hover action', 'wordpress_image_mapper' ); ?></label>
							<select style="margin-left: 20px; width: 230px;" name="<?php echo $key; ?>-imapper-item-hover-action" id="<?php echo $key; ?>-imapper-item-hover-action">
								<option value="default"  <?php echo (($arr['imapper-item-hover-action'] == 'default') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Default', 'wordpress_image_mapper' ); ?></option>
								<option value="none" <?php echo (($arr['imapper-item-hover-action'] == 'none') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'None', 'wordpress_image_mapper' ); ?></option>
								<option value="content" <?php echo (($arr['imapper-item-hover-action'] == 'content') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Content', 'wordpress_image_mapper' ); ?></option>
							</select>
						</li>

						<div class="clear"></div>
						<li>
							<label style="margin-left:5px;" for="<?php echo $key; ?>-imapper-item-open-position"><?php esc_html_e( 'Item Open Position', 'wordpress_image_mapper' ); ?></label>
							<select name="<?php echo $key; ?>-imapper-item-open-position" id="<?php echo $key; ?>-imapper-item-open-position">
								<option value="left" <?php echo (($arr['imapper-item-open-position'] == 'left') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Left', 'wordpress_image_mapper' ); ?></option>
								<option value="right" <?php echo (($arr['imapper-item-open-position'] == 'right') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Right', 'wordpress_image_mapper' ); ?></option>
								<option value="top" <?php echo (($arr['imapper-item-open-position'] == 'top') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Top', 'wordpress_image_mapper' ); ?></option>
								<option value="bottom" <?php echo (($arr['imapper-item-open-position'] == 'bottom') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Bottom', 'wordpress_image_mapper' ); ?></option>
							</select>
						</li>
						<li><?php echo $this->url . '/images/icons/5/1.png' ?></li>
					<?php if ($my_image_12 == $this->url . 'images/icons/5/1.png' || $my_image_12 == $this->url . 'images/icons/6/area_pin.png' || $my_image_12 == $this->url . 'images/icons/7/icon_pin.png' ) { ?>
						<li>
							<input id="<?php echo $key; ?>-imapper-item-pin-color" name="<?php echo $key; ?>-imapper-item-pin-color" class="imapper-item-pin-color" value="<?php echo ($arr['imapper-item-pin-color'] != '') ? $arr['imapper-item-pin-color'] : '#0000ff'; ?>" type="text" style="">
						</li>
					<?php } ?>
					<?php if ($my_image_12 == $this->url . 'images/icons/5/1.png' ) { ?>
						<?php 
					//$arr['imapper-item-picture']='icon-cloud-download';	
					$my_icon_12_12=$arr['imapper-item-picture'];
					if(!empty($my_icon_12_12)){
					if(strpos($my_icon_12_12,"icon")===0){
						$my_icon_12_12=str_replace('icon-','fa-',$my_icon_12_12);
						}
					}
						?>
						<li>
							<input id="<?php echo $key; ?>-imapper-item-picture" name="<?php echo $key; ?>-imapper-item-picture" class="imapper-item-picture" value="<?php echo ($arr['imapper-item-picture'] != '') ? $my_icon_12_12 : 'fa-cloud-download'; ?>" type="text">
						</li>
						
					<?php } ?>
						<div class="clear"></div>
						<li>
							<label style="margin-left:5px;" for="<?php echo $key; ?>-imapper-item-content"><?php esc_html_e( 'Item Content', 'wordpress_image_mapper' ); ?></label>
							<textarea style="margin-left:5px;" id="<?php echo $key; ?>-imapper-item-content" name="<?php echo $key; ?>-imapper-item-content" value='<?php echo $arr['imapper-item-content']; ?>' type="text"><?php echo $arr['imapper-item-content']; ?></textarea>
							
							<?php 
							$itemContent = array_keys($arr); 
							// echo '<pre>';print_r($itemContent);echo '</pre>';
							$itemContentIndexes = preg_grep('#imapper-item-content-#', $itemContent); 
							$count = 2;
							
							foreach ($itemContentIndexes as $i) {?>
								<textarea class="textarea-additional" style="margin-left:5px;" id="<?php echo $key; ?>-imapper-item-content-<?php echo $count; ?>" name="<?php echo $key; ?>-imapper-item-content-<?php echo $count; ?>" value='<?php echo $arr[$i]; ?>' type="text"><?php echo $arr[$i]; ?></textarea>
							<?php $count++;
							} ?>
						</li>
					</ul>
                        
                <!-- ============== Create hidden settings group fields for each added pin end ============== -->
						<?php 	
						}
					} ?>
					
				</div><!-- .imapper_items_options -->
                
            <!-- ============== Active pins template used to create added pin otpions end ============== -->
                
			</div>
			<!-- ============== Central metaboxes end ============== -->
            
			<?php
            /*
             * Return array of google fonts for form select input
             * 
             * used only in this file
             * 
             * @param  string   $json   Json with fonts for select options
             * 
             * @return  array   Array for foreach loop that print's <option> in form select field
             */
            function im_get_google_fonts($json = false) {
                
                /*
                 * Change this to true to use dynamic google fonts fetching
                 * Notice: may cause errors due to the multiple calls to google fonts api
                 */
                $dynamic_fonts_fetching = false;
                
                if ( $dynamic_fonts_fetching ) {
                
                    $current_date = getdate(date("U"));

                    // Stored in wp_options br0_admin_webfonts_date
                    $current_date = $current_date['weekday'] . $current_date['month'] . $current_date['mday'] . $current_date['year'];

                    // If option don't exist in database get our file from server

                    if (!get_option('br0_admin_webfonts')) {
                        $file_get = wp_remote_fopen("http://www.shindiristudio.com/responder/fonts.txt");
                        if (strlen($file_get) > 100) {
                            add_option('br0_admin_webfonts', $file_get);
                            add_option('br0_admin_webfonts_date', $current_date);
                        }
                    }

                    if (get_option('br0_admin_webfonts_date') != $current_date || get_option('br0_admin_webfonts_date') == '') {
                        $file_get = wp_remote_fopen("http://www.shindiristudio.com/responder/fonts.txt");
                        if (strlen($file_get) > 100) {
                            update_option('br0_admin_webfonts', wp_remote_fopen("http://www.shindiristudio.com/responder/fonts.txt"));
                            update_option('br0_admin_webfonts_date', $current_date);
                        }
                    }


                    $fontsjson = get_option('br0_admin_webfonts');
               
                } else {
                    
                    // Fetch fonts from file
                    $fontsjson = require plugin_dir_path( __FILE__ ) . 'assets/google_fonts.php';
                    
                }
                
                $decode = json_decode($fontsjson, true);
                $webfonts = array();
                $webfonts['default'] = 'Default' . '|' . 'def';
                foreach ($decode['items'] as $key => $value) {
                    $item_family = $decode['items'][$key]['family'];
                    $item_family_trunc = str_replace(' ', '+', $item_family);
                    $webfonts[$item_family_trunc] = $item_family . '|' . $item_family_trunc;
                }

                if ($json) {
                    return $fontsjson;
                }
                
                return $webfonts;
            }

            // get array of google fonts for form select input
            $googleFonts = im_get_google_fonts();
			?>
            
<!-- ============== Right metaboxes start ============== -->

			<div id="postbox-container-1" class="postbox-container">
				<div class="postbox">
					<h3 class='hndle imapper-backend-header' style="cursor:auto"><span><?php esc_html_e( 'Publish iMapper', 'wordpress_image_mapper' ); ?></span></h3>
					<div class="inside">
						<div id="save-progress" class="waiting ajax-saved" style="background-image: url(<?php echo esc_url( admin_url( 'images/wpspin_light.gif' ) ); ?>)" ></div>
						<input name="preview-timeline" id="preview-timeline" value="<?php esc_attr_e( 'Preview', 'wordpress_image_mapper' ); ?>" class="button button-highlighted add-new-h2" style="padding:3px 25px" type="submit" />
						<input name="save-timeline" id="save-timeline" value="<?php esc_attr_e( 'Save mapper', 'wordpress_image_mapper' ); ?>" class="alignright button button-primary add-new-h2" style="padding:3px 15px" type="submit" />
						<img id="save-loader" src="<?php echo $this->url; ?>images/ajax-loader.gif" class="alignright" />
						<br class="clear" />		
					</div>
				</div>
				
				<div id="side-sortables" class="meta-box-sortables ui-sortable">
					
                    <!-- ============== Basic Pin Settings start ============== -->
					<div id="bla1" class="postbox" >
						<div class="handlediv" title="Click to toggle"><br /></div>
						<h3 class='hndle imapper-backend-header'><span><?php esc_html_e( 'Basic Pin Settings', 'wordpress_image_mapper' ); ?></span></h3>
						<div class="inside">
							<table class="fields-group misc-pub-section">	

                                <tr class="field-row">
                                    <td colspan="2">
                                        <label for="item-icon"><?php esc_html_e( 'Pin Icon', 'wordpress_image_mapper' ); ?></label>
                                    </td>
                                </tr>
                            </table>
                            
							<div class="side-icon-wrapper">
                                <div>
                                    <div id="icon-wrapper" style="position: relative; " >
                                        <img id="item-icon" style="clear:both; max-width:130px; max-height: 70px; border: 1px solid rgb(223, 223, 223);" src="<?php if (array_key_exists('item-icon', $settings) && strpos($settings['item-icon'], 'images/icons/5') !== FALSE) echo $this->url . 'images/icons/5/purple.png'; else if (!array_key_exists('item-icon', $settings)) echo $this->url . 'images/icons/4/1.png'; else if (array_key_exists('item-icon', $settings) && $settings['item-icon'] != '') echo $settings['item-icon']; ?>" />
                                        <input type="hidden" data-id="" style="margin-left: 5px; float: left;" id="item-icon-input" name="item-icon" value="<?php echo (array_key_exists('item-icon', $settings) && $settings['item-icon'] != '') ? $settings['item-icon'] : $this->url . 'images/icons/4/1.png'; ?>"/>
                                    </div>

                                    <a href="#" id="icon-change" tyle="width:100%;" class="tsort-change add-new-h2" ><?php esc_html_e( 'Change Pin', 'wordpress_image_mapper' ); ?></a>
                                </div>
							</div>		
							<?php 
							/**
							* Tab pin color color picler in "Basic pin settings" right metabox, only for Pin icon and Glowing pin
                            * For these pins you can add new tabs in active pin settings
                            * 
                            * Background color added via javascript
							*/
							$my_displ_option_12_12='none';
                            if( ( isset( $settings['item-icon'] ) && $settings['item-icon'] == $this->url . 'images/icons/7/icon_pin.png' )
                                ||  ( isset( $settings['item-icon'] ) && $settings['item-icon'] == $this->url . 'images/icons/1/1.png' )
                            ) { $my_displ_option_12_12='block'; }

							?>
                            <table class="fields-group misc-pub-section">	
                                <tr class="field-row" id="my_tab_pin_color" style="display:<?php echo $my_displ_option_12_12;?>">
                                    <td>
                                        <label for="item-back-color" ><?php esc_html_e( 'Tab Pin Color', 'wordpress_image_mapper' ); ?></label>
                                    <br/>
                                        <input id="item-back-color" name="item-my-tab-pin-color" class="color-picker-iris"  value="<?php echo $settings['item-my-tab-pin-color']; ?>" type="text" />	
                                        <div class="color-picker-iris-holder" style="margin-left: -125px;"></div>
                                    </td>
                                </tr>
                                <tr class="field-row">
                                    <td>
                                        <label for="item-back-color" ><?php esc_html_e( 'Background Color', 'wordpress_image_mapper' ); ?></label>
                                    <br />
                                        <input id="item-back-color" name="item-back-color" class="color-picker-iris"  value="<?php echo $settings['item-back-color']; ?>" type="text" style="background:#<?php echo $settings['item-back-color']; ?>;">	
                                        <div class="color-picker-iris-holder" style="margin-left: -125px;"></div>
                                    </td>			
                                    <td>
                                        <label for="item-border-color" ><?php esc_html_e( 'Border Color', 'wordpress_image_mapper' ); ?></label>
                                    <br />
                                        <input id="item-border-color" name="item-border-color" class="color-picker-iris" value="<?php echo $settings['item-border-color']; ?>" type="text" style="background:#<?php echo $settings['item-border-color']; ?>;">	
                                        <div class="color-picker-iris-holder" style="margin-left: -125px;"></div>
                                    </td>	
                                </tr>





                                <tr class="field-row">
                                    <td colspan="2">
                                        <label for="item-width" ><?php esc_html_e( 'Content Width', 'wordpress_image_mapper' ); ?></label>
                                    <br />
                                        <input id="item-width" name="item-width" value="<?php echo $settings['item-width']; ?>" size="5" type="text">
                                        <div class="imapper-admin-slider"></div>
                                    </td>
                                </tr>

                                <tr class="field-row">
                                    <td colspan="2">
                                        <label for="item-height" ><?php esc_html_e( 'Content Height', 'wordpress_image_mapper' ); ?></label>
                                    <br />
                                        <input id="item-height" name="item-height" value="<?php echo $settings['item-height']; ?>" size="5" type="text">
                                        <div class="imapper-admin-slider"></div>
                                    </td>
                                </tr>

                                <tr class="field-row">
                                    <td colspan="2">
                                        <label for="item-border-radius" ><?php esc_html_e( 'Content Border Radius', 'wordpress_image_mapper' ); ?></label>
                                    <br />
                                        <input id="item-border-radius" name="item-border-radius"  value="<?php echo $settings['item-border-radius']; ?>" type="text" size="5">														<div class="imapper-admin-slider"></div>

                                    </td>			
                                </tr>

                                <tr class="field-row">
                                    <td colspan="2">
                                        <label for="item-open-style" ><?php esc_html_e( 'Item Open Style', 'wordpress_image_mapper' ); ?></label>
                                    <br />
                                    <div class="imapper-admin-select-wrapper">
                                    <span class="imapper-admin-select-span"><?php echo ucfirst($settings['item-open-style']); ?></span>
                                        <select id="item-open-style" name="item-open-style">
                                            <option value="click" <?php echo (($settings['item-open-style'] == 'click') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Click', 'wordpress_image_mapper' ); ?></option>
                                            <option value="hover" <?php echo (($settings['item-open-style'] == 'hover') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Hover', 'wordpress_image_mapper' ); ?></option>
                                        </select>
                                        </div>
                                    </td>
                                </tr>
		
							</table>
						</div>
					</div><!-- /GENERAL OPTIONS -->
                    <!-- ============== Basic Pin Settings start ============== -->

                    <!-- ============== Font settings start ============== -->
					<div id="bla2" class="postbox" >
						<div class="handlediv" title="Click to toggle"><br /></div>
						<h3 class='hndle imapper-backend-header'><span><?php esc_html_e( 'Font Settings', 'wordpress_image_mapper' ); ?></span></h3>
						<div class="inside">
							<table class="fields-group misc-pub-section">		

							<tr class="field-row">
								<td>
									<label for="item-font-type" ><?php esc_html_e( 'Font', 'wordpress_image_mapper' ); ?> </label>
								<br />
								<div class="imapper-admin-select-wrapper">
                                    <span class="imapper-admin-select-span"><?php echo urldecode($settings['item-font-type']) === 'def' ? esc_html__( 'Default', 'wordpress_image_mapper' ) : urldecode($settings['item-font-type']); ?></span>
									<select id="item-font-type" name="item-font-type">
										<?php
											foreach ($googleFonts as $font)
											{	
												$f = explode("|", $font);
												echo '<option style="width: 100%;" value="' . $f[1] . '" ' . (($settings['item-font-type'] == $f[1]) ? 'selected="selected"' : '') . '>' . $f[0] . '</option>';
											}
										?>
									</select>
									</div>
								</td>	

								<tr class="field-row">
								<td>
									<label for="item-header-font-size" ><?php esc_html_e( 'Title Font Size', 'wordpress_image_mapper' ); ?></label>
								<br />
									<input id="item-header-font-size" name="item-header-font-size" value="<?php echo $settings['item-header-font-size']; ?>" size="5" type="text">
									<div class="imapper-admin-slider"></div>
								</td>
							</tr>


							</tr>



															<tr class="field-row">
								<td>
									<label for="item-font-size" ><?php esc_html_e( 'Text Font Size', 'wordpress_image_mapper' ); ?></label>
								<br />
									<input id="item-font-size" name="item-font-size" value="<?php echo $settings['item-font-size']; ?>" size="5" type="text">
									
									<div class="imapper-admin-slider"></div>
									
								</td>
							</tr>
							
							
							
							
							
							<tr class="field-row">
								<td>
									<label for="item-font-color" ><?php esc_html_e( 'Font Color', 'wordpress_image_mapper' ); ?></label>
								<br />
									<input id="item-font-color" name="item-font-color" class="color-picker-iris" value="<?php echo $settings['item-font-color']; ?>" type="text" style="background:#<?php echo $settings['item-font-color']; ?>;">	
									<div class="color-picker-iris-holder" style="margin-left: -125px;"></div>
								</td>			
							</tr>
							
							
							</table>
						</div>
					</div><!-- /GENERAL OPTIONS -->
                    <!-- ============== Font settings end ============== -->

                    <!-- ============== Image settings start ============== -->
					<div id="bla3" class="postbox" >
						<div class="handlediv" title="Click to toggle"><br /></div>
						<h3 class='hndle imapper-backend-header'><span><?php esc_html_e( 'Image Settings', 'wordpress_image_mapper' ); ?></span></h3>
						<div class="inside">
							<table class="fields-group misc-pub-section">		

								
								<tr class="field-row">
								
									
								
								<td>
								<label for="map-overlay" ><?php esc_html_e( 'Image Overlay', 'wordpress_image_mapper' ); ?></label><br />
								<br />
									<span class="imapper-checkbox-on imapper-checkbox-span <?php echo (($settings['map-overlay'] != 'true') ? 'inactive' : '' );?>"><?php esc_html_e( 'On', 'wordpress_image_mapper' ); ?></span>
									<span class="imapper-checkbox-off imapper-checkbox-span <?php echo (($settings['map-overlay'] == 'true') ? 'inactive' : '' );?>"><?php esc_html_e( 'Off', 'wordpress_image_mapper' ); ?></span>
									<input type='hidden' value='false' name='map-overlay' id="hidden-map-overlay">
									<input type="checkbox" id="map-overlay" name="map-overlay" value="true" <?php echo (($settings['map-overlay'] == 'true') ? 'checked' : '' ); ?>>
								</td>
							

							
								
									
								
								<td>
								<label for="blur-effect" ><?php esc_html_e( 'Blur effect', 'wordpress_image_mapper' ); ?></label><br /><br />
									<span class="imapper-checkbox-on imapper-checkbox-span <?php echo (($settings['blur-effect'] != 'true') ? 'inactive' : '' );?>"><?php esc_html_e( 'On', 'wordpress_image_mapper' ); ?></span>
									<span class="imapper-checkbox-off imapper-checkbox-span <?php echo (($settings['blur-effect'] == 'true') ? 'inactive' : '' );?>"><?php esc_html_e( 'Off', 'wordpress_image_mapper' ); ?></span>
									<input type='hidden' value='false' name='blur-effect' id="hidden-blur-effect">
									<input type="checkbox" id="blur-effect" name="blur-effect" value="true" <?php echo (($settings['blur-effect'] == 'true') ? 'checked' : '' ); ?>>
								</td>
							</tr>

							<tr class="field-row">
								<td>
									<label for="slide-animation" ><?php esc_html_e( 'Pin Slide Effect', 'wordpress_image_mapper' ); ?></label><br /><br />
									<span class="imapper-checkbox-on imapper-checkbox-span <?php echo (($settings['slide-animation'] != 'true') ? 'inactive' : '' );?>"><?php esc_html_e( 'On', 'wordpress_image_mapper' ); ?></span>
									<span class="imapper-checkbox-off imapper-checkbox-span <?php echo (($settings['slide-animation'] == 'true') ? 'inactive' : '' );?>"><?php esc_html_e( 'Off', 'wordpress_image_mapper' ); ?></span>
									<input type='hidden' value='false' name='slide-animation' id="hidden-slide-animation">
									<input type="checkbox" id="slide-animation" name="slide-animation" value="true" <?php echo (($settings['slide-animation'] == 'true') ? 'checked' : '' ); ?>>
								</td>
							


								
								<td>
									<label for="lightbox-gallery" ><?php esc_html_e( 'Lightbox Gallery', 'wordpress_image_mapper' ); ?></label><br /><br />
									<span class="imapper-checkbox-on imapper-checkbox-span <?php echo (($settings['lightbox-gallery'] != 'true') ? 'inactive' : '' );?>"><?php esc_html_e( 'On', 'wordpress_image_mapper' ); ?></span>
									<span class="imapper-checkbox-off imapper-checkbox-span <?php echo (($settings['lightbox-gallery'] == 'true') ? 'inactive' : '' );?>"><?php esc_html_e( 'Off', 'wordpress_image_mapper' ); ?></span>
									<input type='hidden' value='false' name='lightbox-gallery' id="hidden-lightbox-gallery">
									<input type="checkbox" id="lightbox-gallery" name="lightbox-gallery" value="true" <?php echo (($settings['lightbox-gallery'] == 'true') ? 'checked' : '' ); ?>>
								</td>
							</tr>

							
							</table>
						</div>
					</div><!-- /GENERAL OPTIONS -->
                    <!-- ============== Image settings end ============== -->

                    <!-- ============== Responsive settings start ============== -->
					<div id="bla4" class="postbox" >
						<div class="handlediv" title="Click to toggle"><br /></div>
						<h3 class='hndle imapper-backend-header'><span><?php esc_html_e( 'Responsive Settings', 'wordpress_image_mapper' ); ?></span></h3>
						<div class="inside">
							<table class="fields-group misc-pub-section">		

										<tr class="field-row">
								<td>
									<label for="item-design-style" ><?php esc_html_e( 'Design Style', 'wordpress_image_mapper' ); ?></label>
								<br />
									<div class="imapper-admin-select-wrapper">
									<span class="imapper-admin-select-span"><?php echo ucfirst($settings['item-design-style']); ?></span>
									<select id="item-design-style" name="item-design-style">
										<option value="fluid" <?php echo (($settings['item-design-style'] == 'fluid') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Fluid', 'wordpress_image_mapper' ); ?></option>
										<option value="responsive" <?php echo (($settings['item-design-style'] == 'responsive') ? 'selected="selected"' : '' ); ?>><?php esc_html_e( 'Responsive', 'wordpress_image_mapper' ); ?></option>
									</select>
									</div>
								</td>
							</tr>	
							
								
							<tr class="field-row">
								<td>
									<label for="pin-scaling-coef" ><?php esc_html_e( 'Pin Scale Coefficient', 'wordpress_image_mapper' ); ?></label>
								<br />
									<div class="imapper-admin-select-wrapper">
									<span class="imapper-admin-select-span"><?php echo $settings['pin-scaling-coef']; ?></span>
									<select id="pin-scaling-coef" name="pin-scaling-coef">
										<option value="0" <?php echo (($settings['pin-scaling-coef'] == '0') ? 'selected="selected"' : '' ); ?>>0</option>
										<option value="1" <?php echo (($settings['pin-scaling-coef'] == '1') ? 'selected="selected"' : '' ); ?>>1</option>
									</select>
									</div>
								</td>
							</tr>
							
							
							</table>
						</div>
					</div><!-- /GENERAL OPTIONS -->
                    <!-- ============== Responsive settings end ============== -->


					<!-- ============== Category settings start ============== -->
					<div id="bla5" class="postbox" >
						<div class="handlediv" title="Click to toggle"><br /></div>
						<h3 class='hndle imapper-backend-header'><span><?php esc_html_e( 'Category Settings', 'wordpress_image_mapper' ); ?></span></h3>
						<div class="inside">
							<table class="fields-group misc-pub-section">			
							
								
							<tr class="field-row">
								<td colspan="2">
									<label for="categories" ><?php esc_html_e( 'Enable categories', 'wordpress_image_mapper' ); ?></label>
								<br />
									<span class="imapper-checkbox-on imapper-checkbox-span <?php echo (($settings['categories'] != 'true') ? 'inactive' : '' );?>"><?php esc_html_e( 'On', 'wordpress_image_mapper' ); ?></span>
									<span class="imapper-checkbox-off imapper-checkbox-span <?php echo (($settings['categories'] == 'true') ? 'inactive' : '' );?>"><?php esc_html_e( 'Off', 'wordpress_image_mapper' ); ?></span>
									<input type='hidden' value='false' name='categories' id="hidden-categories">
									<input type="checkbox" id="categories" name="categories" value="true" <?php echo (($settings['categories'] == 'true') ? 'checked' : '' ); ?>>
								</td>
							</tr>

							<tr class="field-row">
								<td>
									<label for="category-bckg-color" ><?php esc_html_e( 'Link color', 'wordpress_image_mapper' ); ?></label>
								<br />
									<input id="category-bckg-color" name="category-bckg-color" class="color-picker-iris" value="<?php echo $settings['category-bckg-color']; ?>" type="text" style="background:#<?php echo $settings['category-bckg-color']; ?>;">	
									<div class="color-picker-iris-holder" style="margin-left: -125px;"></div>
								</td>			
							
								<td>
									<label for="category-bckg-active-color" ><?php esc_html_e( 'Active link color', 'wordpress_image_mapper' ); ?></label>
								<br />
									<input id="category-bckg-active-color" name="category-bckg-active-color" class="color-picker-iris" value="<?php echo $settings['category-bckg-active-color']; ?>" type="text" style="background:#<?php echo $settings['category-bckg-active-color']; ?>;">	
									<div class="color-picker-iris-holder" style="margin-left: -125px;"></div>
								</td>			
							</tr>

							<tr class="field-row">
								<td>
									<label for="category-font-color" ><?php esc_html_e( 'Font color', 'wordpress_image_mapper' ); ?></label>
								<br />
									<input id="category-font-color" name="category-font-color" class="color-picker-iris" value="<?php echo $settings['category-font-color']; ?>" type="text" style="background:#<?php echo $settings['category-font-color']; ?>;">	
									<div class="color-picker-iris-holder" style="margin-left: -125px;"></div>
								</td>			
							
								<td>
									<label for="category-font-active-color" ><?php esc_html_e( 'Active font color', 'wordpress_image_mapper' ); ?></label>
								<br />
									<input id="category-font-active-color" name="category-font-active-color" class="color-picker-iris" value="<?php echo $settings['category-font-active-color']; ?>" type="text" style="background:#<?php echo $settings['category-font-active-color']; ?>;">	
									<div class="color-picker-iris-holder" style="margin-left: -125px;"></div>
								</td>			
							</tr>

							<tr class="field-row">
								<td colspan="2" >
									<label for="show-all-category" ><?php esc_html_e( 'Enable All Categories Link', 'wordpress_image_mapper' ); ?></label>
								<br />
									<span class="imapper-checkbox-on imapper-checkbox-span <?php echo (($settings['show-all-category'] != 'true') ? 'inactive' : '' );?>"><?php esc_html_e( 'On', 'wordpress_image_mapper' ); ?></span>
									<span class="imapper-checkbox-off imapper-checkbox-span <?php echo (($settings['show-all-category'] == 'true') ? 'inactive' : '' );?>"><?php esc_html_e( 'Off', 'wordpress_image_mapper' ); ?></span>
									<input type='hidden' value='false' name='show-all-category' id="hidden-show-all-category">
									<input type="checkbox" id="show-all-category" name="show-all-category" value="true" <?php echo (($settings['show-all-category'] == 'true') ? 'checked' : '' ); ?>>
								</td>
							</tr>

							

							<tr class="field-row">
								<td colspan="2" >
									<label for="all-category-text" ><?php esc_html_e( 'All Categories text', 'wordpress_image_mapper' ); ?></label>
								<br />
									<input id="all-category-text" name="all-category-text"  value="<?php echo $settings['all-category-text']; ?>" type="text" size="5">	
								</td>
							</tr>
							
							
							</table>
						</div>
					</div><!-- /GENERAL OPTIONS -->
                    <!-- ============== Category settings end ============== -->


				</div>
			</div>
<!-- ============== Right metaboxes end ============== -->

		</div><!-- #post-body -->
        
<!-- ============== All metaboxes end ============== -->
	</div>
	
	</form>
	<?php /*
	<div class="my_upload_image_12" style="display:none">
	<div id="TB_overlay" class="TB_overlayBG"></div>
	<div id="TB_window" style="margin-left: -430px; width: 860px; height: 220px; margin-top: -200px; visibility: visible;">
	<div id="TB_title">
	<div id="TB_ajaxWindowTitle" style="padding:0px 10px;">Select your pin</div>
	<div id="TB_closeAjaxWindow">
	<a id="closeIconUpload" title="Close" href="#"><div class="tb-close-icon">
	</div></a>
	</div></div>
	</div>
	<a id="ourIconsContent" href="#" class="icon-upload-tab" style="margin-top: 7px;">Default iMapper Pins</a><a id="customIconsContent" href="#" class="icon-upload-tab" style="margin: 7px 0 0 220px;">Import your own pin</a><div class="clear"></div><div id="iconUploadContent" style="width:859px;height:150px;position:absolute;bottom:0px; border-top: 1px solid #DFDFDF;" name="TB_iframeContent427" hspace="0"></div><iframe id="TB_iframeContentIcon" frameborder="0" style="width:859px;height:412px;position:absolute;top:69px;border-top:1px solid #DFDFDF;padding-top:10px;display:none;" onload="" name="TB_iframeContent484" src="media-upload.php?type=image&" hspace="0"></iframe>
	</div>
	*/ ?>
</div>