(function($) {

// Set to true to use debug
var my_debug_new_12_12=false;
// Use to set number of tabs for duplicated pin in duplicate pin function
var duplicatedPinTabsNo = false;
var numberOfTabs = new Array();
var my_additional_inputs={};
my_additional_inputs['6/area_pin.png']=['dummy-li-item-border-width','dummy-li-item-border-radius','dummy-li-item-border-color',
                                      'dummy-li-item-area-width',
                                      'dummy-li-item-area-height'];


my_additional_inputs['5/1.png']=['dummy-li-item-pin-color','dummy-li-item-multi-content'];

my_additional_inputs['7/1.png']=['dummy-li-item-multi-content'];
//my_additional_inputs['1/1.png']=['dummy-li-item-multi-content'];

my_additional_inputs['5/purple.png']=['dummy-li-item-picture','dummy-li-item-pin-color'];

$(window).load(function(){	
	function my_admin_debug(t,o){
		if(window.console){
			console.log(t,o);
		}

	}
	var numItems = 0;
	var itemClicked = 0;
	var first = 0;
	var itemIconListClicked = 0;
	var url = $('#plugin-url').val();



	$('.imapper-admin-slider').slider({range: "min", max:500, slide: function( event, ui ) {
		$(this).siblings('input').val(ui.value);
	}});

	$('.imapper-admin-slider').each(function(){
		$(this).slider( "value", $(this).siblings('input').val() );
	});
	
	$( '.color-picker-iris' ).each(function(){
            $(this).css('background', $(this).val());
            $(this).iris({
				height: 145,
                target:$(this).parent().find('.color-picker-iris-holder'),
				change: function(event, ui) {
                    $(this).val(ui.color.toString());
                    $(this).css( 'background-color', ui.color.toString());
                }
            });
    });
	$('.imapper-item-icon-list').mCustomScrollbar();
	$(document).on('click', '.color-picker-iris', function() {
		$('.color-picker-iris-holder').each(function() {
			$(this).css('display', 'none');
		});
		$(this).parent().find('.color-picker-iris-holder').css('display', 'block');
	});
	
	$('body').not('.color-picker-iris').click(function() {
		$('.color-picker-iris-holder').each(function() {
				$(this).css('display', 'none');
			});
	});
	$(document).on('click','.my_remove_custom_pin',function(e){
		var my_id=$(this).parents('.imapper-sortableItem').attr('id');
		var my_id_id=my_id.replace('sort','');
		if(my_debug_new_12_12){
		if(window.console){
			console.log('Remove Icon',{my_id:my_id,my_id_id:my_id_id});
		}}
		//$("#sort"++"-item-my-tab-pin-new-color").val($(".dummy-adapter #item-back-color").val());
		$("#sort"+my_id_id+"-imapper-item-new-pin").val('');
		
		
		$(".my_pin_new_icon_image").attr('src','');
		$("#dummy-imapper-item-pin").val('');
		iconUploadBehavior();

	});
	//initialization for different pins
	/*
	if ($('#item-icon').attr('src').indexOf('images/icons/2/') >= 0)
	{
			$('#item-font-size').html('12');
			$('#item-font-size').attr('value', '12');
			$('#item-font-size').attr('readonly', 'readonly');
			$('#item-header-font-size').html('12');
			$('#item-header-font-size').attr('value', '12');
			$('#item-header-font-size').attr('readonly', 'readonly');
			$('#item-height').html('75');
			$('#item-height').attr('value', '75');
			$('#item-height').attr('readonly', 'readonly');
			
			$('#dummy-imapper-item-open-position').find('option').each(function() {
				if ($(this).attr('value') == 'top' || $(this).attr('value') == 'bottom')
					$(this).remove();	
			});
			
			$('.imapper-sortable-real').each(function() {
				$(this).find('option').each(function() {
					if ($(this).attr('value') == 'top' || $(this).attr('value') == 'bottom')
						$(this).remove();
				});
			});
	}
	


	if ($('#item-icon').attr('src').indexOf('images/icons/1/') >= 0 || $('#item-icon').attr('src').indexOf('images/icons/7/') >= 0)
	{
		$('#dummy-li-item-category').next().after('<li><input type="button" value="+ Add new tab" id="item-content-button-new" /><input type="button" value="- Remove last tab" id="item-content-button-remove" /></li>');
	}
	
	if ($('#item-icon').attr('src').indexOf('images/icons/5/') >= 0)
	{
		var icons = createIconList();

		$('#imapper-sortable-dummy>li:eq(1)').after('<li id="dummy-li-item-picture" style="position: relative;"><label for="dummy-imapper-item-picture" style="display: inline-block; margin-top: -12px;">Item Pin Image</label><input id="dummy-imapper-item-picture" name="dummy-imapper-item-picture" value="fa-cloud-download" type="hidden"><i id="dummy-imapper-pin-icon" class="fa icon-2x fa-cloud-download" style="width: 32px; height: 27px; border: 1px solid black; margin: 0 5px 0 45px;"></i><div class="icon-list-button"><a class="arrow-down-admin-link" href="#"><div class="arrow-down-admin" style=""></div></a></div>' + icons + '</li>');
		
		$('.imapper-item-icon-list').mCustomScrollbar();	
	}
	*/
	$('.imapper-sortable-real').each(function() {
		var selected = -1;
	
		$(this).find('option').each(function(index) {
			if ($(this).attr('selected') == 'selected')
				selected = index;
		});
		
		if (selected == -1)
			$(this).find('option').eq(0).attr('selected', 'selected');
			
		var id = $(this).attr('id').substring(17);
		numberOfTabs[id] = $(this).find('textarea').length;
	});
	
        /* =========================================================*/
        /* Place all pins on refreash in edit iMapper page */
        /* ==========================================================*/
	$('.imapper-sortableItem').each(function (index) {
            if (parseInt($(this).attr('id').substring(4)) > numItems)
            {
                if (index == 0)
                    first = parseInt($(this).attr('id').substring(4));

                numItems = parseInt($(this).attr('id').substring(4));
                var ind = numItems;

                var left = $('#sort' + numItems + '-imapper-item-x').attr('value');
                var top = $('#sort' + numItems + '-imapper-item-y').attr('value');

                var pinWrapper;
                var my_new_icon = $("#sort" + numItems + "-imapper-item-new-pin").val();
                if (my_new_icon != '') {
                    pinWrapper = createPin_1(numItems, left, top);

                } else
                    pinWrapper = createPin(numItems, left, top);

                $('.mapper-sort-image').append(pinWrapper);
                
                /*
                 * Fix for Pin with icon not centering nice on page refreash, fix getting width and height 0
                 * Also prevent error if any pin (area or tab pin) don't have src
                 */
                if ( $('#sort' + numItems + '-mapper-pin').attr('src') !== undefined && $('#sort' + numItems + '-mapper-pin').attr('src').indexOf('images/icons/5/') >= 0 ) {
                    $('#sort' + numItems + '-mapper-pin').addClass('imapper-pin-with-icon');
                }

                $('#sort' + numItems + '-mapper-pin').css('top', -$('#sort' + numItems + '-mapper-pin').height() + 'px');
                $('#sort' + numItems + '-mapper-pin').css('left', -($('#sort' + numItems + '-mapper-pin').width() / 2) + 'px');
                $('#sort' + numItems + '-mapper-pin-delete').css('top', -$('#sort' + numItems + '-mapper-pin').height() + 'px');
                $('#sort' + numItems + '-mapper-pin-delete').css('left', $('#sort' + numItems + '-mapper-pin').width() / 2 - 15 + 'px');

                pinWrapper.draggable({
                    containment: "parent",
                    start: function () {
                        itemClicked = itemIsClicked($(this).attr('id').substring(4, $(this).attr('id').indexOf('-')), itemClicked);
                    },
                    stop: function (event, ui) {
                        var my_id = $(ui.helper).attr('id');
                        my_id = my_id.replace('sort', '');
                        my_id = my_id.replace('-mapper-pin-wrapper', '');
                        //my_admin_debug("Debug",{my_id:my_id});
                        var coordX = $(this).offset().left;
                        var coordY = $(this).offset().top;

                        var mapCoord = $('#map-image').offset();
                        var mapCoordX = mapCoord.left;
                        var mapCoordY = mapCoord.top;

                        var newPosX = (coordX - mapCoordX) / $(this).parent().width() * 100;
                        var newPosY = (coordY - mapCoordY) / $(this).parent().height() * 100;

                        $(this).css('left', newPosX + '%');
                        $(this).css('top', newPosY + '%');

                        $('#sort' + my_id + '-imapper-item-x').attr('value', newPosX + '%');
                        $('#sort' + my_id + '-imapper-item-y').attr('value', newPosY + '%');
                    }
                });
            }
        });



		       var pinWidthOld = 0;
			 var pinHeightOld = 0;

	$('.imapper-area-pin').resizable({
            start:function(){
                           pinWidthOld = $(this).width();
                           pinHeightOld = $(this).height();

                  },
            stop: function() {
                   var pinId = $(this).attr('id').substr(0,$(this).attr('id').indexOf('-mapper-pin'));
                   var pinWidth = $(this).width();
                   var pinHeight = $(this).height();



                   $(this).css({top:-pinHeight+'px',left:-(pinWidth/2)+'px'});


                  var imageWidth = jQuery('#map-image').width();
                  var imageHeight = jQuery('#map-image').height();

                   var pinWidthOffset = (pinWidth-pinWidthOld);
                   var pinHeightOffset = (pinHeight-pinHeightOld);




                   var pinLeftInPercent = parseFloat($(this).parent().css('left'))*100/imageWidth;
                   var pinTopInPercent = parseFloat($(this).parent().css('top'))*100/imageHeight;




                   $(this).closest('.imapper-pin-wrapper').css({'left':'+='+pinWidthOffset/2+'px','top':'+='+pinHeightOffset+'px'});

                   var pinLeftInPercent = parseFloat($(this).parent().css('left'))*100/imageWidth;
                   var pinTopInPercent = parseFloat($(this).parent().css('top'))*100/imageHeight;

                   $(this).closest('.imapper-pin-wrapper').css({'left':pinLeftInPercent+'%','top':pinTopInPercent+'%'});


                   $('#'+ pinId +'-imapper-item-x').attr('value',pinLeftInPercent+'%');
                    $('#'+ pinId +'-imapper-item-y').attr('value',pinTopInPercent+'%');

                   if ($('#imapper-'+pinId+'-header').css('background-color')=="rgb(200, 200, 200)") {
                          $('#'+pinId+'-imapper-area-width, #dummy-imapper-area-width').attr('value',pinWidth);
                          $('#'+pinId+'-imapper-area-height, #dummy-imapper-area-height').attr('value',pinHeight);
                   } else {
                          $('#'+pinId+'-imapper-area-width').attr('value',pinWidth);
                          $('#'+pinId+'-imapper-area-height').attr('value',pinHeight);
                   }
            }
          });
	
	$('.imapper-pin-text').each(function () {
		var w=$(this).width();
		var img_w=$(this).siblings('img').width();
		var img_pos=w/2;
		$(this).css('right','-'+img_pos+'px');
		//$(this).css('right', ($(this).width() / 2) + 'px');	
	});
	
	if (numItems > 0)
	{	
		$('#imapper-sortable-dummy').css('visibility', 'visible');
		
		//itemClicked = itemIsClicked(first, itemClicked);
	}

	// COLORPICKER
	var colPickerOn = false,
		colPickerShow = false, 
		pluginUrl = $('#plugin-url').val(),
		timthumb = pluginUrl + 'timthumb/timthumb.php';

		if (pluginUrl.substr(-1) != '/') pluginUrl += '/';

	// colorpicker field
	$('.cw-color-picker').each(function(){
		var $this = $(this),
			id = $this.attr('rel');
 
		$this.farbtastic('#' + id);
		$(document).on('click', $this, function(){
			$this.show();
		});
		$(document).on('click', '#' + id, function(){
			$('.cw-color-picker:visible').hide();
			$('#' + id + '-picker').show();
			colPickerOn = true;
			colPickerShow = true;
		});
		$(document).on('click', $this, function(){
			colPickerShow = true;	
		});
		
	});
        
        /* =========================================================================================*/
        /* Map select - Insert custom image as background image to place pins
        /* @since Version 2.8
        /* =========================================================================================*/
        $(document).on('click', '#map-change, .imapper-change-map-image', function (e) {

            e.preventDefault();
            
            // Keept this for possible compatibility as may be needed for some other code
             _custom_media = true;

            var file_frame, image_data;

            if ( undefined !== file_frame ) {

                    file_frame.open();
                    return;

            }

            file_frame = wp.media.frames.file_frame = wp.media({
                    //Title of media manager frame
                    title: "Select or upload custom image",
                    library: {
                       type: 'image'
                    },
                    button: {
                       //Button text
                       text: "Insert image"
                    },
                    multiple: false
            });

            // Get selection
            file_frame.on( 'select', function() {

                    image_data = file_frame.state().get( 'selection' ).first().toJSON();

                    // Fill hidden input and Create preview
                    $("#map-image").attr("src", image_data.url).siblings('input').attr('value', image_data.url);
                    
                    // If remove button pressed first all pins will be hidden. Show them
                    $('.imapper-pin-wrapper').show();
                    
                    /*
                    * To hide redesigned "No image uploaded" html 
                    * @since 2.8
                    */
                   $('.map-wrapper').removeClass('imapper-no-map-image').addClass('imapper-map-image-exists');

            });

            // Now display the actual file_frame
            file_frame.open();
                    
        });

        /*
         * Zasto je ovo ovde i kakvu funkciju ima?
         * A.P.
         */
        $('.add_media').on('click', function () {
            _custom_media = false;
        });
        
        
	// IMAGE UPLOAD
        /* =========================================================================================*/
        /* Define location that pin image is changing, used to define if changing all pins or only specific pin */
        /* =========================================================================================*/
	var thickboxId =  '',
        thickItem = false; 
	
	// background images
	$('.cw-image-upload').click(function(e) {
		e.preventDefault();
		thickboxId = '#' + $(this).attr('id');
		formfield = $(thickboxId + '-input').attr('name');
		tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
		return false;
	});
         
        /* =========================================================================================*/
        /* Uploader iframe for pins use this function, all upload is handled through this function 
        /* @since Version 2.8
        /* =========================================================================================*/
        $(document).on('click', '.imapper-chose-custom-img-uploader', function(e){

            e.preventDefault();

            var file_frame, image_data;

            if ( undefined !== file_frame ) {

                    file_frame.open();
                    return;

            }

            file_frame = wp.media.frames.file_frame = wp.media({
                    //Title of media manager frame
                    title: "Select or upload custom pin",
                    library: {
                       type: 'image'
                    },
                    button: {
                       //Button text
                       text: "Insert pin"
                    },
                    //Do not allow multiple files, if you want multiple, set true
                    multiple: false
            });

            // Get selection
            file_frame.on( 'select', function() {

                    image_data = file_frame.state().get( 'selection' ).first().toJSON();

                    // Create preview
                    $('.imapper-custim-img-preview').html('<img src="' + image_data.url + '" />');

                    // Create form element to select sizes
                    if (image_data.sizes != undefined) {
                        $.each(image_data.sizes, function (index, val) {

                            var height = val.height;
                            var width = val.width;
                            var selected = '';

                            if (image_mapper_admin_js_data.default_pin_size == index) {
                                selected = ' selected="selected"';
                            }

                            // Fill select for image sizes and show it
                            $('.imapper-chose-custom-img-size').append('<option value="' + val.url + '"' + selected + '>' + index.toString() + ' ' + width + 'x' + height + '</option>');

                            // Show all additional fields
                            $('.imapper-custom-img-wrapper').addClass('active');
                        });
                    }
            });

            // Now display the actual file_frame
            file_frame.open();
                    
        });
        
        
        /* ==================================================================================================================*/
        /* Click on button to insert custom image with selected size - inside media uploader modal under Import your own pin 
         * @since Version 2.8                                                                   
        /* ==================================================================================================================*/
         $(document).on('click', '.imapper-insert-chosen-pin-size', function(e){

            e.preventDefault();
            
            var selected_size_url = $('.imapper-chose-custom-img-size option:selected').val();
            
                /* ==========================================================================================*/
                /* Insert custom pin from active pins button "Choose pin icon image" after uploading process */
                /* use iconUploadBehavior_1() */
                /* ==========================================================================================*/
		if(thickItem&&thickboxId == 'custom_pin'){
                    thickItem = false;
                    if(my_debug_new_12_12){
                        if(window.console){
                                console.log('Choosecustom image',selected_size_url);
                        }
                    }
                    
                    /*
                     * Dummy adapter (hidden below) is active pin container wrapper which gets .closed class when closed
                     * Or gets below html appended (from hidden html) so it could change the data 
                     * 
                     * In short if we change only one pin, onlu that pin will have below classes and ids
                     * Than we get all the dummy-adapter data and pass to function below iconUploadBehavior_1() which will do the real pin data update
                     */
                    $('.dummy-adapter .my_pin_new_icon_image').attr('src', selected_size_url);
                    $('.dummy-adapter #dummy-imapper-item-pin').attr('value',selected_size_url);
                    $(".dummy-adapter .my_tab_tab_icon_color").hide();

                    var image=selected_size_url;
                    iconUploadBehavior_1(image);
		}else {
                    $(thickboxId + '-input').val(selected_size_url);
                    if (thickItem) {
                            thickItem = false;
                            $(thickboxId).attr('src', selected_size_url);
                            $(thickboxId).parent().find('input').attr('value', selected_size_url);
                            $(thickboxId).parent().find('.imapper-pin-wrapper').each(function() {
                                    $(this).css('display', 'block');	
                            });	

                           /* =========================================================================================*/
                            /* Insert custom pin from all pins (only one's which don't have overrided icon in active pin settings) 
                             * right metabox button "Change pin" after uploading process*/
                            /* use iconUploadBehavior() */
                            /* =========================================================================================*/
                            if (thickboxId == '#item-icon')
                                    iconUploadBehavior();
                    }
                    else {
                            $(thickboxId).css('background', 'url('+selected_size_url+') repeat');
                    }
		}
		tb_remove();
            
         });
        
	
        /* =========================================*/
        /* Delete custom pin in active pins section */
        /* =========================================*/
	$(document).on('click', '.imapper-pin-delete', function() {
		var id = $(this).attr('id').substring(4, $(this).attr('id').indexOf('-'));
		$('#sort' + id).find('.imapper-delete').trigger('click');
	});

	
	$(document).keydown(function(e){
    /*if (e.which == 46) { 
       var pinDelete = $('.imapper-pin-delete').filter(function(){
       	return $(this).css('display') == 'block';
       });
       pinDelete.trigger('click');
       e.preventDefault();
    }*/
	});
	
        /*
         * Ovo izgeda se vise ne koristi, ostavljam ovde za svaki slucaj
         * A.P.
         */
	$('.remove-image').click(function(e){
		e.preventDefault();
		$(this).parent().parent().find('input').val('');
		$(this).parent().parent().find('.cw-image-upload').css('background-image', 'url(' + pluginUrl + 'images/no_image.jpg)');
	});
	
	$(document).on('click', '.imapper-item-icon-list a', function(e) {
		e.preventDefault();
		
		$('#dummy-imapper-pin-icon').removeClass();
		$('#dummy-imapper-pin-icon').addClass($(this).find('i').attr('class'));
		$('#dummy-imapper-item-picture').attr('value', $(this).find('i').attr('class'));
		$('#dummy-imapper-pin-icon').addClass('icon-2x');
		$('#dummy-imapper-pin-icon').addClass('fa');
		
		$('.imapper-item-icon-list').css('display', 'none');
		itemIconListClicked = 0;
	});
	
	$(document).on('click', '.arrow-down-admin-link', function(e) {
		e.preventDefault();
		
		if (itemIconListClicked == 0)
		{
			$('.imapper-item-icon-list').css('display', 'block');
			$('.imapper-item-icon-list').mCustomScrollbar('update');
			itemIconListClicked = 1;
		}
		else
		{
			$('.imapper-item-icon-list').css('display', 'none');
			itemIconListClicked = 0;
		}
	});
	
	$(document).on('click', '#item-content-button-new', function() {
		numberOfTabs[itemClicked]++;
		
		$('#li-item-content').append('<textarea rows="6" style="resize: none;" id="dummy-imapper-item-content-' + numberOfTabs[itemClicked] + '" class="textarea-additional" name="dummy-imapper-item-content-' + numberOfTabs[itemClicked] + '" value="" type="text" ></textarea>');
		
		$('#imapper-sortable-' + itemClicked).find('li').eq(3).append('<textarea rows="6" id="sort' + itemClicked + '-imapper-item-content-' + numberOfTabs[itemClicked] + '" class="textarea-additional" name="sort' + itemClicked + '-imapper-item-content-' + numberOfTabs[itemClicked] + '" value="" type="text" ></textarea>');
	});
	
	$(document).on('click', '#item-content-button-remove', function() {
		$('#dummy-imapper-item-content-' + numberOfTabs[itemClicked]).remove();
		$('#sort' + itemClicked + '-imapper-item-content-' + numberOfTabs[itemClicked]).remove();
		
		if (numberOfTabs[itemClicked] > 1)
			numberOfTabs[itemClicked]--;
	});
	
	$(document).on('click', '.imapper-sort-header', function(){
		itemClicked = itemIsClicked($(this).attr('id').substring(12, $(this).attr('id').substring(8).indexOf('-') + 8), itemClicked);
		

	});
	
	$(document).on('click', '.imapper-pin', function() {

		itemClicked = itemIsClicked($(this).attr('id').substring(4, $(this).attr('id').indexOf('-')), itemClicked);
		$('#imapper-sort' + itemClicked + '-header').trigger('click');
	});
	
	$(document).on('input', '#dummy-imapper-item-title', function(e) {
		e.preventDefault();
		$('#imapper-sort' + itemClicked + '-header').find('small').find('i').find('span').html($('#dummy-imapper-item-title').attr('value'));
		
		$('#sort' + itemClicked + '-mapper-pin-text').html($('#dummy-imapper-item-title').attr('value'));
		//$('#sort' + itemClicked + '-mapper-pin-text').css('right', ($('#sort' + itemClicked + '-mapper-pin-text').width() / 2 - 8) + 'px');
		var w=$('#sort' + itemClicked + '-mapper-pin-text').width();
		//var img_w=$(this).siblings('img').width();
		var img_pos=w/2;
		$('#sort' + itemClicked + '-mapper-pin-text').css('right','-'+img_pos+'px');
	});

        /* ===================================================================*/
        /* Add pins on click on background image
         * Create new blank dummy adapter and real adapter with default values
        /* ===================================================================*/
	$('#map-image').click(function(e){
		e.preventDefault();
		
		var pluginUrl = $('#plugin-url').val();
		if (pluginUrl.substr(-1) != '/') pluginUrl += '/';
		
		if ($('#map-image').attr('src') != pluginUrl + 'images/no_image.jpg')
		{
		
			numItems++;
			
			var mapCoord = $(this).offset();
			var mapCoordX = mapCoord.left;
			var mapCoordY = mapCoord.top;
			
			var clickCoordX = e.pageX;
			var clickCoordY = e.pageY;
			
			var posX = clickCoordX - mapCoordX;
			var posY = clickCoordY - mapCoordY;
			
			var posPercentX = posX / $(this).width() * 100;
			var posPercentY = posY / $(this).height() * 100;
			
			var pinWrapper = createPin(numItems, posPercentX + '%', posPercentY + '%');
			
			$(this).parent().append(pinWrapper);
                        
                        // Add unique class only to the added pin, used for duplication
                        $('.imapper-pin').removeClass('imapper-added-pin');
                        $('#sort' + numItems + '-mapper-pin').addClass('imapper-added-pin');
			
			$('#sort' + numItems + '-mapper-pin').css('top', -$('#sort' + numItems + '-mapper-pin').height() + 'px');
			$('#sort' + numItems + '-mapper-pin').css('left', -($('#sort' + numItems + '-mapper-pin').width()/2) + 'px');
			$('#sort' + numItems + '-mapper-pin-delete').css('top', -$('#sort' + numItems + '-mapper-pin').height() + 'px');
			$('#sort' + numItems + '-mapper-pin-delete').css('left', $('#sort' + numItems + '-mapper-pin').width()/2 - 15 + 'px');
			
			if (numItems > 0)
			{
				$('#imapper-sortable-dummy').css('visibility', 'visible');
				var icon = $('#dummy-imapper-item-picture').val();
				var color = $('#dummy-imapper-item-pin-color').val();
			}
			else
			{
				var icon = 'icon-cloud-download';
				var color = '#0000ff';
			}
			
			var items_options = '<ul id="imapper-sortable-' + numItems + '" class="imapper-sortable-real" style="display:none;" >'
							+ '<li>'
								+ '<input type="hidden" id="sort' + numItems + '-imapper-item-x" name="sort' + numItems + '-imapper-item-x" value="' + posPercentX +'%" />'
								+ '<input type="hidden" id="sort' + numItems + '-imapper-item-y" name="sort' + numItems + '-imapper-item-y" value="' + posPercentY +'%" />'
							+ '</li>'
							+ '<li>'
								+ '<label style="margin-left:5px;" for="sort' + numItems + '-imapper-item-title">Item title</label>'
								+ '<input style="margin-left:5px;" id="sort' + numItems + '-imapper-item-title" name="sort' + numItems + '-imapper-item-title" value="" type="text" />'
							+ '</li>';
			items_options+='<li id="sort'+numItems+'-li-item-new-pin-icon">'
						+'<a class="my_choose_custom_pin">' + image_mapper_admin_js_data.choose_pin_image + '</a> <br />'
						+'<div class="my_tab_tab_icon_color">'
						+'<input type="hidden" style="background: none repeat scroll 0% 0% rgb(0, 0, 0);" value="" class="color-picker-iris" name="sort'+numItems+'-item-my-tab-pin-new-color" id="sort'+numItems+'-item-my-tab-pin-new-color">'
						+'</div>'
						+'<input type="hidden" id="sort'+numItems+'-imapper-item-new-pin" name="sort'+numItems+'-imapper-item-new-pin" value=""/>';
						+'</li>';				
			if ($('#item-icon').attr('src').indexOf('images/icons/5/') >= 0 || $('#item-icon').attr('src').indexOf('images/icons/6/') >= 0 || $('#item-icon').attr('src').indexOf('images/icons/7/') >= 0) 
				items_options	+=	  '<li>'
									+	'<input id="sort' + numItems + '-imapper-item-pin-color" name="sort' + numItems + '-imapper-item-pin-color" class="imapper-item-pin-color" value="' + color + '" type="text" style="">'
								+	  '</li>';


				if ($('#item-icon').attr('src').indexOf('images/icons/6/') >= 0) 
				items_options	+=	  '<li id="sort'+numItems+'-li-item-border-color" >'
									+	'<input id="sort' + numItems + '-imapper-border-color" type="text" name="sort' + numItems + '-imapper-border-color">'
								+	  '</li>'
								+ '<li id="sort'+numItems+'-li-item-border-width" >'
									+	'<input id="sort' + numItems + '-imapper-border-width" type="text" name="sort' + numItems + '-imapper-border-width">'
								+	  '</li>'
								+ '<li id="sort'+numItems+'-li-item-border-radius" >'
									+	'<input id="sort' + numItems + '-imapper-border-radius" type="text" name="sort' + numItems + '-imapper-border-radius">'
								+	  '</li>'
								+ '<li id="sort'+numItems+'-li-item-area-width" >'
									+	'<input id="sort' + numItems + '-imapper-area-width" type="text" name="sort' + numItems + '-imapper-area-width" value="100">'
									+ '<input id="sort' + numItems + '-imapper-area-width-normalized" class="imapper-area-width-normalized" name="sort' + numItems + '-imapper-area-width-normalized" type="text">'
								+	  '</li>'
								+ '<li id="sort'+numItems+'-li-item-area-height" >'
									+	'<input id="sort' + numItems + '-imapper-area-height" type="text" name="sort' + numItems + '-imapper-area-height" value="100">'
									+ '<input id="sort' + numItems + '-imapper-area-height-normalized" class="imapper-area-height-normalized" name="sort' + numItems + '-imapper-area-height-normalized" type="text">'
								+	  '</li>';




			if ($('#item-icon').attr('src').indexOf('images/icons/5/') >= 0)					
				items_options	+=	  '<li>'
									+	'<input id="sort' + numItems + '-imapper-item-picture" name="sort' + numItems + '-imapper-item-picture" class="imapper-item-picture" value="' + icon + '" type="text">'
								+	  '</li>';				
							
			items_options +=  '<li>'
								+ '<label style="margin-left:5px;" for="sort' + numItems + '-imapper-item-open-position">Item Open Position</label>'
								+ '<select name="sort' + numItems + '-imapper-item-open-position" id="sort' + numItems + '-imapper-item-open-position">'
									+ '<option value="left">Left</option>'
									+ '<option value="right">Right</option>';
			
			if ($('#item-icon').attr('src').indexOf('images/icons/2/') < 0)
				items_options	+= 	  '<option value="top">' + image_mapper_admin_js_data.select_option_top + '</option>'
									+ '<option value="bottom">' + image_mapper_admin_js_data.select_option_bottom + '</option>';
									
				items_options  += '</select>'
							+ '</li>'
							+ '<div class="clear"></div>'
							+ '<li>'
				 			+ '<label for="sort' + numItems + '-imapper-item-category">Item category</label>'
				 			+ '<input style="margin-left: 75px; width: 230px;" id="sort' + numItems + '-imapper-item-category" name="sort' + numItems + '-imapper-item-category" value="" type="text" />'
				 			+ '</li>'
				 			+ '<li>'
				 			+ '<label for="sort' + numItems + '-imapper-item-link">Item link</label>'
				 			+ '<input style="margin-left: 75px; width: 230px;" id="sort' + numItems + '-imapper-item-link" name="sort' + numItems + '-imapper-item-link" value="" type="text" />'
				 			+ '</li>'
							+ '<li>'
								+ '<label style="margin-left:5px;" for="sort' + numItems + '-imapper-item-content">Item content</label>'
								+ '<input style="margin-left:5px;" id="sort' + numItems + '-imapper-item-content" name="sort' + numItems + '-imapper-item-content" value="" type="text" />'
							+ '</li>';
											/**
				 * Ja sam dodao content
				 */
				items_options+='<li>'
								+'<label style="margin-left:5px;" for="sort' + numItems + '-imapper-item-click-action">Pin Click aaction</label>'
								+'<select id="sort' + numItems + '-imapper-item-click-action" name="sort' + numItems + '-imapper-item-click-action">'
								+'<option value="default">Default</option>'
								+'<option value="none">None</option>'
								+'<option value="link">Link</option>'
								+'<option value="content">Content</option>'
								+'<option value="contentBelow">Content below</option>'
								+'<option value="lightboxImage">Lightbox image</option>'
								+'<option value="lightboxIframe">Lightbox iframe</option>'
								+'</select>'
								+'</li>';
				items_options+='<li>'
								+'<label style="margin-left:5px;" for="sort' + numItems + '-imapper-item-hover-action">Pin Hover action</label>'
								+'<select id="sort' + numItems + '-imapper-item-hover-action" name="sort' + numItems + '-imapper-item-hover-action">'
								+'<option value="default">Default</option>'
								+'<option value="none">None</option>'
								+'<option value="content">Content</option>'
								+'<select>'
								+'</li>'	
												
							
						+ '</ul>';

						
			$('.imapper_items_options').append(items_options);
			
			var itemss = '<li id="sort' + numItems + '" class="imapper-sortableItem">'
                                                        + '<a href="#" class="imapper-duplicate-pin">' + image_mapper_admin_js_data.duplicate_pin_string + '</a>'
							+	'<div id="imapper-sort' + numItems + '-header" class="imapper-sort-header">Pin ' + numItems + ' <small><i>- <span></span></i></small><a href="#" class="imapper-delete add-new-h2">' + image_mapper_admin_js_data.delete_pin_string + '</a> &nbsp;</div><div class="dummy-adapter closed"></div>'
							+ '</li>';
							
			$('#imapper-sortable-items').append(itemss);
			
			if ($('.imapper-sort-header').length > 0)
			{
				itemClicked = itemIsClicked(numItems, itemClicked);
			}
                        
                        /*
                         * Added check if duplicated pin in process
                         * 
                         * duplicatedPinTabsNo will hold number of tabs for duplicated pin
                         */
                        if ( duplicatedPinTabsNo ) {
                            numberOfTabs[numItems] = duplicatedPinTabsNo;
                        } else {
                            numberOfTabs[numItems] = 1;
                        }
                        
			pinWrapper.draggable({
			 	containment: "parent",
				start: function() {
					itemClicked = itemIsClicked($(this).attr('id').substring(4, $(this).attr('id').indexOf('-')), itemClicked);
				},
				stop: function(event,ui) {
					var my_id=$(ui.helper).attr('id');
					my_id=my_id.replace('sort','');
					my_id=my_id.replace('-mapper-pin-wrapper','');
			

					var coordX = $(this).offset().left;
					var coordY = $(this).offset().top;
					
					var newPosX = (coordX - mapCoordX) / $(this).parent().width() * 100;
					var newPosY = (coordY - mapCoordY) / $(this).parent().height() * 100;
					
					$(this).css('left', newPosX + '%');
					$(this).css('top', newPosY + '%');
					
					$('#sort' + my_id + '-imapper-item-x').attr('value', newPosX + '%')
					$('#sort' + my_id + '-imapper-item-y').attr('value', newPosY + '%')
				}
			});

			
      var pinWidthOld = 0;
			 var pinHeightOld = 0;
	$('.imapper-area-pin').resizable({
			  	  start:function(){
			  	  		 pinWidthOld = $(this).width();
			 			 pinHeightOld = $(this).height();

			  		},
				  stop: function() {
				  	 var pinId = $(this).attr('id').substr(0,$(this).attr('id').indexOf('-mapper-pin'));
				  	 var pinWidth = $(this).width();
				  	 var pinHeight = $(this).height();

				  	 
				  	 
				  	 $(this).css({top:-pinHeight+'px',left:-(pinWidth/2)+'px'});



				  	var imageWidth = jQuery('#map-image').width();
				  	var imageHeight = jQuery('#map-image').height();

				  	 var pinWidthOffset = (pinWidth-pinWidthOld);
				  	 var pinHeightOffset = (pinHeight-pinHeightOld);




				  	 var pinLeftInPercent = parseFloat($(this).parent().css('left'))*100/imageWidth;
				  	 var pinTopInPercent = parseFloat($(this).parent().css('top'))*100/imageHeight;




				 	 $(this).closest('.imapper-pin-wrapper').css({'left':'+='+pinWidthOffset/2+'px','top':'+='+pinHeightOffset+'px'});
				  	 
				  	 var pinLeftInPercent = parseFloat($(this).parent().css('left'))*100/imageWidth;
				  	 var pinTopInPercent = parseFloat($(this).parent().css('top'))*100/imageHeight;

				  	 $(this).closest('.imapper-pin-wrapper').css({'left':pinLeftInPercent+'%','top':pinTopInPercent+'%'});

				  	 $('#'+ pinId +'-imapper-item-x').attr('value',pinLeftInPercent+'%');
				  	  $('#'+ pinId +'-imapper-item-y').attr('value',pinTopInPercent+'%');
				     
					
				  	 if ($('#imapper-'+pinId+'-header').css('background-color')=="rgb(200, 200, 200)") {
				  	 	$('#'+pinId+'-imapper-area-width, #dummy-imapper-area-width').attr('value',pinWidth);
				  		$('#'+pinId+'-imapper-area-height, #dummy-imapper-area-height').attr('value',pinHeight);
				  	 } else {
				  	 	$('#'+pinId+'-imapper-area-width').attr('value',pinWidth);
				  	 	$('#'+pinId+'-imapper-area-height').attr('value',pinHeight);
				  	 }
				  }
				});
		
		}
	});
	
	$(document).on('click','.imapper-sort-header', function(){
		if ($(this).siblings('.dummy-adapter').hasClass('closed')) {
			$('.dummy-adapter').addClass('closed');
			$(this).siblings('.dummy-adapter').removeClass('closed').append($('#imapper-sortable-dummy'));


		} else {
			$(this).siblings('.dummy-adapter').addClass('closed');
			$('.imapper_items_options #imapper-sortable-dummy').remove();
			$('.imapper_items_options').prepend($(this).siblings('.dummy-adapter').find('#imapper-sortable-dummy'));
		}
		
		
		$('.dummy-adapter .imapper-admin-select-wrapper span').each(function(){
		var text = $(this).siblings('select').find(':selected').text();
		$(this).text(text);
	});
	});

	// delete pin
	$(document).on('click', '.imapper-delete', function(e){
				/**
		 * Changed dragan 12 23 2014 stop calling items is clicked 
		 * there is no need when delete pin
		 */
		e.stopPropagation();
		var l=$("#imapper-sortable-dummy").length;
		//my_admin_debug("Dummy adapter",l);
		
		
		e.preventDefault();
		var my_id=$(this).closest('li').attr('id').substring(4);
		//my_admin_debug("Delete",{my_id:my_id});
		if (!$(this).siblings('.dummy-adapter').hasClass('closed')) {
			var my_html_12=$(this).parents(".imapper-sort-header").siblings('.dummy-adapter').html();
			//my_admin_debug("Dummy adapter has not closed",my_html_12);
			$('.imapper_items_options').prepend(my_html_12);
			//$('.imapper_items_options').prepend($(this).siblings('.dummy-adapter').find('#imapper-sortable-dummy').html());
		}
				/**
		 * Remove pin from image
		 */
		
		$('#sort' + $(this).closest('li').attr('id').substring(4) + '-mapper-pin-wrapper').remove();
		$('#imapper-sortable-' + $(this).closest('li').attr('id').substring(4)).remove();
		$(this).closest('li').remove();
		
		if ($('.imapper-sortableItem').length == 0)
		{
			$('#dummy-imapper-item-title').attr('value', '');
			$('#dummy-imapper-item-content').attr('value', '');
			$('#imapper-sortable-dummy').css('visibility', 'hidden');
		}
		
		$('.imapper-sortableItem').each( function(index) {
			if (index == 0)
				first = parseInt($(this).attr('id').substring(4));
		});
		
		/*if (itemClicked == parseInt($(this).closest('li').attr('id').substring(4)))
			itemClicked = itemIsClicked(first, 0);
		*/
	});
	
	$(document).on('click', '.tsort-remove', function(e){
		e.preventDefault();
		$(this).parent().find('input').val('');
		$(this).parent().find('#map-image').attr('src', pluginUrl + 'images/no_image.jpg');
		//$(this).parent().find('img').attr('src', pluginUrl + 'images/no_image.jpg');
                
                /*
                 * Add class to hide no_image.jpg as new html is displayed. This picture is here as it is required by other function
                 * @since 2.8
                 */
                $('.map-wrapper').removeClass('imapper-map-image-exists').addClass('imapper-no-map-image');
	});
	
	$('#map-image-remove').click(function() {
		$('.imapper-pin-wrapper').each(function() {
			$(this).css('display', 'none');	
		});
	});
	

//on-off checkboxes

$(document).on('click','.imapper-checkbox-on',function(){
	$(this).removeClass('inactive');
	$(this).siblings('.imapper-checkbox-off').addClass('inactive');
	$(this).siblings('[type=checkbox]').attr('checked','checked');
});

$(document).on('click','.imapper-checkbox-off',function(){
	$(this).removeClass('inactive');
	$(this).siblings('.imapper-checkbox-on').addClass('inactive');
	$(this).siblings('[type=checkbox]').removeAttr('checked');
});

	
	$(document).on('click','#closeIconUpload',function(e){
		//$(".my_upload_image_12").hide();
		
	});
	//icon select functions
        /*
         * Clicked on right metabeox "Basic pin settings" on "Change pin button", change all pins
         */
	$(document).on('click', '#icon-change', function(e) {
		e.preventDefault();
				
                // Use thickboxId = customIconsContent
                $('body').append('<div id="TB_overlay" class="TB_overlayBG"></div><div id="TB_window" style="margin-left: -430px; width: 860px; height: 220px; margin-top: -200px; visibility: visible;"><div id="TB_title"><div id="TB_ajaxWindowTitle" style="padding:0px 10px;">' + image_mapper_admin_js_data.modal_select_your_pin + '</div><div id="TB_closeAjaxWindow"><a id="closeIconUpload" title="' + image_mapper_admin_js_data.modal_close + '" href="#"><div class="tb-close-icon"></div></a></div></div><a id="ourIconsContent" href="#" class="icon-upload-tab" style="margin-top: 7px;">' + image_mapper_admin_js_data.modal_default_pins + '</a><a id="customIconsContent" href="#" class="icon-upload-tab" style="margin: 7px 0 0 220px;">' + image_mapper_admin_js_data.modal_import_pins + '</a><div class="clear"></div><div id="iconUploadContent" style="width:859px;height:150px;position:absolute;bottom:0px; border-top: 1px solid #DFDFDF;" name="TB_iframeContent427" hspace="0"></div><div id="TB_iframeContentIcon" frameborder="0" class="imapper-custom-img-upload"><div class="imapper-custom-img-wrapper"><button type="button" class="imapper-chose-custom-img-uploader">' + image_mapper_admin_js_data.modal_upload_pin + '</button><div class="imapper-custim-img-preview"></div><label class="imapper-chose-custom-img-label">' + image_mapper_admin_js_data.modal_select_pin_size + '</label><select class="imapper-chose-custom-img-size"></select><button class="imapper-insert-chosen-pin-size" type="button">' + image_mapper_admin_js_data.modal_insert_custom_pin + '</button></div></div></div>');

                //$(".my_upload_image_12").show();
		$('#iconUploadContent').append('<a class="iconImage" style="left:20px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/4/1.png"></div><span>' + image_mapper_admin_js_data.map_pin_string + '</span></a>');
		$('#iconUploadContent').append('<a class="iconImage" style="left:120px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/2/1.png"></div><span>' + image_mapper_admin_js_data.sliding_pin_string + '</span></a>');
		
		$('#iconUploadContent').append('<a class="iconImage" style="left:220px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/3/1.png"></div><span>' + image_mapper_admin_js_data.shadow_pin_string + '</span></a>');
		$('#iconUploadContent').append('<a class="iconImage" style="left:320px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/1/1.png"></div><span>' + image_mapper_admin_js_data.glowing_pin_string + '</span></a>');
		$('#iconUploadContent').append('<a class="iconImage" style="left:420px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/5/purple.png"></div><span>' + image_mapper_admin_js_data.icon_pin_string + '</span></a>');
		$('#iconUploadContent').append('<a class="iconImage" style="left:520px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/6/area_pin.png"></div><span>' + image_mapper_admin_js_data.area_pin_string + '</span></a>');
		$('#iconUploadContent').append('<a class="iconImage" style="left:620px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/7/icon_pin.png"></div><span>' + image_mapper_admin_js_data.tab_pin_string + '</span></a>');
                // New default icons from version 2.8
                $('#iconUploadContent').append('<div class="imapper-new-default-icons-wrapper">' + image_mapper_admin_js_data.new_default_pins_all + '</div>');
	});
        /*
         * Clicked on button "Choose pin icon image" for each active pin option, change individual pin
         */
	$(document).on('click','.my_choose_custom_pin',function(e){
            e.preventDefault();
				
                // Use thickboxId = customIconsContent_1
                $('body').append('<div id="TB_overlay" class="TB_overlayBG"></div><div id="TB_window" style="margin-left: -430px; width: 860px; height: 220px; margin-top: -200px; visibility: visible;"><div id="TB_title"><div id="TB_ajaxWindowTitle" style="padding:0px 10px;">' + image_mapper_admin_js_data.modal_select_your_pin + '</div><div id="TB_closeAjaxWindow"><a id="closeIconUpload" title="' + image_mapper_admin_js_data.modal_close + '" href="#"><div class="tb-close-icon"></div></a></div></div><a id="ourIconsContent" href="#" class="icon-upload-tab" style="margin-top: 7px;">' + image_mapper_admin_js_data.modal_default_pins + '</a><a id="customIconsContent_1" href="#" class="icon-upload-tab" style="margin: 7px 0 0 220px;">' + image_mapper_admin_js_data.modal_import_pins + '</a><div class="clear"></div><div id="iconUploadContent" style="width:859px;height:150px;position:absolute;bottom:0px; border-top: 1px solid #DFDFDF;" name="TB_iframeContent427" hspace="0"></div><div id="TB_iframeContentIcon" frameborder="0" class="imapper-custom-img-upload"><div class="imapper-custom-img-wrapper"><button type="button" class="imapper-chose-custom-img-uploader">' + image_mapper_admin_js_data.modal_upload_pin + '</button><div class="imapper-custim-img-preview"></div><label class="imapper-chose-custom-img-label">' + image_mapper_admin_js_data.modal_select_pin_size + '</label><select class="imapper-chose-custom-img-size"></select><button class="imapper-insert-chosen-pin-size" type="button">' + image_mapper_admin_js_data.modal_insert_custom_pin + '</button></div></div></div>');
                
                //$(".my_upload_image_12").show();
		$('#iconUploadContent').append('<a class="iconImage_1" style="left:20px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/4/1.png"></div><span>' + image_mapper_admin_js_data.map_pin_string + '</span></a>');
		$('#iconUploadContent').append('<a class="iconImage_1" style="left:120px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/2/1.png"></div><span>' + image_mapper_admin_js_data.sliding_pin_string + '</span></a>');
		
		$('#iconUploadContent').append('<a class="iconImage_1" style="left:220px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/3/1.png"></div><span>' + image_mapper_admin_js_data.shadow_pin_string + '</span></a>');
		$('#iconUploadContent').append('<a class="iconImage_1" style="left:320px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/1/1.png"></div><span>' + image_mapper_admin_js_data.glowing_pin_string + '</span></a>');
		$('#iconUploadContent').append('<a class="iconImage_1" style="left:420px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/5/purple.png"></div><span>' + image_mapper_admin_js_data.icon_pin_string + '</span></a>');
		$('#iconUploadContent').append('<a class="iconImage_1" style="left:520px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/6/area_pin.png"></div><span>' + image_mapper_admin_js_data.area_pin_string + '</span></a>');
		$('#iconUploadContent').append('<a class="iconImage_1" style="left:620px;" href="#"><div class="imapper-icon-wrap"><img src="' + pluginUrl + 'images/icons/7/icon_pin.png"></div><span>' + image_mapper_admin_js_data.tab_pin_string + '</span></a>');
                // New default icons from version 2.8
                $('#iconUploadContent').append('<div class="imapper-new-default-icons-wrapper">' + image_mapper_admin_js_data.new_default_pins_single + '</div>');
	});


	
	
	$(document).on('click', '#customIconsContent', function(e) {
		e.preventDefault();

		$('#iconUploadContent').css('display', 'none');
		$('#TB_iframeContentIcon').css('display', 'block');
		
		
		
		thickItem = true;
		thickboxId = '#' + $('#item-icon').attr('id');
		formfield = $(thickboxId + '-input').attr('name');
	});
	$(document).on('click', '#customIconsContent_1', function(e) {
		e.preventDefault();
		if(my_debug_new_12_12){
			
		if(window.console){
			console.log('Choose custom image');
		}
		}
		$('#iconUploadContent').css('display', 'none');
		$('#TB_iframeContentIcon').css('display', 'block');
		
		
		
		thickItem = true;
		thickboxId = 'custom_pin';
		//formfield = $(thickboxId + '-input').attr('name');
	});
	$(document).on('click', '#ourIconsContent', function(e) {
		e.preventDefault();
		
		$('#TB_iframeContentIcon').css('display', 'none');
		$('#iconUploadContent').css('display', 'block');
		
	});
	$(document).on('click', '.iconImage_1', function(e) {
		e.preventDefault();	
		var image=$(this).find('img').attr('src');
		$('.dummy-adapter .my_pin_new_icon_image').attr('src', $(this).find('img').attr('src'));
		if ($('.dummy-adapter .my_pin_new_icon_image').attr('src').indexOf('images/icons/7/icon_pin.png')===-1&&$('.dummy-adapter .my_pin_new_icon_image').attr('src').indexOf('images/icons/1/1.png')===-1){
			$(".dummy-adapter .my_tab_tab_icon_color").hide();
		}else {
			$(".dummy-adapter .my_tab_tab_icon_color").show();
		}
		if ($('.dummy-adapter .my_pin_new_icon_image').attr('src').indexOf('images/icons/5/') < 0)
			$('.dummy-adapter #dummy-imapper-item-pin').attr('value', $(this).find('img').attr('src'));
		else
			$('.dummy-adapter #dummy-imapper-item-pin').attr('value', $(this).find('img').attr('src').substring(0, $(this).find('img').attr('src').indexOf('images/icons/5/')) + 'images/icons/5/1.png');
		iconUploadBehavior_1(image);
		
		$('#TB_overlay').remove();
		$('#TB_window').remove();	
		
	});
	$(document).on('click', '.iconImage', function(e) {
		e.preventDefault();	
		
		$('#item-icon').attr('src', $(this).find('img').attr('src'));
		if ($('#item-icon').attr('src').indexOf('images/icons/7/icon_pin.png')===-1&&$('#item-icon').attr('src').indexOf('images/icons/1/1.png')===-1){
			$("#my_tab_pin_color").hide();
		}else {
			$("#my_tab_pin_color").show();
		}
		if ($('#item-icon').attr('src').indexOf('images/icons/5/') < 0)
			$('#item-icon-input').attr('value', $(this).find('img').attr('src'));
		else
			$('#item-icon-input').attr('value', $(this).find('img').attr('src').substring(0, $(this).find('img').attr('src').indexOf('images/icons/5/')) + 'images/icons/5/1.png');
		
		iconUploadBehavior();
		
		$('#TB_overlay').remove();
		$('#TB_window').remove();	
	});

	
	$(document).on('click', '#closeIconUpload', function(e) {
		$('#TB_overlay').remove();
		$('#TB_window').remove();	
	});
	
	// item images
	$(document).on('click', '.tsort-start-item', function(e) {
		$('.tsort-start-item').attr('checked', false);
		$(this).attr('checked', 'checked');
	});
	
	// ----------------------------------------
	
        /* ===================================================================*/
        /* Ajax submit, save imapper settings
        /* ===================================================================*/
	my_working_saving=false;
	$('#save-timeline').click(function(e){
		e.preventDefault();
		if(my_working_saving){
			//my_admin_debug("Clicked saving new woomaper");
			return;
		}
		if($(".dummy-adapter").not('.closed').length>0){
			alert(image_mapper_admin_js_data.close_all_pin_tabs);
			return;
		}
		my_working_saving=true;
		
	
		$('#sort' + itemClicked + '-imapper-item-title').attr('value', $('#dummy-imapper-item-title').attr('value'));
		$('#sort' + itemClicked + '-imapper-item-content').attr('value', $('#dummy-imapper-item-content').attr('value'));
		$('#sort' + itemClicked + '-imapper-item-open-position').find('option').eq($('#dummy-imapper-item-open-position').prop('selectedIndex')).attr('selected', 'selected');
		$('#sort' + itemClicked + '-imapper-item-pin-color').attr('value', $('#dummy-imapper-item-pin-color').attr('value'));
		$('#sort' + itemClicked + '-imapper-item-picture').attr('value', $('#dummy-imapper-item-picture').attr('value'));
		$('#sort' + itemClicked + '-imapper-item-category').attr('value', $('#dummy-imapper-item-category').attr('value'));
		$('#sort' + itemClicked + '-imapper-item-link').attr('value', $('#dummy-imapper-item-link').attr('value'));
		$('#sort' + itemClicked + '-imapper-item-click-action').find('option').eq($('#dummy-imapper-item-click-action').prop('selectedIndex')).attr('selected', 'selected');
		$('#sort' + itemClicked + '-imapper-item-hover-action').find('option').eq($('#dummy-imapper-item-hover-action').prop('selectedIndex')).attr('selected', 'selected');

		$('#sort' + itemClicked + '-imapper-border-color').attr('value', $('#dummy-imapper-border-color').val());
		$('#sort' + itemClicked + '-imapper-border-width').attr('value', $('#dummy-imapper-border-width').val());
		$('#sort' + itemClicked + '-imapper-border-radius').attr('value', $('#dummy-imapper-border-radius').val());
		$('#sort' + itemClicked + '-imapper-area-width').attr('value', $('#dummy-imapper-border-area-width').val());
		$('#sort' + itemClicked + '-imapper-area-height').attr('value', $('#dummy-imapper-border-area-height').val());

		
		
		for (var i = 2; i <= numberOfTabs[itemClicked]; i++)
			$('#sort' + itemClicked + '-imapper-item-content-' + i).attr('value', $('#dummy-imapper-item-content-' + i).attr('value'));

			document.getElementById('hidden-map-overlay').disabled = false;
  			document.getElementById('hidden-blur-effect').disabled = false;
  			document.getElementById('hidden-slide-animation').disabled = false;
  			document.getElementById('hidden-lightbox-gallery').disabled = false;
  			document.getElementById('hidden-categories').disabled = false;
  			document.getElementById('hidden-show-all-category').disabled = false;
  			

		if(document.getElementById('map-overlay').checked){
  			document.getElementById('hidden-map-overlay').disabled = true;
		}
		if(document.getElementById('blur-effect').checked){
  			document.getElementById('hidden-blur-effect').disabled = true;
		}
		if(document.getElementById('slide-animation').checked){
  			document.getElementById('hidden-slide-animation').disabled = true;
		}
		if(document.getElementById('lightbox-gallery').checked){
  			document.getElementById('hidden-lightbox-gallery').disabled = true;
		}
		if(document.getElementById('categories').checked){
  			document.getElementById('hidden-categories').disabled = true;
		}
		if(document.getElementById('show-all-category').checked){
  			document.getElementById('hidden-show-all-category').disabled = true;
		}
	

		var imageWidth = jQuery('#map-image').width();
		var imageHeight = jQuery('#map-image').height();
		var imageWidthOriginal = document.getElementById('map-image').naturalWidth;
		var imageHeightOriginal = document.getElementById('map-image').naturalHeight;


		$('input[id$=imapper-area-width]').each(function(){
			var pinWidth = $(this).attr('value');
			var correctPinWidth = pinWidth * imageWidthOriginal / imageWidth;
			 $(this).siblings('.imapper-area-width-normalized').attr('value',correctPinWidth);
		});

		$('input[id$=imapper-area-height]').each(function(){
			var pinHeight = $(this).attr('value');
			var correctPinHeight = pinHeight * imageHeightOriginal / imageHeight;
			 $(this).siblings('.imapper-area-height-normalized').attr('value',correctPinHeight);
		});

		$('input[id$=imapper-item-x]').each(function(){
			var pinX = parseFloat($(this).attr('value'));
			var correctPinX = pinX *  imageWidth / imageWidthOriginal;
			 $(this).siblings('.imapper-item-x-normalized').attr('value',correctPinX+'%');
		});

		$('input[id$=imapper-item-y]').each(function(){
			var pinY = parseFloat($(this).attr('value'));
			var correctPinY = pinY *  imageHeight / imageHeightOriginal;
			 $(this).siblings('.imapper-item-y-normalized').attr('value',correctPinY+'%');
		});
		
		$('#save-loader').show();
		$.ajax({
			type:'POST', 
			url: 'admin-ajax.php', 
			data:'action=mapper_save&' + $('#post_form').serialize(), 
			success: function(response) {
                            $('#image_mapper_id').val(response);
                            $('#save-loader').hide();

                            /*
                             * Newly created iMapper, won't have id param in url, so on refreash won't load created iMapper
                             * If no id param in url add it and refreash page
                             * @since 2.8
                             */
                            var urlParamId = getParameterByName('id');
                            if ( !urlParamId ) {
                                window.location.href = window.location.href + '&id=' + response;
                            }

                            my_working_saving=false;
			},error:function(){
                            my_working_saving=false;
			}
		});
	});
	
	$('#preview-timeline').click(function(e){
		e.preventDefault();
		/**
		 * Moj novi preview
		 */
		var my_id=$("#image_mapper_id").val();
		if((my_id=='')||(typeof my_id=='undefined')){
			alert(image_mapper_admin_js_data.save_imapper_first);
			return;
		}
		$('body').append('<div id="TB_overlay" class="TB_overlayBG"></div><div id="TB_window" style="width: 960px; height: 500px; margin-top: -250px; visibility: visible; margin-left: -480px;"><div id="TB_title"><div id="TB_ajaxWindowTitle">' + image_mapper_admin_js_data.preview_string + '</div><div id="TB_closeAjaxWindow"><a id="TBct_closeWindowButton" title="' + image_mapper_admin_js_data.modal_close + '" href="#"><div class="tb-close-icon"></div></a></div></div></div>');
		var my_url=url+'pages/my-preview.php?my_preview=1&my_id='+my_id;
		var frontHtml='<iframe src="'+my_url+'" style="width:100%;height:100%;overflow-y:auto;"></iframe>';
		$('#TB_window').append(frontHtml);
		
		$('#TBct_closeWindowButton').click(function(ev){
			ev.preventDefault();
			$('#TB_overlay').remove();
			$('#TB_window').remove();
		});
		/**
		 * 
		 */
		
		itemClicked = itemIsClicked(itemClicked, itemClicked);
		return;
			var pinHeight = -$('.imapper-pin').height();
			var pinWidth =	-($('.imapper-pin').width())/2;

			var mapWidth = $('#map-image').width();
			var mapHeight = $('#map-image').height();
		
		var id = ($('#image_mapper_id').attr('value') != '') ? $('#image_mapper_id').attr('value') : '1';
		var font = $('#item-font-type').val();
		font = font.replace('+', ' ');
		
		$('body').append('<div id="TB_overlay" class="TB_overlayBG"></div><div id="TB_window" style="width: 960px; height: 500px; margin-top: -250px; visibility: visible; margin-left: -480px;"><div id="TB_title"><div id="TB_ajaxWindowTitle">' + image_mapper_admin_js_data.preview_string + '</div><div id="TB_closeAjaxWindow"><a id="TBct_closeWindowButton" title="' + image_mapper_admin_js_data.modal_close + '" href="#"><div class="tb-close-icon"></div></a></div></div></div>');
		
		var frontHtml = '';
		
		if ($('#map-image').attr('src').indexOf('images/no_image.jpg') < 0)
		{
		
		if ($('#item-font-type').val() != 'def')
			frontHtml += '<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=' + $('#item-font-type').val() + '">';
		frontHtml +='<style type="text/css"> .imapper' + id + '-categories-wrapper .imapper-category-button  {'+
		'color:'+$('#category-font-color').val()+';'+
		'background-color:'+$('#category-bckg-color').val()+';'+
	'}'+

	'.imapper' + id + '-categories-wrapper .imapper-category-arrow-bottom {'+
		'border-color:'+$('#category-bckg-color').val()+' transparent;'+
	'}'+

	'.imapper' + id + '-categories-wrapper .imapper-category-active .imapper-category-arrow-bottom {'+
	'	border-color:'+$('#category-bckg-active-color').val()+' transparent;'+
	'}'+

	'.imapper'  + id + '-categories-wrapper .imapper-category-active .imapper-category-button  {'+
	'	background-color:'+$('#category-bckg-active-color').val()+';'+
	'	color:'+$('#category-font-active-color').val()+';'+
	'}'+
	'</style>';
		frontHtml += '<div id="imagemapper' + id + '-wrapper" style="visibility: hidden; position:relative; margin: 0 auto;">'
		+	'<div id="imapper' + id + '-values" style="display: none">'
		+		'<div id="imapper' + id + '-value-item-open-style">' + $('#item-open-style').val() + '</div>'
		+	'</div>'
		+	'<img id="imapper' + id + '-map-image" style="max-width: 100%; max-height: 473px;" src="' + $('#map-image').attr('src') + '" />';
	

		$('.imapper-sortable-real').each(function() {
			var num = $(this).attr('id').substring(17);
	 		var count = 2;

			frontHtml += '<div id="imapper' + id + '-pin' + num + '-wrapper" class="imapper' + id + '-pin-wrapper imapper-pin-wrapper" data-open-position="'+ $('#sort'+num+'-imapper-item-open-position :selected').val() +'" data-left="' + $('#sort' + num + '-imapper-item-x').attr('value') + '" data-pin-color="" data-top="' + $('#sort' + num + '-imapper-item-y').attr('value') + '" data-pin-color="'+$('#sort'+num+'-imapper-item-pin-color').val()+'" data-category="'+$('#sort'+num+'-imapper-item-category').val()+'" data-imapper-link="'+$('#sort'+num+'-imapper-item-link').val()+'" '+( ( $('#sort'+num+'-imapper-item-click-action :selected').val() != 'default') ? ' data-imapper-click-action="'+$('#sort'+num+'-imapper-item-click-action :selected').val()+'" ' : '' )+( ( $('#sort'+num+'-imapper-item-hover-action :selected').val() != 'default') ? ' data-imapper-hover-action="'+$('#sort'+num+'-imapper-item-hover-action :selected').val()+'" ' : '' )+' style="position: absolute;" >';

			if ($('#item-icon').attr('src').indexOf('images/icons/6/') >= 0)
			frontHtml +='<div id="imapper' + id + '-pin' + num + '" class="imapper' + id + '-pin imapper-pin imapper-area-pin pin-style" style="width:'+$('#sort' + num + '-imapper-area-width-normalized').attr('value')+'px;height:'+$('#sort' + num + '-imapper-area-height-normalized').attr('value')+'px;border:'+$('#sort' + num + '-imapper-border-width').attr('value')+'px solid '+$('#sort' + num + '-imapper-border-color').attr('value')+';background:' + $(this).find('.imapper-item-pin-color').attr('value') + ';" ></div>';
		else if ($('#item-icon').attr('src').indexOf('images/icons/7/') >= 0)
			frontHtml +='<span id="imapper' + id + '-pin' + num + '" class="imapper' + id + '-pin iMapper-pin-1 imapper-pin pin-style" style="color: ' + $(this).find('.imapper-item-pin-color').attr('value') + ';"></span>';
		else {
		
			
			frontHtml +='<img id="imapper' + id + '-pin' + num + '" class="imapper' + id + '-pin" src="' + $('#item-icon-input').attr('value') + '" style="position:absolute;left:'+pinWidth+'px;top:'+pinHeight+'px;">';
		}
			
				
			if ($('#item-icon').attr('src').indexOf('images/icons/5/') >= 0)				
				frontHtml +=		'<div id="imapper' + id + '-pin' + num + '-color" class="imapper-pin-color" style="background-color: ' + $(this).find('.imapper-item-pin-color').attr('value') + ';"></div>'
									+ '<i id="imapper' + id + '-pin' + num + '-icon" class="imapper-pin-icon fawesome icon-large ' + $(this).find('.imapper-item-picture').attr('value') + '"></i>';
									
			if ($('#item-icon').attr('src').indexOf('images/icons/3/') >= 0)
				frontHtml +=		'<img id="imapper' + id + '-pin' + num + '" class="imapper-pin-shadow" src="' + $('#item-icon-input').attr('value').substring(0, $('#item-icon-input').attr('value').indexOf('/icons/3/') + 9) + '1-1.png'  + '">';
				
				frontHtml +=		'<div id="imapper' + id + '-pin' + num + '-content-wrapper" class="imapper' + id + '-pin-content-wrapper imapper-content-wrapper" style="color: ' + $('#item-font-color').attr('value') + ';">'
									+	'<div id="imapper' + id + '-pin' + num + '-content" class="imapper-content" style="background-color: ' + $('#item-back-color').attr('value') + '; border-color: ' + $('#item-border-color').attr('value') + '; border-radius: ' + $('#item-border-radius').attr('value') + 'px; width: ' + $('#item-width').attr('value') + 'px; height: ' + $('#item-height').attr('value') + 'px; font-family: &quot;' + font + '&quot;; font-size: ' + $('#item-font-size').attr('value') + 'px;"><p class="imapper-content-header" style="font-size: ' + $('#item-header-font-size').attr('value') + 'px !important;">' + $('#sort' + num + '-imapper-item-title').attr('value') + '</p><div class="imapper-content-text">' + $('#sort' + num + '-imapper-item-content').attr('value') + '</div></div>';
				
						
			if ($(this).find('.textarea-additional').length > 0)
			{
				frontHtml += 			'<div id="imapper' + id + '-pin' + num + '-content-tab" class="imapper-content-tab" style="background-color: ' + $('#item-back-color').attr('value') + ';"><a href="#">1</a></div>';
				
				$(this).find('.textarea-additional').each(function() {
					frontHtml += 		'<div id="imapper' + id + '-pin' + num + '-content-' + count + '" class="imapper-content imapper-content-additional" style="background-color: ' + $('#item-back-color').attr('value') + '; border-color: ' + $('#item-border-color').attr('value') + '; border-radius: ' + $('#item-border-radius').attr('value') + 'px; width: ' + $('#item-width').attr('value') + 'px; height: ' + $('#item-height').attr('value') + 'px; font-family: &quot;' + font + '&quot;; font-size: ' + $('#item-font-size').attr('value') + 'px;"><div class="imapper-content-header" style="font-size: ' + $('#item-header-font-size').attr('value') + 'px !important;">' + $('#sort' + num + '-imapper-item-title').attr('value') + '</div><div class="imapper-content-text">' + $(this).attr('value') + '</div></div>';
					frontHtml +=		'<div id="imapper' + id + '-pin' + num + '-content-' + count + '-tab" class="imapper-content-tab" style="background-color: ' + $('#item-back-color').attr('value') + ';"><a href="#">' + count + '</a></div>';
					count++;
				});
				
			}
			
			frontHtml +=			'<div class="imapper-arrow" style="border-color: ' + $('#item-back-color').attr('value') + ' transparent transparent transparent;"></div>';
			
			if ($('#item-icon').attr('src').indexOf('images/icons/2/') < 0)
				frontHtml +=		'<div class="arrow-' + $('#sort' + num + '-imapper-item-open-position').val() + '-border"></div>';
			else
				frontHtml +=		'<div class="triangle-' + $('#sort' + num + '-imapper-item-open-position').val() + '-border"></div>';
			
			frontHtml +=			'</div><div id="imapper' + id + '-value-item' + num + '-open-position" class="imapper' + id + '-value-item-open-position" style="display:none;">' + $('#sort' + num + '-imapper-item-open-position').val() + '</div>';
				
			var tabStyle;				
			if (count > 2)
				tabStyle = 'display: block; width: 16px; height: 16px; border-radius: 8px; border: 1px solid #191970; background-color: #4f92d3; color: white; font-size: 10px; line-height: 1.4; text-align: center; position: absolute; top: -100px; left: -10px; z-index: 10;';
			else
				tabStyle = 'display: none;';
								
			frontHtml +=		'<div id="imapper' + id + '-value-item' + num + '-tab-number" class="imapper-value-tab-number" style="' + tabStyle + '">' + (count - 1) + '</div>'
							+	'<div id="imapper' + id + '-value-item' + num + '-border-color" class="imapper-value-border-color" style="display: none;">' + $('#item-border-color').attr('value') + '</div>'
						  + '</div>';
		});

		frontHtml += '</div>';

		frontHtml += '<script type="text/javascript" src="' + url + 'js/frontend/jquery.image_mapper.js"></script>';
		frontHtml += '<script type="text/javascript" src="' + url + 'js/frontend/jquery.prettyPhoto.js"></script>';
		
		frontHtml += '<script type="text/javascript">(function($) { $(window).load(function() {$("#imagemapper' + id + 'wrapper").imageMapper({});});})(jQuery);</script>';

		$('#TB_window').append(frontHtml);
		//$('#TB_window').append('<script type="text/javascript" src="' + url + 'js/preview.js"></script>');
		$('#TB_window').find('#imagemapper' + id + '-wrapper').css('width', $('#imapper' + id + '-map-image').width());
		$('#TB_window').find('#imagemapper' + id + '-wrapper').css('visibility', 'visible');

		var mapPreviewWidth = $('#imapper' + id + '-map-image').width();
		var mapPreviewHeight = $('#imapper' + id + '-map-image').height();

		$('.imapper' + id + '-pin').each(function(){
			var areaPinWidthPreview = $(this).width();
			var areaPinHeightPreview = $(this).height();
			var newAreaPinWidthPreview = areaPinWidthPreview*mapPreviewWidth/mapWidth;
			var newAreaPinHeightPreview = areaPinHeightPreview*mapPreviewHeight/mapHeight;
			$(this).width(areaPinWidthPreview*mapPreviewWidth/mapWidth);
			$(this).height(areaPinHeightPreview*mapPreviewHeight/mapHeight);
			$(this).css({'width':newAreaPinWidthPreview+'px','height':newAreaPinHeightPreview+'px','left':(-newAreaPinWidthPreview/2)+'px','top':(-newAreaPinWidthPreview)+'px',})

		});
		
		}
			
		$('#TBct_closeWindowButton').click(function(ev){
			ev.preventDefault();
			$('#TB_overlay').remove();
			$('#TB_window').remove();
		});
	});

    /* =========================================*/
    /* Duplicate pin 
    /* @since Version 2.8
    /* =========================================*/
    var imapperDuplicatePinStart = false;
    
    $(document).on('click', '.imapper-duplicate-pin', function(e){
        e.preventDefault();
        
        if ( imapperDuplicatePinStart === false ) {

            // Disable multiple call to duplicate button
            imapperDuplicatePinStart = true; 

            var clickedSortableItem = $(e.target).parents('.imapper-sortableItem');
            var clickedItemHeader = clickedSortableItem.find('.imapper-sort-header');

            // Add loader behaivor
            clickedSortableItem.addClass('imapper-duplicating');

            // Wait for dummy adapter to open, or make sure it is opened before calling duplication
            setTimeout(function(){

                var clickedDummyAdapter = clickedSortableItem.find('.dummy-adapter');

                // If opened duplicate
                if ( ! clickedDummyAdapter.hasClass('closed') ) {
                    imapperDuplicatePinReplaceData(clickedSortableItem);
                } else {

                    // Open dummy adapter
                    clickedItemHeader.trigger('click');

                    // Wait untill dummy adapter is opened and then call duplicate function
                    setTimeout(function(){
                        imapperDuplicatePinReplaceData(clickedSortableItem);
                    }, 100);

                }

            }, 100); 
        
        }

    });

    function imapperDuplicatePinReplaceData(clickedSortableItem) {
        
        var clickedItemHeader = clickedSortableItem.find('.imapper-sort-header');
        var clickedDummyAdapter = clickedSortableItem.find('.dummy-adapter');
        
        // Add loader behaivor to .dummy-adapter
        clickedDummyAdapter.css('height', clickedDummyAdapter.height());
        
        // Set tabs number to clone all content tabs from pin that is beeing duplicated
        duplicatedPinTabsNo = clickedSortableItem.find('#li-item-content').find('textarea').length;
        
        // Close dummy adapter, it will be open when this function is called
        clickedItemHeader.trigger('click');
        
        // Wait untill closed
        setTimeout(function(){
        
            // Add pin to te right bottom of the map
            $('#map-image').trigger("click");
            duplicatedPinTabsNo = false;

            // Wait after element from simulated click is placed on map
            setTimeout(function(){

                // New created pin vars
                var duplicatedPinId = $('.imapper-added-pin').attr('id').replace('-mapper-pin', '');
                var duplicatedPinWrapper = $('#' + duplicatedPinId + '-mapper-pin-wrapper');
                var duplicatedPinImage = duplicatedPinWrapper.find('.imapper-pin');

                // Get id of pin to duplicate location on map and dummy adapter data
                var fromPinId = clickedSortableItem.attr('id');

                // Get object of pin to duplicate style for loaction on map. Get from pin image also
                var fromPinWrapper = $('#' + fromPinId + '-mapper-pin-wrapper');

                // Get real adapter which is hidden below active pins and duplicate stored data
                var fromPinRealAdatperHtml = $('#imapper-sortable-' + fromPinId.replace('sort', '')).html();


                // Wait untill gather data and then change all, need 500ms with all timeouts
                setTimeout(function(){

                    // Position new pin on the same location as the one that is duplicated from
                    duplicatedPinWrapper.attr('style', fromPinWrapper.attr('style'));

                    // Replace duplicated pin image or html in case of custom image, title also
                    duplicatedPinWrapper.html( fromPinWrapper.html().split(fromPinId).join(duplicatedPinId) );
                    
                    // Mark duplicated pin with badge "duplicated" and remove it from other pins if any
                    $('.imapper-sortableItem').removeClass('imapper-duplicated-pin');
                    $('li#' + duplicatedPinId).addClass('imapper-duplicated-pin');

                    setTimeout(function(){
                        // Dummy adapter values change

                       // var duplicatedPinDummyAdapter = $('#' + 'imapper-' + duplicatedPinId + '-header').parent('.imapper-sortableItem').find('.dummy-adapter');
                        var duplicatedPinRealAdatper = $('#imapper-sortable-' + duplicatedPinId.replace('sort', ''));

                        // Replace real adapter html with change of id in all occurences
                        duplicatedPinRealAdatper.html( fromPinRealAdatperHtml.split(fromPinId).join(duplicatedPinId) );

                    }, 100);

                }, 100);

                // Reopen clicked active pin to load settings, previous set to closed.This is important to avoid bugs
                clickedSortableItem.find('.imapper-sort-header').trigger('click');
                
                // Remove loader behaivor
                clickedSortableItem.removeClass('imapper-duplicating');
                // Remove loader behaivor to .dummy-adapter
                clickedDummyAdapter.css('height', 'auto');
                // Enable duplicate button
                imapperDuplicatePinStart = false; 

            }, 100);
        
        }, 100);

    }
	
});

//imapper admin select click event {
	$(document).on('click','.wrap.imapper-admin-wrapper select',function(){
		//console.log($(this));
		// var select = $(this).parent();
		$(this).siblings('span').text($(this).children(":selected").text());
	});


//funkcija koja menja kliknute vrednosti
function itemIsClicked(clicked, prevClicked) {
	if(my_debug_new_12_12){
		
	if(window.console){
		console.log('itemIsClicked',{c:clicked,prev:prevClicked});
	}
	}
		if (prevClicked > 0)
	{
		var my_color_12=$(".dummy-adapter #item-back-color").val();
		var my_image_12=$(".dummy-adapter #dummy-imapper-item-pin").val();
		if(my_debug_new_12_12){
			
		if(window.console){
			console.log('prev clicked itemIsClicked '+prevClicked,{color:my_color_12,image:my_image_12});
			console.log('Saving images',{my_color_12:my_color_12,my_image_12:my_image_12});
		}	
		}
		if(typeof my_color_12!='undefined'){
			$("#sort"+prevClicked+"-item-my-tab-pin-new-color").val($(".dummy-adapter #item-back-color").val());
		}
		if(typeof my_image_12 !='undefined'){
			$("#sort"+prevClicked+"-imapper-item-new-pin").val($(".dummy-adapter #dummy-imapper-item-pin").val());
		}
		$('#sort' + prevClicked + '-imapper-item-title').attr('value', $('#dummy-imapper-item-title').attr('value'));
		$('#sort' + prevClicked + '-imapper-item-content').attr('value', $('#dummy-imapper-item-content').attr('value'));
		$('#sort' + prevClicked + '-imapper-item-content').html($('#dummy-imapper-item-content').attr('value'));
		
		$('#sort' + prevClicked + '-imapper-item-pin-color').attr('value', $('#dummy-imapper-item-pin-color').attr('value'));
		/**
		 * Tab color added dragan 4.4.2015
		 */
		//$('#sort' + prevClicked + '-my-imapper-item-pin-color').attr('value', $('#dummy-my-imapper-item-pin-color').attr('value'));
		/**
		 * end changes
		 */
		
		$('#sort' + prevClicked + '-imapper-item-picture').attr('value', $('#dummy-imapper-item-picture').attr('value'));

		$('#sort' + prevClicked + '-imapper-item-category').attr('value', $('#dummy-imapper-item-category').attr('value'));
		$('#sort' + prevClicked + '-imapper-item-link').attr('value', $('#dummy-imapper-item-link').attr('value'));
		
		$('#sort' + prevClicked + '-mapper-pin-delete').css('display', 'none');

		$('#sort' + prevClicked + '-imapper-border-color').attr('value', $('#dummy-imapper-border-color').attr('value'));
		$('#sort' + prevClicked + '-imapper-border-width').attr('value', $('#dummy-imapper-border-width').attr('value'));
		$('#sort' + prevClicked + '-imapper-border-radius').attr('value', $('#dummy-imapper-border-radius').attr('value'));
		$('#sort' + prevClicked + '-imapper-area-width').attr('value', $('#dummy-imapper-area-width').attr('value'));
		$('#sort' + prevClicked + '-imapper-area-height').attr('value', $('#dummy-imapper-area-height').attr('value'));


		$('#sort' + prevClicked + '-imapper-item-open-position').find('option').each(function(){
			$(this).removeAttr('selected');	
		});

		var selected = 0;
		$('#dummy-imapper-item-open-position').find('option').each(function(index) {
			if ($(this).attr('selected') == 'selected')
				selected = index;
		});
		
		$('#sort' + prevClicked + '-imapper-item-open-position').find('option').eq(selected).attr('selected', 'selected');


		
		
		var selected = 0;
		$('#dummy-imapper-item-click-action').find('option').each(function(index) {
			if ($(this).attr('selected') == 'selected')
				selected = index;
		});
		
		$('#sort' + prevClicked + '-imapper-item-click-action').find('option').eq(selected).attr('selected', 'selected');


		
		
		var selected = 0;
		$('#dummy-imapper-item-hover-action').find('option').each(function(index) {
			if ($(this).attr('selected') == 'selected')
				selected = index;
		});
		
		$('#sort' + prevClicked + '-imapper-item-hover-action').find('option').eq(selected).attr('selected', 'selected');


		
		for (var i = 2; i <= numberOfTabs[prevClicked]; i++)
		{
			$('#sort' + prevClicked + '-imapper-item-content-' + i).attr('value', $('#dummy-imapper-item-content-' + i).attr('value'));
			$('#sort' + prevClicked + '-imapper-item-content-' + i).html($('#dummy-imapper-item-content-' + i).attr('value'));
		}
	}
		
	$('.imapper-sort-header').each( function() {
		$(this).removeAttr('style');
	});
	
	$('img#sort' + prevClicked + '-mapper-pin').css('border', 'none');
	$('img#sort' + clicked + '-mapper-pin').css('border', '1px dashed #ffffff');
	
	$('#imapper-sort' + clicked + '-header').css('background-image', 'none');
	$('#imapper-sort' + clicked + '-header').css('background-color', 'rgb(200, 200, 200)');
	
	/**
	 * Dragan added new parameter for pin tab color
	 */
	//$('#dummy-my-imapper-item-pin-color').attr('value',$("#sort"+clicked+"-my-imapper-item-pin-color"));
	/**
	 * end changes
	 */
	$('#sort' + clicked + '-mapper-pin-delete').css('display', 'block');
	
	
	var my_color_12=$("#sort"+clicked+"-item-my-tab-pin-new-color").val();
	var my_image_12=$("#sort"+clicked+"-imapper-item-new-pin").val();
	if(typeof my_color_12!='undeifned' && my_color_12!=''){
		$("#item-back-color").val(my_color_12);
	}
	/**
	 * Show hide tab color
	 */
	if(typeof my_image_12=='undefined'){
		my_image_12=='';
		$(".my_tab_tab_icon_color").hide();
		$(".my_remove_custom_pin").hide();
		//$(".dummy-adapter #item-back-color").val('');
		$(".dummy-adapter #dummy-imapper-item-pin").val('');
		
		
	}else if(my_image_12==''){
		$(".my_tab_tab_icon_color").hide();
		$(".my_remove_custom_pin").hide();
		$(".dummy-adapter #dummy-imapper-item-pin").val('');
		
	}else {
		$(".my_remove_custom_pin").show();
		if (my_image_12.indexOf('images/icons/7/icon_pin.png')===-1&&my_image_12.indexOf('images/icons/1/1.png')===-1){
			$(".my_tab_tab_icon_color").hide();
		}else {
			$(".my_tab_tab_icon_color").show();
			var pre_val=$(".dummy-adapter #item-back-color").val();
			if(pre_val==''){
				$(".dummy-adapter #item-back-color").val('#000000');
			}
		}
		//$(".my_tab_tab_icon_color").show();
		
	}
	
	/**
	 * end show hide tab color
	 */
	if(my_debug_new_12_12){
		
	if(window.console){
		console.log('dummy adapter '+clicked,{color:my_color_12,image:my_image_12});
	}
	}
	var my_image_12_12_12=$("#sort"+clicked+"-imapper-item-new-pin").val();
	//var my_image_12_12_12_12=$("#sort"+clicked+"-imapper-item-new-pin").val();
	
	$("#item-back-color").val($("#sort"+clicked+"-item-my-tab-pin-new-color").val());
	if(typeof my_image_12_12_12 !='undefined'){
		if(my_image_12_12_12.indexOf('images/icons/5/1.png')!==-1){
			var my_image_12_12_12_new=my_image_12_12_12.substring(0, my_image_12_12_12.indexOf('images/icons/5/')) + 'images/icons/5/purple.png';
			$(".my_pin_new_icon_image").attr('src',my_image_12_12_12_new);
			$("#dummy-imapper-item-pin").val(my_image_12_12_12);	
		}else if(my_image_12_12_12.indexOf('images/icons/5/purple.png')!==-1){
			var my_image_12_12_12_new=my_image_12_12_12.substring(0, my_image_12_12_12.indexOf('images/icons/5/')) + 'images/icons/5/1.png';
			$(".my_pin_new_icon_image").attr('src',my_image_12_12_12);
			$("#dummy-imapper-item-pin").val(my_image_12_12_12_new);	
	
		}else {
			$(".my_pin_new_icon_image").attr('src',my_image_12_12_12);
			$("#dummy-imapper-item-pin").val(my_image_12_12_12);	
	
		}
	}
	/*if ($('#item-icon').attr('src').indexOf('images/icons/5/') < 0)
		$('#item-icon-input').attr('value', $(this).find('img').attr('src'));
	else
		$('#item-icon-input').attr('value', $(this).find('img').attr('src').substring(0, $(this).find('img').attr('src').indexOf('images/icons/5/')) + 'images/icons/5/1.png');
	*/
	
	
		
	$('#dummy-imapper-item-title').attr('value', $('#sort' + clicked + '-imapper-item-title').attr('value'));
	$('#dummy-imapper-item-content').attr('value', $('#sort' + clicked + '-imapper-item-content').attr('value'));
	$('#dummy-imapper-item-content').html($('#sort' + clicked + '-imapper-item-content').html());

	$('#dummy-imapper-item-category').attr('value', $('#sort' + clicked + '-imapper-item-category').attr('value'));
	$('#dummy-imapper-item-link').attr('value', $('#sort' + clicked + '-imapper-item-link').attr('value'));

	$('#dummy-imapper-border-color').css('background-color',$('#sort' + clicked + '-imapper-border-color').attr('value')).attr('value', $('#sort' + clicked + '-imapper-border-color').attr('value'));
	$('#dummy-imapper-border-width').attr('value', $('#sort' + clicked + '-imapper-border-width').attr('value'));
	$('#dummy-imapper-border-radius').attr('value', $('#sort' + clicked + '-imapper-border-radius').attr('value'));
	$('#dummy-imapper-area-width').attr('value', $('#sort' + clicked + '-imapper-area-width').attr('value'));
	$('#dummy-imapper-area-height').attr('value', $('#sort' + clicked + '-imapper-area-height').attr('value'));
	$('#dummy-imapper-fill-color').prop('checked',$('#sort' + clicked + '-imapper-fill-color').is(':checked'));

	
	$('#dummy-imapper-item-pin-color').attr('value', $('#sort' + clicked + '-imapper-item-pin-color').attr('value'));
	$('#dummy-imapper-item-pin-color').css('background-color', $('#sort' + clicked + '-imapper-item-pin-color').attr('value'));
	$('#dummy-imapper-item-picture').attr('value', $('#sort' + clicked + '-imapper-item-picture').attr('value'));
	$('#dummy-imapper-pin-icon').removeClass();
	$('#dummy-imapper-pin-icon').addClass('fa');
	$('#dummy-imapper-pin-icon').addClass('icon-2x');
	$('#dummy-imapper-pin-icon').addClass($('#dummy-imapper-item-picture').attr('value'));
	
	$('#dummy-imapper-item-open-position').find('option').each(function(){
		$(this).removeAttr('selected');	
	});

	$('#dummy-imapper-item-click-action').find('option').each(function(){
		$(this).removeAttr('selected');	
	});

	$('#dummy-imapper-item-hover-action').find('option').each(function(){
		$(this).removeAttr('selected');	
	});
	
	var selected2 = 0;
	$('#sort' + clicked + '-imapper-item-open-position').find('option').each(function(index) {
		if ($(this).attr('selected') == 'selected')
			selected2 = index;
	});
	$('#dummy-imapper-item-open-position').find('option').eq(selected2).attr('selected', 'selected');

	
	$('#sort' + clicked + '-imapper-item-click-action').find('option').each(function(index) {
		if ($(this).attr('selected') == 'selected')
			selected2 = index;
	});
	$('#dummy-imapper-item-click-action').find('option').eq(selected2).attr('selected', 'selected');

	
	$('#sort' + clicked + '-imapper-item-hover-action').find('option').each(function(index) {
		if ($(this).attr('selected') == 'selected')
			selected2 = index;
	});
	$('#dummy-imapper-item-hover-action').find('option').eq(selected2).attr('selected', 'selected');
        
	for (var i = 2; i <= numberOfTabs[prevClicked]; i++)
		$('#dummy-imapper-item-content-' + i).remove();	   
	for (var i = 2; i <= numberOfTabs[clicked]; i++)
		$('#li-item-content').append('<textarea class="textarea-additional" rows="6" style="width: 230px; resize: none;" id="dummy-imapper-item-content-' + i + '" name="dummy-imapper-item-content-' + i + '" value="' + $('#sort' + clicked + '-imapper-item-content-' + i).attr('value') + '" type="text" >' + $('#sort' + clicked + '-imapper-item-content-' + i).html() + '</textarea>');
	
	adjustOptionsDummyAdapter(clicked,my_image_12);
	return clicked;
}

/* =========================================================*/
/* Set options when clicked on active pins settings.
 * Create all options in Dummy adapter
 * Set options from hidden php div with predefined settings
/* ==========================================================*/
function adjustOptionsDummyAdapter(pin_id,image){
	if(typeof image=='undefined' || image=='' ){
		image=$('#item-icon').attr('src');
	}
	if (image.indexOf('images/icons/1/') < 0&&image.indexOf('images/icons/7/') < 0){
		$("#sort"+pin_id+" .textarea-additional").remove();
	}
	if(my_debug_new_12_12){
			
	if(window.console){
		console.log('Adjust dummy adapter',{pin_id:pin_id,image:image});
	}
	}
	//remove all options
	/*$('.imapper-sortable-real').each(function() {
		if ($(this).find('option').length == 2)
		{
			$(this).find('select').append('<option value="top">' + image_mapper_admin_js_data.select_option_top + '</option>');
			$(this).find('select').append('<option value="bottom">' + image_mapper_admin_js_data.select_option_bottom + '</option>');
		}
		$(this).find('.imapper-item-pin-color').parent().remove();
		$(this).find('.imapper-item-picture').parent().remove();

		$(this).find('.imapper-item-picture').parent().remove();

		$(this).children('li[id$="li-item-border-color"]').remove();
		$(this).children('li[id$="li-item-border-width"]').remove();
		$(this).children('li[id$="li-item-border-radius"]').remove();
		$(this).children('li[id$="li-item-area-width"]').remove();
		$(this).children('li[id$="li-item-area-height"]').remove();
	});
	*/
	if(my_debug_new_12_12){
		
	if(window.console){
		console.log('Additional inputs',my_additional_inputs);
	}
	}
	if(image.indexOf('6/area_pin.png')!==-1){
		$.each(my_additional_inputs['6/area_pin.png'],function(i,v){
			if(my_debug_new_12_12){
				
			if(window.console){
				console.log('Show',v);
			}
			}
			$('#'+v).show();
		});
	}else {
		$.each(my_additional_inputs['6/area_pin.png'],function(i,v){
			$('#'+v).hide();
		});
	}
	/*if(image.indexOf('1/1.png')!==-1){
		$.each(my_additional_inputs['1/1.png'],function(i,v){
			if(window.console){
				console.log('Show',v);
			}
			$('#'+v).show();
		});
	}else {
		$.each(my_additional_inputs['1/1.png'],function(i,v){
			$('#'+v).hide();
		});
	}*/
	if(image.indexOf('5/purple.png')!=-1 || image.indexOf('5/1.png')!=-1){
		$.each(my_additional_inputs['5/purple.png'],function(i,v){
			if(my_debug_new_12_12){
				
			if(window.console){
				console.log('Show',v);
			}
			}
			$('#'+v).show();
		});
	}else {
		$.each(my_additional_inputs['5/purple.png'],function(i,v){
			if(my_debug_new_12_12){
				
			if(window.console){
				console.log('Hide',v);
			}}
			$('#'+v).hide();
		});
	}
	if(image.indexOf('6/area_pin.png')!=-1){
		$.each(my_additional_inputs['6/area_pin.png'],function(i,v){
			if(my_debug_new_12_12){
				
			if(window.console){
				console.log('Show',v);
			}
			}
			$('#'+v).show();
		});
	}else {
		$.each(my_additional_inputs['6/area_pin.png'],function(i,v){
			if(my_debug_new_12_12){
				
			if(window.console){
				console.log('Hide',v);
			}
			}
			$('#'+v).hide();
		});
	}
	/*if(image.indexOf('5/1.png')!=-1){
		$.each(my_additional_inputs['5/1.png'],function(i,v){
			if(window.console){
				console.log('Show',v);
			}
			$('#'+v).show();
		});
	}else {
		$.each(my_additional_inputs['5/1.png'],function(i,v){
			if(window.console){
				console.log('Hide',v);
			}
			$('#'+v).hide();
		});
	}*/
	if(image.indexOf('7/icon_pin.png')!=-1 || image.indexOf('1/1.png')!=-1){
		$.each(my_additional_inputs['7/1.png'],function(i,v){
			if(my_debug_new_12_12){
				
			if(window.console){
				console.log('Show',v);
			}
			}
			$('#'+v).show();
		});
	}else {
		$.each(my_additional_inputs['7/1.png'],function(i,v){
			if(my_debug_new_12_12){
				
			if(window.console){
				console.log('Hide',v);
			}}
			$('#'+v).hide();
		});
	}
	
	/*
	$('#item-content-button-new').remove();
	$('#item-content-button-remove').remove();
	$('#dummy-li-item-pin-color').remove();
	$('#dummy-li-item-picture, #dummy-li-item-border-color, #dummy-li-item-border-width, #dummy-li-item-border-radius, #dummy-li-item-area-width, #dummy-li-item-area-height').remove();	
	*/
	if (image.indexOf('images/icons/1/') < 0&&image.indexOf('images/icons/7/') < 0)
	{	/*var myRemoveId='dummy-imapper-item-content-'+pin_id;
		*/
		$('#sort'+pin_id+' .textarea-additional').each(function() {
			var id=$(this).attr('id');
			//if(id==myRemoveId){
				$(this).remove();	
			//}
		});
		
		$('#sort'+pin_id+' .imapper-sortable-real').each(function() {
			numberOfTabs[$(this).attr('id').substring(17)] = 1;
		});
		
	}else {
		/*var myRemoveId='dummy-imapper-item-content-'+pin_id;
		$('.textarea-additional').each(function() {
			var id=$(this).attr('id');
			if(id==myRemoveId){
				$(this).remove();	
			}
		});
		$('#dummy-li-item-category').next().find("#item-content-button-new").remove();
		$('#dummy-li-item-category').next().find("#item-content-button-remove").remove();
		*/
		
		/*$('.imapper-sortable-real').each(function() {
			numberOfTabs[$(this).attr('id').substring(17)] = 1;
		});*/
	}

        /*
         * Check if selected pin is Sliding pin and remove top and bottom positions for content
         */
        if (image.indexOf('images/icons/2/') >= 0) {
            $('#dummy-imapper-item-open-position').find('option').each(function() {
                if ($(this).attr('value') == 'top' || $(this).attr('value') == 'bottom') {
                    $(this).remove();	
                }
            });
        } else {
            /*
             * If removed and not Sliding pin append top and bottom positions
             */
            if ($('#dummy-imapper-item-open-position').find('option').length == 2) {
                $('#dummy-imapper-item-open-position').append('<option value="top">' + image_mapper_admin_js_data.select_option_top + '</option>');
                $('#dummy-imapper-item-open-position').append('<option value="bottom">' + image_mapper_admin_js_data.select_option_bottom + '</option>');
            }
        }
        
	return;
        
        /*
         * Nisam siguran zasto je ovaj kod ispod sprecen da se izvrsi.
         * Gore je smao bilo postavljeno return bez ikakvog komentara
         * 
         * Moguce, jer bi nakon sto je za global pin bio izabran Sliding pin, 
         * sve vrednosti bi se prenosile na svaki novokreirani pin (za active pin settings)
         * i vratile bi se na ispravne tek kada se uradi refreash. 
         * 
         * Na primer: Svi novi pin-ovi bi imali za poziciju samo left i right, dok se ne uradi refreash
         * 
         * Greska je sto se proverava koje atribute ima #item-icon umesto koju ikonicu ima pin
         * A.P.
         */
	if ($('#item-icon').attr('src').indexOf('images/icons/2/') >= 0)
	{
		$('#item-font-size').html('12');
		$('#item-font-size').attr('value', '12');
		$('#item-font-size').attr('readonly', 'readonly');
		$('#item-header-font-size').html('12');
		$('#item-header-font-size').attr('value', '12');
		$('#item-header-font-size').attr('readonly', 'readonly');
		$('#item-height').html('75');
		$('#item-height').attr('value', '75');
		$('#item-height').attr('readonly', 'readonly');
		
		$('#dummy-imapper-item-open-position').find('option').each(function() {
			if ($(this).attr('value') == 'top' || $(this).attr('value') == 'bottom')
				$(this).remove();	
		});
		
		$('.imapper-sortable-real').each(function() {
			$(this).find('option').each(function() {
				$(this).removeAttr('selected');	
			});
			
			$(this).find('option').each(function() {
				if ($(this).attr('value') == 'left')
					$(this).attr('selected', 'selected');
				
				if ($(this).attr('value') == 'top' || $(this).attr('value') == 'bottom')
					$(this).remove();
			});
		});
	} else if ($('#item-icon').attr('src').indexOf('images/icons/1/') >= 0) {
		$('#dummy-li-item-category').next().after('<li><input type="button" value="+ Add new tab" id="item-content-button-new"  /><input type="button" value="- Remove last tab" id="item-content-button-remove" /></li>');
	} else if ($('#item-icon').attr('src').indexOf('images/icons/5/') >= 0 )
	{
		$('.imapper-sortable-real').each(function() {
			var sortId = $(this).attr('id').substring(17);
			
			$(this).append('<li><input id="sort' + sortId + '-imapper-item-pin-color" name="sort' + sortId + '-imapper-item-pin-color" class="imapper-item-pin-color" value="#0000ff" type="text" style=""></li><li><input id="sort' + sortId + '-imapper-item-picture" name="sort' + sortId + '-imapper-item-picture" class="imapper-item-picture" value="fa-cloud-download" type="text"></li>');
		});
		
		var icons = createIconList();
		
		$('#imapper-sortable-dummy').append('<li id="dummy-li-item-pin-color"><label for="dummy-imapper-item-pin-color">Item Pin Color</label><br /><input id="dummy-imapper-item-pin-color" class="color-picker-iris" name="dummy-imapper-item-pin-color"  value="#0000ff" type="text" style=" background:#0000ff; color:#ffffff;"><div class="color-picker-iris-holder"></div></li><li id="dummy-li-item-picture" style="position: relative;"><label for="dummy-imapper-item-picture" style="display: inline-block; margin-top: -12px;">Item Pin Image</label><br /><input id="dummy-imapper-item-picture" name="dummy-imapper-item-picture" value="fa-cloud-download" type="hidden"><i id="dummy-imapper-pin-icon" class="fa icon-2x fa-cloud-download" style="width: 32px; height: 27px; border: 1px solid black; margin: 0 5px 0 0 !important;"></i><div class="icon-list-button"><a class="arrow-down-admin-link" href="#"><div class="arrow-down-admin" style=""></div></a></div>' + icons + '</li>');
	
		$('.imapper-item-icon-list').mCustomScrollbar();
		
		$('#imapper-sortable-dummy').find('.color-picker-iris').each(function()
		{
			$(this).css('background', $(this).val());
            $(this).iris({
				height: 145,
                target:$(this).parent().find('.color-picker-iris-holder'),
				change: function(event, ui) {
                    $(this).val(ui.color.toString());
                    $(this).css( 'background-color', ui.color.toString());
                }
            });
		});
	} else if ($('#item-icon').attr('src').indexOf('images/icons/6/') >= 0)
	{
		$('.imapper-sortable-real').each(function() {
			var sortId = $(this).attr('id').substring(17);
			
			$(this).append('<li><input id="sort' + sortId + '-imapper-item-pin-color" name="sort' + sortId + '-imapper-item-pin-color" class="imapper-item-pin-color" value="#0000ff" type="text" style=""></li><li id="sort' + sortId + '-li-item-border-color"><input style="margin-left: 75px; width: 230px;" class="color-picker-iris" id="sort' + sortId + '-imapper-border-color" name="sort' + sortId + '-imapper-border-color" value="transparent" type="text" style="background:transparent" /></li> <li id="sort' + sortId + '-li-item-border-width"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-border-width" name="sort' + sortId + '-imapper-border-width" type="text" /> px</li><li id="sort' + sortId + '-li-item-border-radius"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-border-radius" name="sort' + sortId + '-imapper-border-radius" type="text" /> px</li><li id="sort' + sortId + '-li-item-area-width"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-width" name="sort' + sortId + '-imapper-area-width" type="text" /> px<input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-width-normalized" class="imapper-area-width-normalized" name="sort' + sortId + '-imapper-area-width-normalized" type="text" /> px</li><li id="sort' + sortId + '-li-item-area-height"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-height" name="sort' + sortId + '-imapper-area-height" type="text"/> px<input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-height-normalized" class="imapper-area-height-normalized" name="sort' + sortId + '-imapper-area-height-normalized" type="text" /> px</li>');
		});
		
		var icons = createIconList();
		
		$('#imapper-sortable-dummy').append('<li id="dummy-li-item-border-width"><label for="dummy-imapper-border-width">Border width</label><br /><input id="dummy-imapper-border-width" name="dummy-imapper-border-width"  type="text" /> </li><li id="dummy-li-item-border-radius"><label for="dummy-imapper-border-radius">Border radius</label><br /><input id="dummy-imapper-border-radius" name="dummy-imapper-border-radius" type="text" /> </li><li id="dummy-li-item-border-color"><label for="dummy-imapper-border-color">Border color</label><br /><input class="color-picker-iris" id="dummy-imapper-border-color" name="dummy-imapper-border-color" type="text" style="background:transparent;" /><div class="color-picker-iris-holder"></div></li><li id="dummy-li-item-area-width"><label for="dummy-imapper-area-width">Area pin width</label><br /><input id="dummy-imapper-area-width" name="dummy-imapper-area-width"  type="text" value="100" disabled /> </li><li id="dummy-li-item-area-height"><label for="dummy-imapper-area-height">Area pin height</label><br /><input id="dummy-imapper-area-height" name="dummy-imapper-area-height" type="text" value="100" disabled /> </li><li id="dummy-li-item-pin-color"><label for="dummy-imapper-item-pin-color">Pin Color</label><br /><input id="dummy-imapper-item-pin-color" class="color-picker-iris" name="dummy-imapper-item-pin-color"  value="#0000ff" type="text" style="background:#0000ff; color:#ffffff;"><div class="color-picker-iris-holder"></div></li>');

			
					
					
		
		$('#imapper-sortable-dummy').find('.color-picker-iris').each(function()
		{
			$(this).css('background', $(this).val());
            $(this).iris({
				height: 145,
                target:$(this).parent().find('.color-picker-iris-holder'),
				change: function(event, ui) {
                    $(this).val(ui.color.toString());
                    $(this).css( 'background-color', ui.color.toString());
                }
            });
		});
	} else if ($('#item-icon').attr('src').indexOf('images/icons/7/') >= 0) {
			$('#dummy-li-item-category').next().after('<li><input type="button" value="+ Add new tab" id="item-content-button-new" /><input type="button" value="- Remove last tab" id="item-content-button-remove" /></li>');

			$('.imapper-sortable-real').each(function() {
			var sortId = $(this).attr('id').substring(17);
			
			$(this).append('<li><input id="sort' + sortId + '-imapper-item-pin-color" name="sort' + sortId + '-imapper-item-pin-color" class="imapper-item-pin-color" value="#0000ff" type="text" style=""></li>');
		});
		
		
		$('#imapper-sortable-dummy').append('<li id="dummy-li-item-pin-color"><label for="dummy-imapper-item-pin-color">Item Pin Color</label><br /><input id="dummy-imapper-item-pin-color" class="color-picker-iris" name="dummy-imapper-item-pin-color"  value="#0000ff" type="text" style="background:#0000ff; color:#ffffff;"><div class="color-picker-iris-holder"></div></li>');
		
		$('#imapper-sortable-dummy').find('.color-picker-iris').each(function()
		{
			$(this).css('background', $(this).val());
            $(this).iris({
				height: 145,
                target:$(this).parent().find('.color-picker-iris-holder'),
				change: function(event, ui) {
                    $(this).val(ui.color.toString());
                    $(this).css( 'background-color', ui.color.toString());
                }
            });
		});


	}

	$(".dummy-adapter li").each(function(){
		if($.trim($(this).html())=='')
			$(this).remove();
	});


}

/* =====================================================*/
/* Populate new image for active pin uploader           */
/* Set below css and position for each pin individually */
/* =====================================================*/
function iconUploadBehavior_1(img) {
	if(img==''){
	img=$('.dummy-adapter .my_pin_new_icon_image').attr('src');
	}
	if(my_debug_new_12_12){
		
	if(window.console){
		console.log("image",img);
	}
	}
	
	var pin_str=$(".dummy-adapter").not('.closed').parents('.imapper-sortableItem').attr('id');
	if(my_debug_new_12_12){
		
	if(window.console){
		console.log("pin str",pin_str);
	}
	}
	var pin_id=pin_str.replace('sort','');
	if(my_debug_new_12_12){
		
	if(window.console){
		console.log("pin id",pin_id);
	}
	}
	var pin_id_id='sort'+pin_id+'-mapper-pin'
	if(my_debug_new_12_12){
		
	if(window.console){
		console.log("pin id id",pin_id_id);
	}
	}
	
	
	if (img.indexOf('images/icons/6/')<0 && img.indexOf('images/icons/7/')<0) {
		if(window.console){
			console.log("pin not 6 or 7",pin_id);
		}
		$('.imapper-pin').each(function(index) {

			var pinId = $(this).attr('id');		
			var href = $(this).attr('src');
			if(window.console){
				console.log("pin id id",pinId);
			}
			if(pinId==pin_id_id){
				if(my_debug_new_12_12){
					
				if(window.console){
					console.log("Do for a pin",{pinID:pinId,pin_id_id:pin_id_id});
					
				}
				}
				$(this).replaceWith('<img style="position:absolute;" id="'+pinId+'" class="imapper-pin" src="'+img+'" />');
			}

		});
		var pin_d_id_id='sort'+pin_id+'-mapper-pin-delete';
		$('#'+pin_id_id).css('top', -$('#'+pin_id_id).height() + 'px');
		 $('#'+pin_id_id).css('left', -($('#'+pin_id_id).width()/2) + 'px');

		 $('#'+pin_d_id_id).css('top', -$('#'+pin_id_id).height() + 'px');
		 $('#'+pin_d_id_id).css('left', $('#'+pin_id_id).width()/2 - 15 + 'px');
	}else if (img.indexOf('images/icons/6/')>=0) {
		$('.imapper-pin').each(function() {
			 var hrefUnnecessary = $(this).attr('src');
			 var top = $(this).css('top');
			 var left = $(this).css('left');
			 var pinId = $(this).attr('id');
			 if(my_debug_new_12_12){
					
			 if(window.console){
					console.log("pin id id",pinId);
				}
			 }
			 if(pinId==pin_id_id){
				 if(my_debug_new_12_12){
						
				 if(window.console){
						console.log("Do for a pin",{pinID:pinId,pin_id_id:pin_id_id});
						
					}
				 }
				 $(this).replaceWith('<div id="'+pinId+'" class="imapper-pin imapper-area-pin" style="position:absolute;width:100px;height:100px;border:2px solid red;top:-100px;left:-50px;" ></div>')
			 }
			 });

		  var pinWidthOld = 0;
		 var pinHeightOld = 0;

		 $('.imapper-area-pin').resizable({
		  	  start:function(){
		  	  		 pinWidthOld = $(this).width();
		 			 pinHeightOld = $(this).height();

		  		},
			  stop: function() {
			  	 var pinId = $(this).attr('id').substr(0,$(this).attr('id').indexOf('-mapper-pin'));
			  	 var pinWidth = $(this).width();
			  	 var pinHeight = $(this).height();

			  	 
			  	 
			  	 $(this).css({top:-pinHeight+'px',left:-(pinWidth/2)+'px'});

	

			  	var imageWidth = jQuery('#map-image').width();
			  	var imageHeight = jQuery('#map-image').height();

			  	 var pinWidthOffset = (pinWidth-pinWidthOld);
			  	 var pinHeightOffset = (pinHeight-pinHeightOld);

			  	


			  	 var pinLeftInPercent = parseFloat($(this).parent().css('left'))*100/imageWidth;
			  	 var pinTopInPercent = parseFloat($(this).parent().css('top'))*100/imageHeight;

				


			 	 $(this).closest('.imapper-pin-wrapper').css({'left':'+='+pinWidthOffset/2+'px','top':'+='+pinHeightOffset+'px'});
			  	 
			  	 var pinLeftInPercent = parseFloat($(this).parent().css('left'))*100/imageWidth;
			  	 var pinTopInPercent = parseFloat($(this).parent().css('top'))*100/imageHeight;

			  	 $(this).closest('.imapper-pin-wrapper').css({'left':pinLeftInPercent+'%','top':pinTopInPercent+'%'});

			  	 $('#'+ pinId +'-imapper-item-x').attr('value',pinLeftInPercent+'%');
			  	  $('#'+ pinId +'-imapper-item-y').attr('value',pinTopInPercent+'%');
			     
				 
			  	 if ($('#imapper-'+pinId+'-header').css('background-color')=="rgb(200, 200, 200)") {
			  	 	$('#'+pinId+'-imapper-area-width, #dummy-imapper-area-width').attr('value',pinWidth);
			  		$('#'+pinId+'-imapper-area-height, #dummy-imapper-area-height').attr('value',pinHeight);
			  	 } else {
			  	 	$('#'+pinId+'-imapper-area-width').attr('value',pinWidth);
			  	 	$('#'+pinId+'-imapper-area-height').attr('value',pinHeight);
			  	 }
			  }
			});

	}else if (img.indexOf('images/icons/7/')>=0) {
		 $('.imapper-pin').each(function() {
			 var hrefUnnecessary = $(this).attr('src');
			 var top = $(this).css('top');
			 var left = $(this).css('left');
			 var pinId = $(this).attr('id');
			 if(my_debug_new_12_12){
					
			 if(window.console){
					console.log("Check for a pin",{pinID:pinId,pin_id_id:pin_id_id});
					
				}
			 }
			 if(pinId==pin_id_id){
				 if(my_debug_new_12_12){
						
				 if(window.console){
						console.log("Do for a pin",{pinID:pinId,pin_id_id:pin_id_id});
						
					}
				 }
				 $(this).replaceWith('<span id="'+pinId+'" class="imapper-pin iMapper-pin-1 pin-style" ></span>');
			 }
			 });
	} 
	//?kod nepoznat
	$('#item-font-size').removeAttr('readonly');
	$('#item-header-font-size').removeAttr('readonly');
	$('#item-height').removeAttr('readonly');
		
	if ($('#dummy-imapper-item-open-position').find('option').length == 2)
	{
		$('#dummy-imapper-item-open-position').append('<option value="top">' + image_mapper_admin_js_data.select_option_top + '</option>');
		$('#dummy-imapper-item-open-position').append('<option value="bottom">' + image_mapper_admin_js_data.select_option_bottom + '</option>');
	}
	//? kod nepoznat 	
	var my_sort_id='imapper-sortable-'+pin_id;
	$('.imapper-sortable-real').each(function() {
		var id=$(this).attr('id');
		if(id==my_sort_id){
		
		if ($(this).find('option').length == 2)
		{
			$(this).find('select').append('<option value="top">' + image_mapper_admin_js_data.select_option_top + '</option>');
			$(this).find('select').append('<option value="bottom">' + image_mapper_admin_js_data.select_option_bottom + '</option>');
		}
		$(this).find('.imapper-item-pin-color').parent().remove();
		$(this).find('.imapper-item-picture').parent().remove();

		$(this).find('.imapper-item-picture').parent().remove();

		$(this).children('li[id$="li-item-border-color"]').remove();
		$(this).children('li[id$="li-item-border-width"]').remove();
		$(this).children('li[id$="li-item-border-radius"]').remove();
		$(this).children('li[id$="li-item-area-width"]').remove();
		$(this).children('li[id$="li-item-area-height"]').remove();
		}
        });
	/*
	$('#item-content-button-new').remove();
	$('#item-content-button-remove').remove();
	$('#dummy-li-item-pin-color').remove();
	$('#dummy-li-item-picture, #dummy-li-item-border-color, #dummy-li-item-border-width, #dummy-li-item-border-radius, #dummy-li-item-area-width, #dummy-li-item-area-height').remove();	
	*/
	if (img.indexOf('images/icons/1/') < 0 || img.indexOf('images/icons/7/') < 0)
	{	
		$('.dummy-adapter .textarea-additional').each(function() {
			$(this).remove();	
		});
		
		$('.imapper-sortable-real').each(function() {
			var id=$(this).attr('id');
			if(id==my_sort_id){
			
			numberOfTabs[$(this).attr('id').substring(17)] = 1;
			}
			});
	}
	
	if (img.indexOf('images/icons/2/') >= 0)
	{
		/*ne dirati generalne opcije
		$('#item-font-size').html('12');
		$('#item-font-size').attr('value', '12');
		$('#item-font-size').attr('readonly', 'readonly');
		$('#item-header-font-size').html('12');
		$('#item-header-font-size').attr('value', '12');
		$('#item-header-font-size').attr('readonly', 'readonly');
		$('#item-height').html('75');
		$('#item-height').attr('value', '75');
		$('#item-height').attr('readonly', 'readonly');
		*/
		$('#dummy-imapper-item-open-position').find('option').each(function() {
			if ($(this).attr('value') == 'top' || $(this).attr('value') == 'bottom')
				$(this).remove();	
		});
		
		$('.imapper-sortable-real').each(function() {
			var id=$(this).attr('id');
			if(id==my_sort_id){
			
			$(this).find('option').each(function() {
				$(this).removeAttr('selected');	
			});
			
			$(this).find('option').each(function() {
				if ($(this).attr('value') == 'left')
					$(this).attr('selected', 'selected');
				
				if ($(this).attr('value') == 'top' || $(this).attr('value') == 'bottom')
					$(this).remove();
			});
			}
		});
	} else if (img.indexOf('images/icons/1/') >= 0) {
		//$('#dummy-li-item-category').next().after('<li><input type="button" value="+ Add new tab" id="item-content-button-new"  /><input type="button" value="- Remove last tab" id="item-content-button-remove" /></li>');
	} else if (img.indexOf('images/icons/5/') >= 0 )
	{
		$('.imapper-sortable-real').each(function() {
			var id=$(this).attr('id');
			if(id==my_sort_id){
			
			var sortId = $(this).attr('id').substring(17);
			
			$(this).append('<li><input id="sort' + sortId + '-imapper-item-pin-color" name="sort' + sortId + '-imapper-item-pin-color" class="imapper-item-pin-color" value="#0000ff" type="text" style=""></li><li><input id="sort' + sortId + '-imapper-item-picture" name="sort' + sortId + '-imapper-item-picture" class="imapper-item-picture" value="fa-cloud-download" type="text"></li>');
			}
			});
		/*
		var icons = createIconList();
		
		$('#imapper-sortable-dummy').append('<li id="dummy-li-item-pin-color"><label for="dummy-imapper-item-pin-color">Item Pin Color</label><br /><input id="dummy-imapper-item-pin-color" class="color-picker-iris" name="dummy-imapper-item-pin-color"  value="#0000ff" type="text" style=" background:#0000ff; color:#ffffff;"><div class="color-picker-iris-holder"></div></li><li id="dummy-li-item-picture" style="position: relative;"><label for="dummy-imapper-item-picture" style="display: inline-block; margin-top: -12px;">Item Pin Image</label><br /><input id="dummy-imapper-item-picture" name="dummy-imapper-item-picture" value="fa-cloud-download" type="hidden"><i id="dummy-imapper-pin-icon" class="fa icon-2x fa-cloud-download" style="width: 32px; height: 27px; border: 1px solid black; margin: 0 5px 0 0 !important;"></i><div class="icon-list-button"><a class="arrow-down-admin-link" href="#"><div class="arrow-down-admin" style=""></div></a></div>' + icons + '</li>');
	
		$('.imapper-item-icon-list').mCustomScrollbar();
		
		$('#imapper-sortable-dummy').find('.color-picker-iris').each(function()
		{
			$(this).css('background', $(this).val());
            $(this).iris({
				height: 145,
                target:$(this).parent().find('.color-picker-iris-holder'),
				change: function(event, ui) {
                    $(this).val(ui.color.toString());
                    $(this).css( 'background-color', ui.color.toString());
                }
            });
		});
		*/
	} else if (img.indexOf('images/icons/6/') >= 0)
	{
		$('.imapper-sortable-real').each(function() {
			var id=$(this).attr('id');
			if(id==my_sort_id){
			
			var sortId = $(this).attr('id').substring(17);
			
			$(this).append('<li><input id="sort' + sortId + '-imapper-item-pin-color" name="sort' + sortId + '-imapper-item-pin-color" class="imapper-item-pin-color" value="#0000ff" type="text" style=""></li><li id="sort' + sortId + '-li-item-border-color"><input style="margin-left: 75px; width: 230px;" class="color-picker-iris" id="sort' + sortId + '-imapper-border-color" name="sort' + sortId + '-imapper-border-color" value="transparent" type="text" style="background:transparent" /></li> <li id="sort' + sortId + '-li-item-border-width"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-border-width" name="sort' + sortId + '-imapper-border-width" type="text" /> px</li><li id="sort' + sortId + '-li-item-border-radius"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-border-radius" name="sort' + sortId + '-imapper-border-radius" type="text" /> px</li><li id="sort' + sortId + '-li-item-area-width"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-width" name="sort' + sortId + '-imapper-area-width" type="text" /> px<input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-width-normalized" class="imapper-area-width-normalized" name="sort' + sortId + '-imapper-area-width-normalized" type="text" /> px</li><li id="sort' + sortId + '-li-item-area-height"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-height" name="sort' + sortId + '-imapper-area-height" type="text"/> px<input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-height-normalized" class="imapper-area-height-normalized" name="sort' + sortId + '-imapper-area-height-normalized" type="text" /> px</li>');
			}
			});
		
		var icons = createIconList();
		
		//$('#imapper-sortable-dummy').append('<li id="dummy-li-item-border-width"><label for="dummy-imapper-border-width">Border width</label><br /><input id="dummy-imapper-border-width" name="dummy-imapper-border-width"  type="text" /> </li><li id="dummy-li-item-border-radius"><label for="dummy-imapper-border-radius">Border radius</label><br /><input id="dummy-imapper-border-radius" name="dummy-imapper-border-radius" type="text" /> </li><li id="dummy-li-item-border-color"><label for="dummy-imapper-border-color">Border color</label><br /><input class="color-picker-iris" id="dummy-imapper-border-color" name="dummy-imapper-border-color" type="text" style="background:transparent;" /><div class="color-picker-iris-holder"></div></li><li id="dummy-li-item-area-width"><label for="dummy-imapper-area-width">Area pin width</label><br /><input id="dummy-imapper-area-width" name="dummy-imapper-area-width"  type="text" value="100" disabled /> </li><li id="dummy-li-item-area-height"><label for="dummy-imapper-area-height">Area pin height</label><br /><input id="dummy-imapper-area-height" name="dummy-imapper-area-height" type="text" value="100" disabled /> </li><li id="dummy-li-item-pin-color"><label for="dummy-imapper-item-pin-color">Pin Color</label><br /><input id="dummy-imapper-item-pin-color" class="color-picker-iris" name="dummy-imapper-item-pin-color"  value="#0000ff" type="text" style="background:#0000ff; color:#ffffff;"><div class="color-picker-iris-holder"></div></li>');

			
					
					
		/*
		$('#imapper-sortable-dummy').find('.color-picker-iris').each(function()
		{
			$(this).css('background', $(this).val());
            $(this).iris({
				height: 145,
                target:$(this).parent().find('.color-picker-iris-holder'),
				change: function(event, ui) {
                    $(this).val(ui.color.toString());
                    $(this).css( 'background-color', ui.color.toString());
                }
            });
		});
		*/
	} else if (img.indexOf('images/icons/7/') >= 0) {
		/*	
		$('#dummy-li-item-category').next().after('<li><input type="button" value="+ Add new tab" id="item-content-button-new" /><input type="button" value="- Remove last tab" id="item-content-button-remove" /></li>');
		*/
			$('.imapper-sortable-real').each(function() {
				var id=$(this).attr('id');
				if(id==my_sort_id){
				
				var sortId = $(this).attr('id').substring(17);
			
			$(this).append('<li><input id="sort' + sortId + '-imapper-item-pin-color" name="sort' + sortId + '-imapper-item-pin-color" class="imapper-item-pin-color" value="#0000ff" type="text" style=""></li>');
				}
				});
		
		/*
		$('#imapper-sortable-dummy').append('<li id="dummy-li-item-pin-color"><label for="dummy-imapper-item-pin-color">Item Pin Color</label><br /><input id="dummy-imapper-item-pin-color" class="color-picker-iris" name="dummy-imapper-item-pin-color"  value="#0000ff" type="text" style="background:#0000ff; color:#ffffff;"><div class="color-picker-iris-holder"></div></li>');
		
		$('#imapper-sortable-dummy').find('.color-picker-iris').each(function()
		{
			$(this).css('background', $(this).val());
            $(this).iris({
				height: 145,
                target:$(this).parent().find('.color-picker-iris-holder'),
				change: function(event, ui) {
                    $(this).val(ui.color.toString());
                    $(this).css( 'background-color', ui.color.toString());
                }
            });
		});
	*/

	}
        
        /*
        * Fix for replacing custom image css (top and left), 
        * or any other pin which don't have this url part wordpress_image_mapper/images/icons/
        * @since Version 2.8
        */
        if (img.indexOf('wordpress_image_mapper/images/icons/') < 0) {

            var customPinImgObject = $('#'+pin_id_id);
            
            // Set timeout to gain height and widht
            setTimeout(function(){
                
                // Set proper left and top values for the custom pin
                var customPinHeight = customPinImgObject.height();
                var customPinWidth = customPinImgObject.width();
                var customPinDelete = $('#sort'+pin_id+'-mapper-pin-delete');
                
                // Image, custom pin
                customPinImgObject.css('top', -customPinHeight + 'px');
                customPinImgObject.css('left', -(customPinWidth / 2) + 'px');
                // Delete button of the custom pin
                customPinDelete.css('top', -customPinHeight + 'px');
                customPinDelete.css('left', (customPinWidth / 2) - 15 + 'px');
                 
            }, 100);
	}

	$(".dummy-adapter li").each(function(){
		if($.trim($(this).html())=='')
			$(this).remove();
	});
	//saving pin icons
	itemIsClicked(pin_id, pin_id);	
	adjustOptionsDummyAdapter(pin_id,img);
}

/* ====================================================*/
/* Change all pins with new selected pin or custom pin */
/* ====================================================*/
function iconUploadBehavior() {
		var hasCustomIcons=[];
		var hasntCustomIcons=[];
		$(".imapper-sortable-real").each(function(i,v){
			var my_id=$(this).attr('id');
			var my_pin_id=my_id.replace('imapper-sortable-','');
			if(my_debug_new_12_12){
				
			if(window.console){
				console.log('Check pins for a icons',{my_id:my_id,my_pin_id:my_pin_id});
			}
			}
			var my_custom_icon=$("#sort"+my_pin_id+"-imapper-item-new-pin").val();
			if(typeof my_custom_icon!="undefined"&&my_custom_icon!=""){
				if(my_debug_new_12_12){
					
				if(window.console){
					console.log('Has custom icon',{my_pin_id:my_pin_id,icon:my_custom_icon});
					
				}}
				hasCustomIcons[hasCustomIcons.length]=my_pin_id;
			}else {
				hasntCustomIcons[hasntCustomIcons.length]=my_pin_id;
			}
		});
		if(my_debug_new_12_12){
			
		if(window.console){
			console.log('Has custom icons',hasCustomIcons);
		}
		if(window.console){
			console.log('Hasnt custom icons',hasntCustomIcons);
		}
		}
		var my_total_pins=$(".imapper-sortable-real").length;
		var my_has_total=hasCustomIcons.length;
		if(my_debug_new_12_12){
			
		if(window.console){
			console.log('Total pins cusotm icons',{my_total_pins:my_total_pins,my_has_total:my_has_total});
		}
		}
		if(my_total_pins==my_has_total){
			if(my_debug_new_12_12){
				
			if(window.console){
				console.log('All pins has custom icons return');
				
			}
			}
			return;
		}
		var my_imapperPinsHasCustom=[];
		$.each(hasCustomIcons,function(i,v){
			var my_id='sort'+v+'-mapper-pin';
			my_imapperPinsHasCustom[my_imapperPinsHasCustom.length]=my_id;
		});
		if(my_debug_new_12_12){
			
		if(window.console){
			console.log('New pins change icons',my_imapperPinsHasCustom);
		}
		}
		
		if ($('#item-icon').attr('src').indexOf('images/icons/6/')<0 && $('#item-icon').attr('src').indexOf('images/icons/7/')<0) {
			$('.imapper-pin').each(function(index) {

				var pinId = $(this).attr('id');		
				var href = $(this).attr('src');
				var my_pin_id=pinId.substr(4,1);
				var my_pin_delete='sort'+my_pin_id+'-mapper-pin-delete';
				if(my_debug_new_12_12){
					
				if(window.console){
					console.log('Pin ids',{my_pin_id:my_pin_id,my_pin_delete:my_pin_delete});
				}
				}
				if($.inArray(pinId,my_imapperPinsHasCustom)==-1){
					$(this).replaceWith('<img style="position:absolute;" id="'+pinId+'" class="imapper-pin" src="'+$('#item-icon').attr('src')+'" />');
					$('#'+pinId).css('top', -$('#'+pinId).height() + 'px');
					 $('#'+pinId).css('left', -($('#'+pinId).width()/2) + 'px');

					 $('#'+my_pin_delete).css('top', -$('#'+pinId).height() + 'px');
					 $('#'+my_pin_delete).css('left', $('#'+pinId).width()/2 - 15 + 'px');

				}

			});

				 
		} else if ($('#item-icon').attr('src').indexOf('images/icons/6/')>=0) {
			 $('.imapper-pin').each(function() {
				 var hrefUnnecessary = $(this).attr('src');
				 var top = $(this).css('top');
				 var left = $(this).css('left');
				 var pinId = $(this).attr('id');
				 var my_pin_id=pinId.substr(4,1);
					var my_pin_delete='sort'+my_pin_id+'-mapper-pin-delete';
					if(my_debug_new_12_12){
						
					if(window.console){
						console.log('Pin ids',{my_pin_id:my_pin_id,my_pin_delete:my_pin_delete});
					}
					}
				//use only pins without custom pin	
				if($.inArray(pinId,my_imapperPinsHasCustom)==-1){	
				 $(this).replaceWith('<div id="'+pinId+'" class="imapper-pin imapper-area-pin" style="position:absolute;width:100px;height:100px;border:2px solid red;top:-100px;left:-50px;" ></div>')
			 	}
			 
			 });

			  var pinWidthOld = 0;
			 var pinHeightOld = 0;

 	$('.imapper-area-pin').resizable({
			  	  start:function(){
			  	  		 pinWidthOld = $(this).width();
			 			 pinHeightOld = $(this).height();

			  		},
				  stop: function() {
				  	 var pinId = $(this).attr('id').substr(0,$(this).attr('id').indexOf('-mapper-pin'));
				  	 var pinWidth = $(this).width();
				  	 var pinHeight = $(this).height();

				  	 
				  	 
				  	 $(this).css({top:-pinHeight+'px',left:-(pinWidth/2)+'px'});

		

				  	var imageWidth = jQuery('#map-image').width();
				  	var imageHeight = jQuery('#map-image').height();

				  	 var pinWidthOffset = (pinWidth-pinWidthOld);
				  	 var pinHeightOffset = (pinHeight-pinHeightOld);

				  	


				  	 var pinLeftInPercent = parseFloat($(this).parent().css('left'))*100/imageWidth;
				  	 var pinTopInPercent = parseFloat($(this).parent().css('top'))*100/imageHeight;

					


				 	 $(this).closest('.imapper-pin-wrapper').css({'left':'+='+pinWidthOffset/2+'px','top':'+='+pinHeightOffset+'px'});
				  	 
				  	 var pinLeftInPercent = parseFloat($(this).parent().css('left'))*100/imageWidth;
				  	 var pinTopInPercent = parseFloat($(this).parent().css('top'))*100/imageHeight;

				  	 $(this).closest('.imapper-pin-wrapper').css({'left':pinLeftInPercent+'%','top':pinTopInPercent+'%'});

				  	 $('#'+ pinId +'-imapper-item-x').attr('value',pinLeftInPercent+'%');
				  	  $('#'+ pinId +'-imapper-item-y').attr('value',pinTopInPercent+'%');
				     
					 
				  	 if ($('#imapper-'+pinId+'-header').css('background-color')=="rgb(200, 200, 200)") {
				  	 	$('#'+pinId+'-imapper-area-width, #dummy-imapper-area-width').attr('value',pinWidth);
				  		$('#'+pinId+'-imapper-area-height, #dummy-imapper-area-height').attr('value',pinHeight);
				  	 } else {
				  	 	$('#'+pinId+'-imapper-area-width').attr('value',pinWidth);
				  	 	$('#'+pinId+'-imapper-area-height').attr('value',pinHeight);
				  	 }
				  }
				});
		} else if ($('#item-icon').attr('src').indexOf('images/icons/7/')>=0) {
			 $('.imapper-pin').each(function() {
				 var hrefUnnecessary = $(this).attr('src');
				 var top = $(this).css('top');
				 var left = $(this).css('left');
				 var pinId = $(this).attr('id');
				 if($.inArray(pinId,my_imapperPinsHasCustom)==-1){	
						 
				 $(this).replaceWith('<span id="'+pinId+'" class="imapper-pin iMapper-pin-1 pin-style" ></span>');
				 }
				 });
		} 
	
		$('#item-font-size').removeAttr('readonly');
		$('#item-header-font-size').removeAttr('readonly');
		$('#item-height').removeAttr('readonly');
			
		if ($('#dummy-imapper-item-open-position').find('option').length == 2)
		{
			$('#dummy-imapper-item-open-position').append('<option value="top">' + image_mapper_admin_js_data.select_option_top + '</option>');
			$('#dummy-imapper-item-open-position').append('<option value="bottom">' + image_mapper_admin_js_data.select_option_bottom + '</option>');
		}
		/*	dont remove anything
		$('.imapper-sortable-real').each(function() {
			if ($(this).find('option').length == 2)
			{
				$(this).find('select').append('<option value="top">' + image_mapper_admin_js_data.select_option_top + '</option>');
				$(this).find('select').append('<option value="bottom">' + image_mapper_admin_js_data.select_option_bottom + '</option>');
			}
			$(this).find('.imapper-item-pin-color').parent().remove();
			$(this).find('.imapper-item-picture').parent().remove();

			$(this).find('.imapper-item-picture').parent().remove();

			$(this).children('li[id$="li-item-border-color"]').remove();
			$(this).children('li[id$="li-item-border-width"]').remove();
			$(this).children('li[id$="li-item-border-radius"]').remove();
			$(this).children('li[id$="li-item-area-width"]').remove();
			$(this).children('li[id$="li-item-area-height"]').remove();
		});
		
		$('#item-content-button-new').remove();
		$('#item-content-button-remove').remove();
		$('#dummy-li-item-pin-color').remove();
		$('#dummy-li-item-picture, #dummy-li-item-border-color, #dummy-li-item-border-width, #dummy-li-item-border-radius, #dummy-li-item-area-width, #dummy-li-item-area-height').remove();	
		*/
		
		if ($('#item-icon').attr('src').indexOf('images/icons/1/') < 0 || $('#item-icon').attr('src').indexOf('images/icons/7/') < 0)
		{	
			
			$.each(hasntCustomIcons,function(i,v){
				var my_id_s='imapper-sortable-'+v;
			$('#'+my_id_s+'.textarea-additional').each(function() {
				$(this).remove();	
			});
			
			$('#'+my_id_s+'.imapper-sortable-real').each(function() {
				numberOfTabs[$(this).attr('id').substring(17)] = 1;
			});
			});
			
		}
		
		if ($('#item-icon').attr('src').indexOf('images/icons/2/') >= 0)
		{
			$('#item-font-size').html('12');
			$('#item-font-size').attr('value', '12');
			$('#item-font-size').attr('readonly', 'readonly');
			$('#item-header-font-size').html('12');
			$('#item-header-font-size').attr('value', '12');
			$('#item-header-font-size').attr('readonly', 'readonly');
			$('#item-height').html('75');
			$('#item-height').attr('value', '75');
			$('#item-height').attr('readonly', 'readonly');
			
			/*$('#dummy-imapper-item-open-position').find('option').each(function() {
				if ($(this).attr('value') == 'top' || $(this).attr('value') == 'bottom')
					$(this).remove();	
			});*/
			$.each(hasntCustomIcons,function(i,v){
				var my_id_s='imapper-sortable-'+v;
			$('#'+my_id_s).each(function() {
				$(this).find('option').each(function() {
					$(this).removeAttr('selected');	
				});
				
				$(this).find('option').each(function() {
					if ($(this).attr('value') == 'left')
						$(this).attr('selected', 'selected');
					
					if ($(this).attr('value') == 'top' || $(this).attr('value') == 'bottom')
						$(this).remove();
				});
			});
			});
		} else if ($('#item-icon').attr('src').indexOf('images/icons/1/') >= 0) {
			//$('#dummy-li-item-category').next().after('<li><input type="button" value="+ Add new tab" id="item-content-button-new"  /><input type="button" value="- Remove last tab" id="item-content-button-remove" /></li>');
		} else if ($('#item-icon').attr('src').indexOf('images/icons/5/') >= 0 )
		{	$.each(hasntCustomIcons,function(i,v){
			var my_id_s='imapper-sortable-'+v;
			$('#'+my_id_s).each(function() {
				var sortId = $(this).attr('id').substring(17);
				
				$(this).append('<li><input id="sort' + sortId + '-imapper-item-pin-color" name="sort' + sortId + '-imapper-item-pin-color" class="imapper-item-pin-color" value="#0000ff" type="text" style=""></li><li><input id="sort' + sortId + '-imapper-item-picture" name="sort' + sortId + '-imapper-item-picture" class="imapper-item-picture" value="fa-cloud-download" type="text"></li>');
			});
		});
			var icons = createIconList();
			
			//$('#imapper-sortable-dummy').append('<li id="dummy-li-item-pin-color"><label for="dummy-imapper-item-pin-color">Item Pin Color</label><br /><input id="dummy-imapper-item-pin-color" class="color-picker-iris" name="dummy-imapper-item-pin-color"  value="#0000ff" type="text" style=" background:#0000ff; color:#ffffff;"><div class="color-picker-iris-holder"></div></li><li id="dummy-li-item-picture" style="position: relative;"><label for="dummy-imapper-item-picture" style="display: inline-block; margin-top: -12px;">Item Pin Image</label><br /><input id="dummy-imapper-item-picture" name="dummy-imapper-item-picture" value="fa-cloud-download" type="hidden"><i id="dummy-imapper-pin-icon" class="fa icon-2x fa-cloud-download" style="width: 32px; height: 27px; border: 1px solid black; margin: 0 5px 0 0 !important;"></i><div class="icon-list-button"><a class="arrow-down-admin-link" href="#"><div class="arrow-down-admin" style=""></div></a></div>' + icons + '</li>');
		
			$('.imapper-item-icon-list').mCustomScrollbar();
			
			/*$('#imapper-sortable-dummy').find('.color-picker-iris').each(function()
			{
				$(this).css('background', $(this).val());
	            $(this).iris({
					height: 145,
	                target:$(this).parent().find('.color-picker-iris-holder'),
					change: function(event, ui) {
	                    $(this).val(ui.color.toString());
	                    $(this).css( 'background-color', ui.color.toString());
	                }
	            });
			});*/
		} else if ($('#item-icon').attr('src').indexOf('images/icons/6/') >= 0)
		{
			$.each(hasntCustomIcons,function(i,v){
				var my_id_s='imapper-sortable-'+v; 	
			$('#'+my_id_s).each(function() {
				var sortId = $(this).attr('id').substring(17);
				
				$(this).append('<li><input id="sort' + sortId + '-imapper-item-pin-color" name="sort' + sortId + '-imapper-item-pin-color" class="imapper-item-pin-color" value="#0000ff" type="text" style=""></li><li id="sort' + sortId + '-li-item-border-color"><input style="margin-left: 75px; width: 230px;" class="color-picker-iris" id="sort' + sortId + '-imapper-border-color" name="sort' + sortId + '-imapper-border-color" value="transparent" type="text" style="background:transparent" /></li> <li id="sort' + sortId + '-li-item-border-width"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-border-width" name="sort' + sortId + '-imapper-border-width" type="text" /> px</li><li id="sort' + sortId + '-li-item-border-radius"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-border-radius" name="sort' + sortId + '-imapper-border-radius" type="text" /> px</li><li id="sort' + sortId + '-li-item-area-width"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-width" name="sort' + sortId + '-imapper-area-width" type="text" /> px<input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-width-normalized" class="imapper-area-width-normalized" name="sort' + sortId + '-imapper-area-width-normalized" type="text" /> px</li><li id="sort' + sortId + '-li-item-area-height"><input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-height" name="sort' + sortId + '-imapper-area-height" type="text"/> px<input style="margin-left: 75px; width: 230px;" id="sort' + sortId + '-imapper-area-height-normalized" class="imapper-area-height-normalized" name="sort' + sortId + '-imapper-area-height-normalized" type="text" /> px</li>');
			});
			});
			var icons = createIconList();
			
			//$('#imapper-sortable-dummy').append('<li id="dummy-li-item-border-width"><label for="dummy-imapper-border-width">Border width</label><br /><input id="dummy-imapper-border-width" name="dummy-imapper-border-width"  type="text" /> </li><li id="dummy-li-item-border-radius"><label for="dummy-imapper-border-radius">Border radius</label><br /><input id="dummy-imapper-border-radius" name="dummy-imapper-border-radius" type="text" /> </li><li id="dummy-li-item-border-color"><label for="dummy-imapper-border-color">Border color</label><br /><input class="color-picker-iris" id="dummy-imapper-border-color" name="dummy-imapper-border-color" type="text" style="background:transparent;" /><div class="color-picker-iris-holder"></div></li><li id="dummy-li-item-area-width"><label for="dummy-imapper-area-width">Area pin width</label><br /><input id="dummy-imapper-area-width" name="dummy-imapper-area-width"  type="text" value="100" disabled /> </li><li id="dummy-li-item-area-height"><label for="dummy-imapper-area-height">Area pin height</label><br /><input id="dummy-imapper-area-height" name="dummy-imapper-area-height" type="text" value="100" disabled /> </li><li id="dummy-li-item-pin-color"><label for="dummy-imapper-item-pin-color">Pin Color</label><br /><input id="dummy-imapper-item-pin-color" class="color-picker-iris" name="dummy-imapper-item-pin-color"  value="#0000ff" type="text" style="background:#0000ff; color:#ffffff;"><div class="color-picker-iris-holder"></div></li>');

				
						
						
			
			/*$('#imapper-sortable-dummy').find('.color-picker-iris').each(function()
			{
				$(this).css('background', $(this).val());
	            $(this).iris({
					height: 145,
	                target:$(this).parent().find('.color-picker-iris-holder'),
					change: function(event, ui) {
	                    $(this).val(ui.color.toString());
	                    $(this).css( 'background-color', ui.color.toString());
	                }
	            });
			});
			*/
		} else if ($('#item-icon').attr('src').indexOf('images/icons/7/') >= 0) {
				//$('#dummy-li-item-category').next().after('<li><input type="button" value="+ Add new tab" id="item-content-button-new" /><input type="button" value="- Remove last tab" id="item-content-button-remove" /></li>');
			$.each(hasntCustomIcons,function(i,v){
				var my_id_s='imapper-sortable-'+v;
				$('#'+my_id_s).each(function() {
				var sortId = $(this).attr('id').substring(17);
				
				$(this).append('<li><input id="sort' + sortId + '-imapper-item-pin-color" name="sort' + sortId + '-imapper-item-pin-color" class="imapper-item-pin-color" value="#0000ff" type="text" style=""></li>');
			});
			});
			
			
			//$('#imapper-sortable-dummy').append('<li id="dummy-li-item-pin-color"><label for="dummy-imapper-item-pin-color">Item Pin Color</label><br /><input id="dummy-imapper-item-pin-color" class="color-picker-iris" name="dummy-imapper-item-pin-color"  value="#0000ff" type="text" style="background:#0000ff; color:#ffffff;"><div class="color-picker-iris-holder"></div></li>');
			
			/*$('#imapper-sortable-dummy').find('.color-picker-iris').each(function()
			{
				$(this).css('background', $(this).val());
	            $(this).iris({
					height: 145,
	                target:$(this).parent().find('.color-picker-iris-holder'),
					change: function(event, ui) {
	                    $(this).val(ui.color.toString());
	                    $(this).css( 'background-color', ui.color.toString());
	                }
	            });
			});
			*/


		}
                
                

                /*
                * Fix for replacing custom image css (top and left), 
                * or any other pin which don't have this url part wordpress_image_mapper/images/icons/
                * @since Version 2.8
                */
               if ($('#item-icon').attr('src').indexOf('wordpress_image_mapper/images/icons/') < 0) {

                    // Replace all pins that don't have cusom pins
                    $('.imapper-pin').each(function(){
                        
                        // If pin don't have custom icon set only for that pin in active pin settings
                        if($.inArray($(this).attr('id'),my_imapperPinsHasCustom) < 0){
                        
                            var customPinImgObject = $(this);

                            // Set timeout to gain height and widht
                            setTimeout(function(){

                                // Set proper left and top values for the custom pin
                                var customPinHeight = customPinImgObject.height();
                                var customPinWidth = customPinImgObject.width();
                                var customPinDelete = customPinImgObject.parent('.imapper-pin-wrapper').find('.imapper-pin-delete');

                                // Image, custom pin
                                customPinImgObject.css('top', -customPinHeight + 'px');
                                customPinImgObject.css('left', -(customPinWidth / 2) + 'px');
                                // Delete button of the custom pin
                                customPinDelete.css('top', -customPinHeight + 'px');
                                customPinDelete.css('left', (customPinWidth / 2) - 15 + 'px');

                            }, 100);
                        }
                        
                    });
                   
               }

		$(".dummy-adapter li").each(function(){
			if($.trim($(this).html())=='')
				$(this).remove();
		});
		/**
		 * Adjust open pin
		 */
		if($(".dummy-adapter").not('.closed').length>0){
			var my_item_clicked_str=$(".dummy-adapter").not('.closed').parents('.imapper-sortableItem').attr('id');
			my_item_clicked=my_item_clicked_str.replace('sort','');
			if(my_debug_new_12_12){
				
			if(window.console){
				console.log('Item clicked',{my_item_clicked_str:my_item_clicked_str,my_item_clicked:my_item_clicked});
			}
			}
			my_image_12=$("#sort"+my_item_clicked+"-imapper-item-new-pin").val();
			
			if(typeof my_image_12=='undefined' || my_image_12==''){
				my_image_12=$('#item-icon').attr('src');
			}
			
			adjustOptionsDummyAdapter(my_item_clicked,my_image_12)
		}

}

function createPin_1(numItems, left, top) {
	var pinWrapper = $(document.createElement('div'));
	pinWrapper.attr('id', 'sort' + numItems + '-mapper-pin-wrapper');
	pinWrapper.attr('class', 'imapper-pin-wrapper');
	pinWrapper.css('position', 'absolute');
	pinWrapper.css('left', left);
	pinWrapper.css('top', top);
	var my_image=$('#item-icon').attr('src');
	var my_new_icon=$("#sort"+numItems+"-imapper-item-new-pin").val();
	if(my_new_icon!=''){
		if(my_new_icon.indexOf('images/icons/5/1.png')!==-1){
			var my_new_icon=my_new_icon.substring(0, my_new_icon.indexOf('images/icons/5/')) + 'images/icons/5/purple.png';
			//$(".my_pin_new_icon_image").attr('src',my_image_12_12_12_new);
			//$("#dummy-imapper-item-pin").val(my_image_12_12_12);	
		}
		my_image=my_new_icon;
	}
	
	if (my_image.indexOf('images/icons/6/')>=0) {
		var pin = $(document.createElement('div'));
		pin.attr('id', 'sort' + numItems + '-mapper-pin');
		pin.attr('class', 'imapper-pin imapper-area-pin');
		pin.css({'position': 'absolute',
			'width':(($('#sort' + numItems + '-imapper-area-width').attr('value') !== undefined) ? $('#sort' + numItems + '-imapper-area-width').attr('value')+'px'  : '100px'),
			'height':(($('#sort' + numItems + '-imapper-area-height').attr('value') !== undefined) ? $('#sort' + numItems + '-imapper-area-height').attr('value')+'px'  : '100px'),
			'border':'1px solid red'});
	} else if (my_image.indexOf('images/icons/7/')>=0) {
		var pin = $(document.createElement('span'));
		pin.attr('id', 'sort' + numItems + '-mapper-pin');
		pin.attr('class', 'imapper-pin iMapper-pin-1');
		pin.css('position', 'absolute');
	} else {
		var pin = $(document.createElement('img'));
		pin.attr('id', 'sort' + numItems + '-mapper-pin');
		pin.attr('class', 'imapper-pin');
		pin.attr('src', my_image);
		pin.css('position', 'absolute');
	}
			
	var pinText = $(document.createElement('div'));
	pinText.attr('id', 'sort' + numItems + '-mapper-pin-text');
	pinText.attr('class', 'imapper-pin-text');
	/**
	 * Chnaged by dragan
	 */
	pinText.css('position', 'absolute');
	pinText.css('color', '#000000');
	pinText.css('top', '5px');
	pinText.html($('#sort' + numItems + '-imapper-item-title').attr('value'));
	
	var pinDelete = $(document.createElement('img'));
	pinDelete.attr('id', 'sort' + numItems + '-mapper-pin-delete');
	pinDelete.attr('class', 'imapper-pin-delete');
	pinDelete.attr('src', $('#plugin-url').val() + 'images/tb-close.png');
	pinDelete.css('position', 'absolute');
	pinDelete.css('cursor', 'pointer');
	pinDelete.css('display', 'none');
			
	pinWrapper.append(pin);
	pinWrapper.append(pinText);
	pinWrapper.append(pinDelete);


	$(".dummy-adapter li").each(function(){
			if($.trim($(this).html())=='')
				$(this).remove();
		});

	return pinWrapper;
}
function createPin(numItems, left, top) {
	var pinWrapper = $(document.createElement('div'));
	pinWrapper.attr('id', 'sort' + numItems + '-mapper-pin-wrapper');
	pinWrapper.attr('class', 'imapper-pin-wrapper');
	pinWrapper.css('position', 'absolute');
	pinWrapper.css('left', left);
	pinWrapper.css('top', top);
	/*var my_image=$('#item-icon').attr('src');
	var my_new_icon=$("#sort"+numItems+"-imapper-item-new-pin");
	if(my_new_icon!=''){
		my_image=my_new_icon;
	}*/
	
	if ($('#item-icon').attr('src').indexOf('images/icons/6/')>=0) {
		var pin = $(document.createElement('div'));
		pin.attr('id', 'sort' + numItems + '-mapper-pin');
		pin.attr('class', 'imapper-pin imapper-area-pin');
		pin.css({'position': 'absolute',
			'width':(($('#sort' + numItems + '-imapper-area-width').attr('value') !== undefined) ? $('#sort' + numItems + '-imapper-area-width').attr('value')+'px'  : '100px'),
			'height':(($('#sort' + numItems + '-imapper-area-height').attr('value') !== undefined) ? $('#sort' + numItems + '-imapper-area-height').attr('value')+'px'  : '100px'),
			'border':'1px solid red'});
	} else if ($('#item-icon').attr('src').indexOf('images/icons/7/')>=0) {
		var pin = $(document.createElement('span'));
		pin.attr('id', 'sort' + numItems + '-mapper-pin');
		pin.attr('class', 'imapper-pin iMapper-pin-1');
		pin.css('position', 'absolute');
	} else {
		var pin = $(document.createElement('img'));
		pin.attr('id', 'sort' + numItems + '-mapper-pin');
		pin.attr('class', 'imapper-pin');
		pin.attr('src', $('#item-icon').attr('src'));
		pin.css('position', 'absolute');
	}
			
	var pinText = $(document.createElement('div'));
	pinText.attr('id', 'sort' + numItems + '-mapper-pin-text');
	pinText.attr('class', 'imapper-pin-text');
	/**
	 * Chnaged by dragan
	 */
	pinText.css('position', 'absolute');
	pinText.css('color', '#000000');
	pinText.css('top', '5px');
	pinText.html($('#sort' + numItems + '-imapper-item-title').attr('value'));
	
	var pinDelete = $(document.createElement('img'));
	pinDelete.attr('id', 'sort' + numItems + '-mapper-pin-delete');
	pinDelete.attr('class', 'imapper-pin-delete');
	pinDelete.attr('src', $('#plugin-url').val() + 'images/tb-close.png');
	pinDelete.css('position', 'absolute');
	pinDelete.css('cursor', 'pointer');
	pinDelete.css('display', 'none');
			
	pinWrapper.append(pin);
	pinWrapper.append(pinText);
	pinWrapper.append(pinDelete);


	$(".dummy-adapter li").each(function(){
			if($.trim($(this).html())=='')
				$(this).remove();
		});

	return pinWrapper;
}

function createIconList()
{
	var iconList = ['fa-cloud-download', 'fa-cloud-upload', 'fa-lightbulb', 'fa-exchange', 'fa-bell-alt', 'fa-file-alt', 'fa-beer', 'fa-coffee', 'fa-food', 'fa-fighter-jet', 'fa-user-md', 'fa-stethoscope', 'fa-suitcase', 'fa-building', 'fa-hospital', 'fa-ambulance', 'fa-medkit', 'fa-h-sign', 'fa-plus-sign-alt', 'fa-spinner', 'fa-angle-left', 'fa-angle-right', 'fa-angle-up', 'fa-angle-down', 'fa-double-angle-left', 'fa-double-angle-right', 'fa-double-angle-up', 'fa-double-angle-down', 'fa-circle-blank', 'fa-circle', 'fa-desktop', 'fa-laptop', 'fa-tablet', 'fa-mobile-phone', 'fa-quote-left', 'fa-quote-right', 'fa-reply', 'fa-github-alt', 'fa-folder-close-alt', 'fa-folder-open-alt', 'fa-adjust', 'fa-asterisk', 'fa-ban-circle', 'fa-bar-chart', 'fa-barcode', 'fa-beaker', 'fa-beer', 'fa-bell', 'fa-bell-alt', 'fa-bolt', 'fa-book', 'fa-bookmark', 'fa-bookmark-empty', 'fa-briefcase', 'fa-bullhorn', 'fa-calendar', 'fa-camera', 'fa-camera-retro', 'fa-certificate', 'fa-check', 'fa-check-empty', 'fa-circle', 'fa-circle-blank', 'fa-cloud', 'fa-cloud-download', 'fa-cloud-upload', 'fa-coffee', 'fa-cog', 'fa-cogs', 'fa-comment', 'fa-comment-alt', 'fa-comments', 'fa-comments-alt', 'fa-credit-card', 'fa-dashboard', 'fa-desktop', 'fa-download', 'fa-download-alt', 'fa-edit', 'fa-envelope', 'fa-envelope-alt', 'fa-exchange', 'fa-exclamation-sign', 'fa-external-link', 'fa-eye-close', 'fa-eye-open', 'fa-facetime-video', 'fa-fighter-jet', 'fa-film', 'fa-filter', 'fa-fire', 'fa-flag', 'fa-folder-close', 'fa-folder-open', 'fa-folder-close-alt', 'fa-folder-open-alt', 'fa-food', 'fa-gift', 'fa-glass', 'fa-globe', 'fa-group', 'fa-hdd', 'fa-headphones', 'fa-heart', 'fa-heart-empty', 'fa-home', 'fa-inbox', 'fa-info-sign', 'fa-key', 'fa-leaf', 'fa-laptop', 'fa-legal', 'fa-lemon', 'fa-lightbulb', 'fa-lock', 'fa-unlock', 'fa-magic', 'fa-magnet', 'fa-map-marker', 'fa-minus', 'fa-minus-sign', 'fa-mobile-phone', 'fa-money', 'fa-move', 'fa-music', 'fa-off', 'fa-ok', 'fa-ok-circle', 'fa-ok-sign', 'fa-pencil', 'fa-picture', 'fa-plane', 'fa-plus', 'fa-plus-sign', 'fa-print', 'fa-pushpin', 'fa-qrcode', 'fa-question-sign', 'fa-quote-left', 'fa-quote-right', 'fa-random', 'fa-refresh', 'fa-remove', 'fa-remove-circle', 'fa-remove-sign', 'fa-reorder', 'fa-reply', 'fa-resize-horizontal', 'fa-resize-vertical', 'fa-retweet', 'fa-road', 'fa-rss', 'fa-screenshot', 'fa-search', 'fa-share', 'fa-share-alt', 'fa-shopping-cart', 'fa-signal', 'fa-signin', 'fa-signout', 'fa-sitemap', 'fa-sort', 'fa-sort-down', 'fa-sort-up', 'fa-spinner', 'fa-star', 'fa-star-empty', 'fa-star-half', 'fa-tablet', 'fa-tag', 'fa-tags', 'fa-tasks', 'fa-thumbs-down', 'fa-thumbs-up', 'fa-time', 'fa-tint', 'fa-trash', 'fa-trophy', 'fa-truck', 'fa-umbrella', 'fa-upload', 'fa-upload-alt', 'fa-user', 'fa-user-md', 'fa-volume-off', 'fa-volume-down', 'fa-volume-up', 'fa-warning-sign', 'fa-wrench', 'fa-zoom-in', 'fa-zoom-out', 'fa-file', 'fa-file-alt', 'fa-cut', 'fa-copy', 'fa-paste', 'fa-save', 'fa-undo', 'fa-repeat', 'fa-text-height', 'fa-text-width', 'fa-align-left', 'fa-align-center', 'fa-align-right', 'fa-align-justify', 'fa-indent-left', 'fa-indent-right', 'fa-font', 'fa-bold', 'fa-italic', 'fa-strikethrough', 'fa-underline', 'fa-link', 'fa-paper-clip', 'fa-columns', 'fa-table', 'fa-th-large', 'fa-th', 'fa-th-list', 'fa-list', 'fa-list-ol', 'fa-list-ul', 'fa-list-alt', 'fa-angle-left', 'fa-angle-right', 'fa-angle-up', 'fa-angle-down', 'fa-arrow-down', 'fa-arrow-left', 'fa-arrow-right', 'fa-arrow-up', 'fa-caret-down', 'fa-caret-left', 'fa-caret-right', 'fa-caret-up', 'fa-chevron-down', 'fa-chevron-left', 'fa-chevron-right', 'fa-chevron-up', 'fa-circle-arrow-down', 'fa-circle-arrow-left', 'fa-circle-arrow-right', 'fa-circle-arrow-up', 'fa-double-angle-left', 'fa-double-angle-right', 'fa-double-angle-up', 'fa-double-angle-down', 'fa-hand-down', 'fa-hand-left', 'fa-hand-right', 'fa-hand-up', 'fa-circle', 'fa-circle-blank', 'fa-play-circle', 'fa-play', 'fa-pause', 'fa-stop', 'fa-step-backward', 'fa-fast-backward', 'fa-backward', 'fa-forward', 'fa-fast-forward', 'fa-step-forward', 'fa-eject', 'fa-fullscreen', 'fa-resize-full', 'fa-resize-small', 'fa-phone', 'fa-phone-sign', 'fa-facebook', 'fa-facebook-sign', 'fa-twitter', 'fa-twitter-sign', 'fa-github', 'fa-github-alt', 'fa-github-sign', 'fa-linkedin', 'fa-linkedin-sign', 'fa-pinterest', 'fa-pinterest-sign', 'fa-google-plus', 'fa-google-plus-sign', 'fa-sign-blank', 'fa-ambulance', 'fa-beaker', 'fa-h-sign', 'fa-hospital', 'fa-medkit', 'fa-plus-sign-alt', 'fa-stethoscope', 'fa-user-md' ];
		
	var iconDiv = '<div class="imapper-item-icon-list">';
	
	for (var i = 0; i < iconList.length; i++)
		if ((i + 1) % 10 != 0)
			iconDiv += '<a href="#"><i class="' + iconList[i] + ' fa" style="margin: 10px 0 0 10px;"></i></a>';
		else
			iconDiv += '<a href="#"><i class="' + iconList[i] + ' fa" style="margin: 10px 10px 0 10px;"></i></a><div class="clear"></div>';
	
	iconDiv += '</div>';
	
	return iconDiv;
}

/*
 * Return get query string values from url
 * @since 2.8
 */
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    url = url.toLowerCase(); // This is just to avoid case sensitiveness  
    name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

})(jQuery)