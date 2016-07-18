<form action="<?php echo home_url( '/' ); ?>" method="get">
    <fieldset>
		<div class="input-group">
			<input type="text" name="s" id="search" placeholder="<?php _e("Search", "puntozero"); ?>" value="<?php the_search_query(); ?>" class="form-control" />
			<span class="input-group-btn">
				<button type="submit" class="btn btn-primary"><?php _e("Search", "puntozero"); ?></button>
			</span>
		</div>
    </fieldset>
</form>
