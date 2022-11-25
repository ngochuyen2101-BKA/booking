<?php if ( have_posts() ) : ?>

<?php /* Start the Loop */ ?>

<?php while ( have_posts() ) : the_post(); ?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class='thang-blogs-meta'>
		<div class='thang-date'>
			<img src='/wp-content/uploads/2022/10/Lich-icon.svg'><?php echo get_the_date(); ?>
		</div>
		<div class='thang-author'>
			<img src='/wp-content/uploads/2022/10/Nguoi.svg'><?php echo get_the_author(); ?>
		</div>
	</div>
	<div class="article-inner <?php flatsome_blog_article_classes(); ?>">
		<?php
			if(flatsome_option('blog_post_style') == 'default' || flatsome_option('blog_post_style') == 'inline'){
				get_template_part('template-parts/posts/partials/entry-header', flatsome_option('blog_posts_header_style') );
			}
		?>
		<?php get_template_part( 'template-parts/posts/content', 'single' ); ?>
	</div>
</article>
<?php endwhile; ?>

<?php else : ?>

	<?php get_template_part( 'no-results', 'index' ); ?>

<?php endif; ?>