<?php
	$current_page = 'sponsors';
	include('components/head.php');
?>

<section class='banner bg-gray-lightest'>
	<div class='container py-medium'>

		<h1 class='text-60 bold uppercase'>
			Sponsors
		</h1>

		<div class='row mt-half mt-md-1'>
			<div class='col-lg-8'>
				<p class='text-20'>
					We work with the best in the business. Want to be part of our family? <a href='<?= $contact; ?>' class='hover-underline'>Get in touch</a>.
				</p>
			</div>
		</div>

	</div>
</section>

<section class='middle py-small'>
	<div class='container'>
		<div class="grid">
			<?php for ($i = 0; $i < 8; $i++) { ?>
				<?php include('components/sponsor-block.php'); ?>
			<?php } ?>
		</div>	
	</div>
</section>

<?php include('components/newsletter-section.php'); ?>

<?php include('components/footer.php'); ?>