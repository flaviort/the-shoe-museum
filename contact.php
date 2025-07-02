<?php
	$current_page = 'contact';
	$page_title = 'Contact Us';
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
					Contact Us
				</p>
			</li>

		</ul>
	</div>
</section>

<section class='main'>
	<div class='container'>

		<div class='top'>

			<h1 class='text-bigger bold font-title'>
				Contact Us
			</h1>

			<p class='text-medium-small'>
				We'd love to help you find your groove!
			</p>

			<p class='text-medium-small text-bottom'>
				<strong>
					Reach out with questions, testimonials, or anything else that you need on your CBD & THC journey.
				</strong>
			</p>

		</div>
		
		<div class='bottom'>
			<div class='row'>

				<div class='col-md-6 left'>
					<div class='box'>

						<?= file_get_contents('assets/svg/other/rainbow.svg'); ?>

						<div class='wrapper'>

							<h2 class='font-title text-medium-big bold'>
								We'd love to <br />
								hear from you
							</h2>

							<p class='text-medium'>
								<b>
									Phone, email and live chat hours:
								</b>
							</p>

							<p>
								Monday - Friday, <b>10:00am - 6:30pm CST</b><br />
								Saturday, chat and email <b>10:00am - 6:00pm CST</b>
							</p>

							<p>
								<a href='mailto:<?= $email; ?>' class='hover-underline-white bold'>
									<?= $email; ?>
								</a><br />
								<a href='tel:<?= $phone; ?>' class='hover-underline-white bold'>
									<?= $phone; ?>
								</a>
							</p>

							<p>
								<b>Louisiana</b><br />
								10771 Perkins Road STE A<br />
								Baton Rouge, LA 70810
							</p>

							<p>
								<b>Virginia</b><br />
								1818 Page Road<br />
								Powhatan, VA 23139
							</p>

						</div>

					</div>
				</div>

				<div class='col-md-6 right'>

					<form action='#' class='form-validate'>

						<div class='form-line'>

							<label for='contact-name' class='label'>
								Name
							</label>

							<div class='line-wrapper'>
								<input
									type='text'
									id='contact-name'
									name='Name'
									class='input'
									placeholder='John Doe'
									required
								>
							</div>

						</div>

						<div class='form-line'>

							<label for='contact-email' class='label'>
								Email
							</label>

							<div class='line-wrapper'>
								<input
									type='email'
									id='contact-email'
									name='Email'
									class='input'
									placeholder='email@email.com'
									required
								>
							</div>

						</div>

						<div class='form-line'>

							<label for='contact-phone' class='label'>
								Phone
							</label>

							<div class='line-wrapper'>
								<input
									type='text'
									id='contact-phone'
									name='Phone'
									class='input'
									placeholder='+9 999 999 9999'
								>
							</div>

						</div>

						<div class='form-line'>

							<label for='contact-message' class='label'>
								Comments or Questions
							</label>

							<div class='line-wrapper'>
								<textarea
									type='text'
									id='contact-message'
									name='Message'
									class='input textarea'
									placeholder='Your message here'
									required
								></textarea>
							</div>

						</div>

						<div class='submit-button'>
							<button type='submit' class='button button--gradient submit'>
								
								<span>
									Submit
								</span>
								
								<span class='button__loader'>
									<?= file_get_contents('assets/svg/ux/loader.svg'); ?>
								</span>

							</button>
						</div>

						<?php include('components/popups/contact.php') ?>

					</form>

				</div>
			</div>
		</div>

	</div>
</section>

<?php include('components/quiz-banner.php'); ?>

<?php include('components/instagram.php'); ?>

<?php include('components/footer.php'); ?>