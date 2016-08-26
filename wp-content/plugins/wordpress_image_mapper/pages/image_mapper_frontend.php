<?php
	//$my_preview_12_12=@$_GET['my_preview'];
	//echo 'Id'.$id;
	if($id) 
	{
		global $wpdb;
		$imagemapper = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'image_mapper WHERE id='.$id);
		$imagemapper = $imagemapper[0];
	}
    
    
    /*
     * Check if iMapper items (pins) set or prevent further errors
     * Parsed below on line 73
     */
    if ( !isset( $imagemapper->items ) || empty( $imagemapper->items ) ) {
        $frontHtml = '<p style="width: 100%; text-align: center;">' . esc_html__( 'Error, please add at least one pin in iMapper settings', 'wordpress_image_mapper' ) . '</p>';
        return;
    }
    
	$title = $imagemapper->name;
	foreach(explode('||',$imagemapper->settings) as $val) 
	{
		if (substr($val, strpos($val, '-')) != 'dummy')
		{
			$expl = explode('::',$val);
			$settings[$expl[0]] = $expl[1];
		}
	}

	$frontHtml = '';
	$my_prev_http_12='http://';
	if(is_ssl()){
		$my_prev_http_12='https://';
	}
	if (trim($settings['item-font-type']) != 'def') {
		$frontHtml .= '<link rel="stylesheet" type="text/css" href="'.$my_prev_http_12.'fonts.googleapis.com/css?family=' . $settings['item-font-type'] . '">';
	}

	$frontHtml.='<style type="text/css">
	.imapper' . $id . '-categories-wrapper .imapper-category-button  {
		color:'.$settings['category-font-color'].';
		background-color:'.$settings['category-bckg-color'].';
	}

	.imapper' . $id . '-categories-wrapper .imapper-category-arrow-bottom {
		border-color:'.$settings['category-bckg-color'].' transparent;
	}

	.imapper' . $id . '-categories-wrapper .imapper-category-active .imapper-category-arrow-bottom {
		border-color:'.$settings['category-bckg-active-color'].' transparent;
	}

	.imapper' . $id . '-categories-wrapper .imapper-category-active .imapper-category-button  {
		background-color:'.$settings['category-bckg-active-color'].';
		color:'.$settings['category-font-active-color'].';
	}
	</style>';
	$my_att_id_12=my_i_mapper_get_attachment_id($settings['map-image']);
	//$my_att_width=800;
	if(!empty($my_att_id_12)){
		$my_att_id_12_src=wp_get_attachment_image_src($my_att_id_12,'full');
		//print_r($my_att_id_12_src);
		$my_width_12=$my_att_id_12_src[1];
		$my_height_12=$my_att_id_12_src[2];
	}else {
		$my_width_12='';
		$my_height_12='';
	}
	$frontHtml .= '
	<div id="imagemapper' . $id . '-wrapper" class="imagemapper-wrapper" style="clear: both;">
		<img data-w="'.$my_width_12.'" data-h="'.$my_height_12.'" id="imapper' . $id . '-map-image" style="max-width: 100%;" src="' . ($settings['map-image'] != '' ? '' . $settings['map-image'] : $this->url . 'images/no_image.jpg') . '" />';

	$font = str_replace('+', ' ', $settings['item-font-type']);
	$explode = explode('||',$imagemapper->items);
	foreach ($explode as $it) 
	{
		$ex2 = explode('::', $it);
		$key = substr($ex2[0],0,strpos($ex2[0],'-'));
		$subkey = substr($ex2[0],strpos($ex2[0],'-')+1);
		$itemsArray[$key][$subkey] = $ex2[1];
	}

	// $frontHtml .= json_encode($itemsArray);
	// $frontHtml .= '
	// <div> '.json_encode($itemsArray).' </div>';
	//print_r($settings);
	foreach ($itemsArray as $key => $arr) 
	{
		$my_pin_icon_12=$settings['item-icon'];
		$my_has_12_new_icon=false;
		if(!empty($arr['imapper-item-new-pin'])){
			$my_has_12_new_icon=true;
			$my_pin_icon_12=$arr['imapper-item-new-pin'];
		}
		$num = substr($key,4);

		$itemContent = array_keys($arr); 
		$itemContentIndexes = preg_grep('#imapper-item-content-#', $itemContent); 
		$count = 2;

		$frontHtml .= '<div id="imapper' . $id . '-pin' . $num . '-wrapper" data-open-position="'.$arr['imapper-item-open-position'].'" data-left="' . ( (strpos($my_pin_icon_12, 'images/icons/6/') !== FALSE) ? $arr['imapper-item-x'] : $arr['imapper-item-x']) . '" data-top="' . ( (strpos($my_pin_icon_12, 'images/icons/6/') !== FALSE) ? $arr['imapper-item-y'] : $arr['imapper-item-y']) . '" data-pin-color="'.(isset($arr['imapper-item-pin-color']) ? $arr['imapper-item-pin-color'] : 'transparent').'" data-category="' .((isset($arr['imapper-item-category'])) ? $arr['imapper-item-category'] : '') . '" data-imapper-link="'.((isset($arr['imapper-item-link'])) ? $arr['imapper-item-link'] : '').'" '.((isset($arr['imapper-item-click-action']) && $arr['imapper-item-click-action']!='default') ? 'data-imapper-click-action="'.$arr['imapper-item-click-action'].'" '  : '').((isset($arr['imapper-item-hover-action']) && $arr['imapper-item-hover-action']!='default') ? 'data-imapper-hover-action="'.$arr['imapper-item-hover-action'].'" '  : '').' class="imapper' . $id . '-pin-wrapper imapper-pin-wrapper" style="position: absolute;" >';

		if (strpos($my_pin_icon_12, 'images/icons/6/') !== FALSE)
			$frontHtml .='<div id="imapper' . $id . '-pin' . $num . '" class="imapper' . $id . '-pin imapper-pin imapper-area-pin pin-style" style="width:'.(isset($arr['imapper-area-width-normalized']) ? $arr['imapper-area-width-normalized'] : '0').'px;height:'.(isset($arr['imapper-area-height-normalized']) ? $arr['imapper-area-height-normalized'] : '0').'px;border:'.( isset($arr['imapper-border-width']) ? $arr['imapper-border-width'] : '0').'px solid '.(isset($arr['imapper-border-color']) ? $arr['imapper-border-color'] : '').';border-radius:'.(isset($arr['imapper-border-radius']) ? $arr['imapper-border-radius'] : '').'px;background:'.(isset($arr['imapper-item-pin-color']) ? $arr['imapper-item-pin-color'] : 'transparent').';" ></div>';
		else if (strpos($my_pin_icon_12, 'images/icons/7/') !== FALSE) {
			$frontHtml .='<span id="imapper' . $id . '-pin' . $num . '" class="imapper' . $id . '-pin imapper-pin iMapper-pin-1"></span>';
		}
		else
			$frontHtml .='<img id="imapper' . $id . '-pin' . $num . '" class="imapper' . $id . '-pin" src="' . $my_pin_icon_12 . '">';
							
        /*
         * Pin with icon details
         */
	if (strpos($my_pin_icon_12, 'images/icons/5/') !== FALSE){
		$my_icon_12_12=$arr['imapper-item-picture'];
		if(strpos($my_icon_12_12,"icon")===0){
			$my_icon_12_12=str_replace('icon-','fa-',$my_icon_12_12);
		}
		$frontHtml .=		'<div id="imapper' . $id . '-pin' . $num . '-color" class="imapper-pin-color" style="background-color: ' . $arr['imapper-item-pin-color'] . ';"></div>
							 <i data-width="16" id="imapper' . $id . '-pin' . $num . '-icon" class="imapper-pin-icon fa my-icon-12 ' . $my_icon_12_12 . '"></i>';
	}						
	if (strpos($my_pin_icon_12, 'images/icons/3/') !== FALSE)
		$frontHtml .=		'<img id="imapper' . $id . '-pin' . $num . '" class="imapper-pin-shadow" src="' . substr($my_pin_icon_12, 0, strpos($my_pin_icon_12, '/icons/3/') + 9) . '1-1.png'  . '">';
		
		$my_height_12_12=$settings['item-height'];
		$my_item_header_font_size=$settings['item-header-font-size'];
		$my_item_font_size=$settings['item-font-size'];
		if(strpos($my_pin_icon_12,'images/icons/2')!==false){
			$my_height_12_12=75;
			$my_item_header_font_size=12;
			$my_item_font_size=12;
		}
        /*
         * NOTICE: Font family is changed via javascript but values are printed via php also
         */
		$frontHtml .=		'<div id="imapper' . $id . '-pin' . $num . '-content-wrapper" class="imapper' . $id . '-pin-content-wrapper imapper-content-wrapper" data-back-color="' . $settings['item-back-color'] . '" data-border-color="' . $settings['item-border-color'] . '" data-border-radius="' . $settings['item-border-radius'] . 'px" data-width="' . $settings['item-width'] . 'px" data-height=" ' . $my_height_12_12 . 'px" data-text-color="' . $settings['item-font-color'] . '" data-font="' . esc_js( $font ) . '" >
								<div id="imapper' . $id . '-pin' . $num . '-content" class="imapper-content" style="font-family: ' . $font . ';"><p class="imapper-content-header" style="font-size: ' . $my_item_header_font_size . 'px !important;line-height: '. (intval($my_item_header_font_size)+10) .'px;">' . $arr['imapper-item-title'] . '</p><div class="imapper-content-text" style="font-size: ' . $my_item_font_size. 'px;line-height: '. (intval($my_item_font_size)+6) .'px;">' . $arr['imapper-item-content'] . '</div></div>';
		
	if(strpos($my_pin_icon_12,'images/icons/1/')!==false || strpos($my_pin_icon_12,'images/icons/7/')!==false){			
				
	if (array_key_exists('imapper-item-content-2', $arr))
	{
	if($my_has_12_new_icon){
		if(isset($arr['item-my-tab-pin-new-color']))
		$my_tab_color_12_12=$arr['item-my-tab-pin-new-color'];
		else $my_tab_color_12_12='#000000';
	}else {	
	if(isset($settings['item-my-tab-pin-color'])){
				$my_tab_color_12_12=$settings['item-my-tab-pin-color'];
			}else {
				$my_tab_color_12_12=$settings['item-border-color'];
			}
	}
		$frontHtml .= 			'<div id="imapper' . $id . '-pin' . $num . '-content-tab" class="imapper-content-tab" style="background-color: ' . $settings['item-back-color'] . ';"><a href="#" style="color: ' . $my_tab_color_12_12 . ';">1</a></div>';
		
		
		foreach($itemContentIndexes as $i)
		{
		
            /*
            * NOTICE: Font family is changed via javascript but values are printed via php also
            */
			$frontHtml .= 		'<div id="imapper' . $id . '-pin' . $num . '-content-' . $count . '" class="imapper-content imapper-content-additional" style="background-color: ' . $settings['item-back-color'] . '; border-color: ' . $settings['item-border-color'] . '; border-radius: ' . $settings['item-border-radius'] . 'px; width: ' . $settings['item-width'] . 'px; height: ' . $settings['item-height'] . 'px; font-family: ' . $font . '; font-size: ' . $settings['item-font-size'] . 'px;"><div class="imapper-content-header" style="font-size: ' . $settings['item-header-font-size'] . 'px !important;">' . $arr['imapper-item-title'] . '</div><div class="imapper-content-text">' . $arr[$i] . '</div></div>';
			$frontHtml .=		'<div id="imapper' . $id . '-pin' . $num . '-content-' . $count . '-tab" class="imapper-content-tab" style="background-color: ' . $settings['item-back-color'] . ';"><a href="#" style="color: ' . $my_tab_color_12_12 . ';">' . $count . '</a></div>';
			$count++;
		}
		
	}
	}	
		$frontHtml .=			'<div class="imapper-arrow" style="border-color: ' . $settings['item-back-color'] . ' transparent transparent transparent;"></div>';
		if (strpos($my_pin_icon_12, 'images/icons/2/') === FALSE)
			$frontHtml .=		'<div class="arrow-' . $arr['imapper-item-open-position'] . '-border imapper-arrow-border"></div>';
		else
			$frontHtml .=		'<div class="triangle-' . $arr['imapper-item-open-position'] . '-border imapper-triangle-border"></div>';
		
		$frontHtml .=			'</div>
							<div id="imapper' . $id . '-value-item' . $num . '-open-position" class="imapper' . $id . '-value-item-open-position" style="display:none;">' . $arr['imapper-item-open-position'] . '</div>';
							
		if ($count > 2)
			$tabStyle = 'display: block; width: 16px; height: 16px; border-radius: 8px; border: 1px solid #191970; background-color: #4f92d3; color: white; font-size: 10px; line-height: 1.4; text-align: center; position: absolute; top: -70px; left: 2px; z-index: 10;';
		else
			$tabStyle = 'display: none;';
							
		$frontHtml .=		'<div id="imapper' . $id . '-value-item' . $num . '-tab-number" class="imapper-value-tab-number" style="' . $tabStyle . '">' . ($count - 1) . '</div>
							 <div id="imapper' . $id . '-value-item' . $num . '-border-color" class="imapper-value-border-color" style="display: none;">' . $settings['item-border-color'] . '</div>
					   </div>';
	}

