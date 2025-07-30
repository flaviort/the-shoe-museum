<?php
	$current_page = 'exhibits';
	include('components/head.php');
?>

<section class='featured'>
	
	<a href='#' class='link'></a>

	<img
		src='assets/img/exhibits/featured.jpg'
		alt='Exhibit'
		width='1920'
		height='1080'
		loading='lazy'
		class='cover'
	/>

	<div class='container z2'>
		<div class='flex pb-1'>
			<h2 class='white text-20'>
				Designer: <span>Justin Taylor</span>
			</h2>
		</div>
	</div>

</section>

<section class='exhibits py-medium pt-md-small bg-gray-lightest'>
	<div class='container'>
		<div class='grid mt-smaller'>

			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>

		</div>
	</div>
</section>

<?php include('components/newsletter-section.php'); ?>

<?php include('components/footer.php'); ?>