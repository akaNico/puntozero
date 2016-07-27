
<?php if ( is_active_sidebar( 'sidebar-right' ) ) { ?>
<div id="sidebar-right" class="col-sm-12 col-md-2" role="complementary">
    <div class="vertical-nav block">
    <?php dynamic_sidebar( 'sidebar-right' ); ?>
    </div>
</div>
<?php } ?>
