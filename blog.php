<?php
	$current_page = 'blog';
	$page_title = 'Blog';
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
					Blog
				</p>
			</li>

		</ul>
	</div>
</section>

<section class='main'>
	<div class='container'>

		<div class='top'>

			<h1 class='text-bigger bold font-title'>
				Blog
			</h1>

			<p class='text-medium-small'>
				Keep up with the latest company news, product launches, and CBD wellness tips on our blog.
			</p>

		</div>
		
		<div class='featured-blog-block'>
			
			<a href='<?= $blog ?>' class='image'>
				<img
					data-src='assets/img/blog-01.jpg'
					alt='Is on a mission to share the benefits of CBD'
					class='lazy cover'
				>
			</a>

			<div class='box'>

				<div class='date-source text-small'>

					<p class='date orange'>
						Apr 1, 2019
					</p>

					<p class='source yellow medium'>
						225 Magazine
					</p>

				</div>

				<a href='<?= $blog ?>' class='title'>
					<h2 class='text-medium-big bold'>
						Is on a mission to share the benefits of CBD
					</h2>
				</a>

				<div class='desc'>
					<p>
						Kristy Hebert’s life was changed forever when she was hit by a drunk driver her freshman year at LSU. Hebert was walking down Nicholson Drive in 2012 when the driver struck her while making an early turn into an apartment complex.
					</p>
				</div>

				<a href='<?= $blog ?>' class='link medium hover-underline-white orange'>
					Learn More
				</a>

			</div>

		</div>

	</div>
</section>

<section class='all-posts'>
	<div class='container'>

		<div class='grid'>
			<?php for ($i = 0; $i < 9; $i++): ?>
				<?php include('components/blog-block.php'); ?>
			<?php endfor; ?>
		</div>

		<div class='more padding-top-smaller'>
			<button class='button button--hollow'>
				Load More
			</button>
		</div>

	</div>
</section>

<?php include('components/instagram.php'); ?>

<?php include('components/footer.php'); ?>