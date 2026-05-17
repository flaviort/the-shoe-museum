<?php
	$current_page = 'error-404';
	include('components/head.php');
?>

<section class='banner-404'>

	<img
		src='assets/img/banner.jpg'
		alt='Error Banner'
		width='1920'
		height='400'
		loading='eager'
		class='cover'
	/>

	<img
		src='assets/img/footprint.svg'
		alt='Footprint'
		width='300'
		height='300'
		class='footprint'
	/>

	<div class='container py-medium'>

		<h1 class='text-60 uppercase bold white'>
			Error 404
		</h1>

		<div class='row mt-half mt-md-1'>
			<div class='col-lg-8'>
				<p class='text-20 white'>
					Oh no! The page you're looking for doesn't exist.
				</p>
			</div>
		</div>

	</div>

</section>

<section class='related-404 pb-smaller pt-medium pt-md-small'>
	<div class='container'>

		<div class='top'>
			
			<h2 class='text-60 uppercase bold'>
				Our Exhibits
			</h2>

			<p class='text-20 mt-half'>
				Why not take this opportunity to explore our latest exhibits?
			</p>

		</div>
		
		<div class='grid mt-smaller'>

			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>
			<?php include('components/exhibit-block.php'); ?>

		</div>

		<a
			href='<?= $exhibits; ?>'
			class='button button--hollow uppercase mt-smallest'
		>
			<span class='text'>
				View All
			</span>

			<span class='icon'>
				<i data-lucide='arrow-right'></i>
			</span>

		</a>

	</div>
</section>

<?php include('components/newsletter-section.php'); ?>

<?php include('components/footer.php'); ?>