$frontHtml .= '</div>';

$frontHtml .= '<script type="text/javascript">
	(function($) {
			$(window).load(function() {
				$("#imagemapper' . $id .'-wrapper").imageMapper({	
						itemOpenStyle: "'.$settings['item-open-style'].'",
						itemDesignStyle: "'.$settings['item-design-style'].'",
						pinScalingCoefficient: '.$settings['pin-scaling-coef'].',
						categories:'.(isset($settings['categories']) ? $settings['categories'] : 'false' ).', 
						showAllCategory:'.(isset($settings['show-all-category']) ? $settings['show-all-category'] : 'false' ).', 
						allCategoryText:"'.(isset($settings['all-category-text']) ? $settings['all-category-text'] : 'All' ).'", 
						advancedPinOptions:true,
						pinClickAction:"'.(($settings['item-open-style']=='click') ? 'content' : 'none' ).'", 
						pinHoverAction:"'.(($settings['item-open-style']=='hover') ? 'content' : 'none' ).'",
						lightboxGallery:'.(isset($settings['lightbox-gallery']) ? $settings['lightbox-gallery'] : 'false' ).',
						mapOverlay:'.(isset($settings['map-overlay']) ? $settings['map-overlay'] : 'false' ).',
						blurEffect:'.(isset($settings['blur-effect']) ? $settings['blur-effect'] : 'false' ).',
						slideAnimation:'.(isset($settings['slide-animation']) ? $settings['slide-animation'] : 'false' ).'
					});
			});
		})(jQuery);
</script>';