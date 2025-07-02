<?php
	$current_page = 'error';
	$page_title = 'Error 404';
	include('components/head.php');
?>

<section class='breadcrumbs'>
	<div class='container'>
		<ul>
			
			<li>
				<a href='<?= $home; ?>' class='hover-underline'>
					Home
				</a>
			</li>

			<li>
				<?= file_get_contents('assets/svg/ux/angle-right.svg'); ?>
			</li>

			<li>
				<p>
					Error 404
				</p>
			</li>

		</ul>
	</div>
</section>

<section class='main'>
	<div class='container'>
		<div class='top'>

			<h1 class='text-bigger bold font-title'>
				Page Not Found
			</h1>

			<p>
				Unfortunately we can't seem to find the page you're looking for.<br />
				But why not take this opportunity to check out some of our exhibits?
			</p>

		</div>
	</div>
</section>

<section class='exhibits'>
	<div class='container'>
		<div class='grid'>
			<?php for ($i = 0; $i < 4; $i++): ?>
				<?php include('components/exhibit-card.php'); ?>
			<?php endfor; ?>
		</div>
	</div>
</section>

<?php include('components/footer.php'); ?>