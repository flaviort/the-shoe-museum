<?php
	$current_page = 'home';
	include('components/head.php');
?>

<section class='banner'>

	<div class='video play-pause'>
		<video playsinline muted loop class='cover'>
			<source src='assets/videos/banner.mp4' type='video/mp4'>
		</video>
	</div>

	<h1 class='text-25 font-title'>
		<strong>
			Every shoe has a history
		</strong>
	</h1>
	
</section>

<section class='about pt-small'>
	<div class='container'>
		
		<h2 class='text-45 bold'>
			About
		</h2>

		<div class='content pt-small'>

			<h3 class='text-45'>
				<strong>
					Every shoe has a history
				</strong>
			</h3>

			<p class='text-30 mt-smallest mx-auto'>
				At The Shoe Museum we understand the power of personal style and the impact it can have on one's confidence and self-expression. We are committed sharing designer stories while offering a curated collection that seamlessly blends fashion and functionality.
			</p>

			<div class='image mx-auto mt-small'>

				<img
					src='assets/img/shoe.png'
					alt='Shoe'
					loading='lazy'
					width='2152'
					height='985'
					class='shoe'
				/>

				<img
					src='assets/img/rock.png'
					alt='Rock'
					loading='lazy'
					width='2000'
					height='519'
					class='rock'
				/>

			</div>

		</div>

	</div>
</seciton>

<?php include('components/footer.php'); ?>