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
					Sign In
				</p>
			</li>

		</ul>
	</div>
</section>

<section class='main'>
	<div class='container'>

		<div class='top'>

			<h1 class='text-bigger bold font-title'>
				Sign In
			</h1>

			<p class='text-medium-small'>
				Welcome back! Access your account by signing in below.
			</p>

		</div>
		
		<div class='bottom'>
			<div class='row'>
				<div class='col-md-8 offset-md-2 col-lg-6 offset-lg-3'>

					<form action='#' class='form-validate'>

						<div class='form-line'>

							<label for='signin-email' class='label'>
								Email
							</label>

							<div class='line-wrapper'>
								<input
									type='email'
									id='signin-email'
									name='Email'
									class='input'
									placeholder='email@email.com'
									required
								>
							</div>

						</div>

						<div class='form-line'>

							<label for='signin-password' class='label'>
								Password
							</label>

							<div class='line-wrapper'>

								<input
									type='password'
									id='signin-password'
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

						<div class='submit-button'>
							<button type='submit' class='button button--gradient submit'>
								
								<span>
									Sign In
								</span>
								
								<span class='button__loader'>
									<?= file_get_contents('assets/svg/ux/loader.svg'); ?>
								</span>

							</button>
						</div>

					</form>

					<div class='links'>

						<p>
							Don't have an account? 
							<a href='<?= $register; ?>' class='hover-underline-white bold'>
								Sign Up
							</a>
						</p>

						<p>
							<a href='<?= $lost_password; ?>' class='hover-underline-white bold'>
								Forgot your password?
							</a>
						</p>

					</div>
				</div>
			</div>
		</div>

	</div>
</section>

<?php include('components/footer.php'); ?>