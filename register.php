<?php
	$current_page = 'user';
	$page_title = 'Sign In';
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
					Sign Up
				</p>
			</li>

		</ul>
	</div>
</section>

<section class='main'>
	<div class='container'>

		<div class='top'>

			<h1 class='text-bigger bold font-title'>
				Sign Up
			</h1>

			<p class='text-medium-small'>
				Welcome! Let's get to know each other!
			</p>

		</div>
		
		<div class='bottom'>
			<div class='row'>
				<div class='col-md-8 offset-md-2 col-lg-6 offset-lg-3'>

					<form action='#' class='form-validate'>

						<div class='form-line'>

							<label for='signup-first-name' class='label'>
								First Name
							</label>

							<div class='line-wrapper'>
								<input
									type='text'
									id='signup-first-name'
									name='First Name'
									class='input'
									placeholder='John'
									required
								>
							</div>

						</div>

						<div class='form-line'>

							<label for='signup-last-name' class='label'>
								Last Name
							</label>

							<div class='line-wrapper'>
								<input
									type='text'
									id='signup-last-name'
									name='Last Name'
									class='input'
									placeholder='Doe'
								>
							</div>

						</div>

						<div class='form-line'>

							<label for='signup-email' class='label'>
								Email
							</label>

							<div class='line-wrapper'>
								<input
									type='email'
									id='signup-email'
									name='Email'
									class='input'
									placeholder='email@email.com'
									required
								>
							</div>

						</div>

						<div class='form-line'>

							<label for='signup-password' class='label'>
								Password
							</label>

							<div class='line-wrapper'>

								<input
									type='password'
									id='signup-password'
									name='Password'
									class='input'
									placeholder='******'
									required
								>

								<button type='button' class='show-pass'>
									<?= file_get_contents('assets/svg/ux/eye.svg'); ?>
									<?= file_get_contents('assets/svg/ux/eye-slash.svg'); ?>
								</button>

							</div>

						</div>

						<div class='form-line'>

							<label for='signup-repeat-password' class='label'>
								Repeat Password
							</label>

							<div class='line-wrapper'>
								<input
									type='password'
									id='signup-repeat-password'
									name='Repeat Password'
									equalto='#signup-password'
									class='input'
									placeholder='******'
									required
								>
							</div>

						</div>

						<div class='submit-button'>
							<button type='submit' class='button button--gradient submit'>
								
								<span>
									Sign Up
								</span>
								
								<span class='button__loader'>
									<?= file_get_contents('assets/svg/ux/loader.svg'); ?>
								</span>

							</button>
						</div>

					</form>

					<div class='links'>

						<p>
							Already have an account? 
							<a href='<?= $login; ?>' class='hover-underline-white bold'>
								Sign In
							</a>
						</p>

					</div>
				</div>
			</div>
		</div>

	</div>
</section>

<?php include('components/footer.php'); ?>