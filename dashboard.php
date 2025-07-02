<?php
	$current_page = 'dashboard';
	$page_title = 'Dashboard';
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
					Dashboard
				</p>
			</li>

		</ul>
	</div>
</section>

<section class='main'>
	<div class='container'>
		<div class='top'>

			<h1 class='text-bigger bold font-title'>
				Dashboard
			</h1>

			<p class='text-medium-small'>
				From your account dashboard you can view your recent orders, manage your shipping and billing addresses and edit your password and account details.
			</p>

		</div>
	</div>
</section>

<section class='dashboard'>
	<div class='container'>
		<div class='grid'>

			<div class='left-menu'>
				<div class='accordion main-accordion alternative'>
							
					<div class='question main-question'>

						<p class='font-title text-medium-small medium'>
							Menu
						</p>

						<?= file_get_contents('assets/svg/ux/filter.svg'); ?>

					</div>

					<div class='answer main-answer'>
						<div class='answer-wrapper'>
							<ul>

								<li>
									<a href='#' class='active'>
										Dashboard
									</a>
								</li>

								<li>
									<a href='#'>
										Orders
									</a>
								</li>

								<li>
									<a href='#'>
										Addresses
									</a>
								</li>

								<li>
									<a href='#'>
										Profile Settings
									</a>
								</li>

								<li>
									<a href='#'>
										Subscriptions
									</a>
								</li>

								<li>
									<a href='<?= $home ?>'>
										Logout
									</a>
								</li>

							</ul>
						</div>
					</div>

				</div>
			</div>

			<div class='right-content'>

				<?= file_get_contents('assets/svg/other/rainbow.svg'); ?>

				<div class='relative z2'>

					<h2 class='font-title bold text-medium-big'>
						Dashboard
					</h2>

					<p class='text-medium'>
						From your account dashboard you can view your recent orders, manage your shipping and billing addresses and edit your password and account details.
					</p>

				</div>

			</div>

		</div>
	</div>
</section>

<?php include('components/footer.php'); ?>