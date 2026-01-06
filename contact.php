<?php
	$current_page = 'contact';
	include('components/head.php');
?>

<section class='banner'>

	<img
		src='assets/img/banner.jpg'
		alt='Contact Us Banner'
		width='1920'
		height='400'
		loading='eager'
		class='cover'
	/>

	<div class='container py-medium'>

		<h1 class='text-60 uppercase bold white'>
			Contact Us
		</h1>

		<div class='row mt-half mt-md-1'>
			<div class='col-lg-8'>
				<p class='text-20 white'>
					Need help ? We will find a solution to satisfy you as soon as possible.
				</p>
			</div>
		</div>

	</div>

</section>

<section class='middle py-small'>
	<div class='container'>
		<div class='row'>

			<div class='col-md-5'>

				<p class='text-20 desc'>
					Whether you have a question about our latest drops, need assistance with sizing, or simply want to connect, our dedicated team is here to help. Your satisfaction is our priority, and we strive to provide a seamless experience.<br /><br />

					Drop us an email at <a href='mailto:<?php echo($email); ?>' class='hover-underline-white'><?php echo($email); ?></a> and we'll get back to you within 24 hrs.<br /><br />

					Remember, at The Shoe Museum we are not just selling shoes; we are curating the stories behind them. Thank you for choosing The Shoe Museum. We look forward to serving you.
				</p>
				
			</div>

			<div class='col-md-7'>
				<div class='box bg-pure-white p-smaller'>
					<form action='#'>
						<div class='row'>

							<div class='col-xl-6'>
								<div class='form-line'>
									<div class='line-wrapper'>
										<input
											type='text'
											placeholder='First Name'
											class='input'
											required
										/>
									</div>
								</div>
							</div>

							<div class='col-xl-6'>
								<div class='form-line'>
									<div class='line-wrapper'>
										<input
											type='text'
											placeholder='Last Name'
											class='input'
										/>
									</div>
								</div>
							</div>

							<div class='col-xl-6'>
								<div class='form-line'>
									<div class='line-wrapper'>
										<input
											type='email'
											placeholder='Email'
											class='input'
											required
											autocomplete='email'
										/>
									</div>
								</div>
							</div>

							<div class='col-xl-6'>
								<div class='form-line'>
									<div class='line-wrapper'>
										<input
											type='tel'
											placeholder='Phone'
											class='input'
											autocomplete='tel'
										/>
									</div>
								</div>
							</div>

						</div>

						<div class='form-line'>
							<div class='line-wrapper'>
								<textarea
									placeholder='Message'
									class='input textarea'
									required
								></textarea>
							</div>
						</div>

						<button type='submit' class='button button--solid uppercase'>

							<span class='text'>
								Submit
							</span>

							<span class='icon'>
								<i data-lucide='arrow-right'></i>
							</span>

						</button>

					</form>
				</div>
			</div>

		</div>
	</div>
</section>

<?php include('components/faq-section.php'); ?>

<?php include('components/footer.php'); ?>