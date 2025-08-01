<div id='contact-success' class='popup' data-lenis-prevent>
	<div class='wrap'>

		<h2 class='h2'>
			Success
		</h2>

		<p class='desc'>
			<b>Thank you for reaching out to us!</b><br />
            Your message has been received and we will get back to you as soon as possible.
        </p>

		<button class='button' onclick='Fancybox.close();'>
			Close
		</button>

	</div>
</div>

<div id='contact-error' class='popup' data-lenis-prevent>
	<div class='wrap'>

		<h2 class='h2'>
			Oops!
		</h2>

		<p class='desc'>
			An error occurred while submitting your form. <br />
			Please try again later. We apologize for any inconvenience caused and appreciate your patience. <br />
			If the problem persists, contact us directly at <a href="mailto:<?php echo($email); ?>" class='hover-underline-white'><?php echo($email); ?></a>
        </p>

		<button class='button' onclick='Fancybox.close();'>
			Close
		</button>

	</div>
</div>