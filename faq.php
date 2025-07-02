<?php
	$current_page = 'faq';
	$page_title = 'Frequently Asked Questions';
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
					Frequently Asked Questions
				</p>
			</li>

		</ul>
	</div>
</section>

<section class='main'>
	<div class='container'>

		<div class='top'>

			<h1 class='text-bigger bold font-title'>
				Frequently Asked Questions
			</h1>

			<p class='text-medium-small'>
				Here are some of the most common FAQs we receive at <b>Cypress Hemp</b>.<br />
				Don’t see the answer to your question? Reach out to us at <a href='<?= $email; ?>' class='hover-underline-white orange medium'><?= $email; ?></a>
			</p>

		</div>
		
		<div class='bottom'>

			<div class='block'>

				<h2 class='font-title text-medium-big bold'>
					General Questions
				</h2>

				<div class='accordion'>
							
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							What is CBD?
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								Cannabidiol (CBD) is the primary phytocannabinoid in the hemp plant. Phytocannabinoids are plant produced cannabinoids that interact with and regulate the human endocannabinoid system. Over 100+ phytocannabinoids have been found in the hemp plant. Phytocannabinoids may be consumed in order to supplement a deficient endocannabinoid system.
							</p>
						</div>
					</div>

				</div>

				<div class='accordion'>
							
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							What does CBD do?
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								CBD is essentially a regulator of <b>homeostasis</b>, or chemical balance, in the endocannabinoid system, which extends throughout the entire body and brain.<br /><br />

								<b>CCBD used internally</b> enters the bloodstream and cross the blood-brain barrier, which enables it to support the balance and wellness of your entire endocannabinoid system, including the body and mind.<br /><br />

								<b>CBD used topically</b> will not enter the bloodstream, but can provide targeted, localized relief as it will interact with cannabinoid receptors in your skin, subdermal, and subcutaneous tissue. 
							</p>
						</div>
					</div>

				</div>

				<div class='accordion'>
							
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							Dosage? How do I use CBD?
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								In general, much of the initial process with CBD is about finding your ideal personal dosage. Because CBD is used for such a wide range of applications, and each application ranges in severity, there is not a standardized dosage system.<br /><br />

								For internal use, it is best to start low and taper up over time until you reach your desired results. To make that process easier, all of our CBD+OMEGAS Drops feature measured droppers so that you can be precise and consistent as you move up or down in dosage each day. We recommend keeping a journal to track your results. The World Health Organization has stated there is no potential for abuse, so feel free to take more servings if you feel like you need it. Use daily; consistency is often key!<br /><br />

								For external use, apply generously as needed, and move up in strength if needed.
							</p>
						</div>
					</div>

				</div>

				<div class='accordion'>
							
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							Does CBD help with... ?
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								The long list of potential benefits from CBD continues to expand along with the growing body of scientific research. We also have hempy customers that have reported benefits with just about every application that one could think of! However, due to regulations we can not make specific statements on the use of CBD products for particular diseases or conditions.
							</p>
						</div>
					</div>

				</div>

				<div class='accordion'>
							
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							Is CBD safe?
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								Yes! The World Health Organization (WHO) has stated there is ZERO reports of abuse or addition, and that CBD is well tolerated and has a good safety profile. To date, there is no evidence of any public health related problems associated with the use of pure CBD.<br /><br />

								Always consult with a medical professional before introducing any new products into your daily routine.
							</p>
						</div>
					</div>

				</div>

				<div class='accordion'>
							
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							Can hemp or CBD get you high?
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								No! Hemp and hemp-derived CBD won't get you high. Hemp is defined as all cannabis plants that contain less than 0.3% THC, so by definition hemp is non-psychoactive and won't get you high. CBD is a non-psychoactive cannabinoid that doesn't get you high like THC does. THC is the psychoactive compound in marijuana that makes one "high". All of our hemp products contain <0.3% THC, and we also offer many THC-Free options as well.
							</p>
						</div>
					</div>

				</div>

				<div class='accordion'>
							
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							How long does it take for CBD to take effect?
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								Every situation is unique to the individual, but many people have reported feeling the benefits of CBD within 25 minutes. There has also been additional reported benefits from consistent usage over time.<br /><br />

								Find your ideal personal dosage, then stay consistent!
							</p>
						</div>
					</div>

				</div>

			</div>

			<div class='block'>

				<h2 class='font-title text-medium-big bold'>
					Product Related
				</h2>

				<div class='accordion'>
							
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							CBD Oil vs. Hemp Seed Oil?
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								Hemp produces two types of oil, hemp extract (which contains CBD) and hemp seed oil (which does not contain CBD, but contains omega 3-6-9). We combine them both to create a complete hemp supplement!
							</p>
						</div>
					</div>

				</div>

				<div class='accordion'>
							
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							Full-spectrum Hemp Extract vs. Broad-spectrum Hemp Extract vs. CBD Isolate?
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								At Cypress Hemp, we use both full-spectrum and broad-spectrum hemp extracts for our CBD products. Read more below to determine which is best for you!<br /><br />

								Full-spectrum hemp extracts contain high amounts of CBD, as well as 100's of other beneficial plant compounds, such as terpenes, which are naturally found in the hemp plant, and <b>also contains a trace amount (<0.3% THC)</b>.<br /><br />

								Broad-spectrum hemp extracts contain high amounts of CBD, as well as 100's of other beneficial plant compounds, such as terpenes, which are naturally found in the hemp plant, but contain zero THC.<br /><br />

								CBD Isolate is a highly-processed single molecule powder that only contains CBD. These products are best to be avoided due to the lack of an "Entourage Effect".
							</p>
						</div>
					</div>

				</div>

				<div class='accordion'>
							
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							What is the Entourage Effect?
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								The "Entourage Effect" is the name for the concept that the various compounds in plants, like hemp, are most effective in concert rather than in isolated form (CBD Isolate). Broad-spectrum and full-spectrum extracts provide two similar forms of the entourage effect because they both contain CBD as well as beneficial compounds like terpenes which work in synergy with the cannabinoids.
							</p>
						</div>
					</div>

				</div>

				<div class='accordion'>
							
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							Is CBD oil legal?
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								Hemp and hemp-derived CBD was made federally legal on December 20, 2018! Hemp has been forever removed from the controlled substance act and is now defined as an agricultural commodity, just like corn.<br /><br />

								Hemp, hemp, hooray!
							</p>
						</div>
					</div>

				</div>

				<div class='accordion'>
							
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							Do you offer a military, veteran, or first-responder discounts?"
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								First of all, thank you for your service! We do offer generous military, veteran, and first responder discounts.<br /><br />

								In order to receive this discount, please email us at <a href='mailto:sustainability@cypresshemp.com' class='hover-underline-white orange medium'>sustainability@cypresshemp.com</a> with documentation to demonstrate your current or previous service.
							</p>
						</div>
					</div>

				</div>

				<div class='accordion'>
							
					<div class='question'>

						<?= file_get_contents('assets/svg/ux/angle-down.svg'); ?>

						<p class='bold'>
							How is Cypress Hemp different from other CBD companies?
						</p>

					</div>

					<div class='answer'>
						<div class='answer-wrapper'>
							<p>
								Our CBD+OMEGAS Drops are also a unique combination of CBD-rich hemp extract and omega-rich hemp seed oil. By combining hemp seed oil with hemp extract, this makes for a complete hemp supplement that offers CBD and a plant-based source of omegas 3-6-9 in the ideal ratio for human health.<br /><br />

								Every purchase plants a tree! For each hemp product that we sell, we donate to reforestation charities that plant trees in areas of great importance, such as California and the Amazon after the recent wildfires. We believe in sustainability, humans and the environment living in harmony, so we use sustainable business practices such as biodegradable boxes, compostable cushioning, and investing in carbon credits to offset the emissions from shipping your package!<br /><br />

								Additionally, our founding team consists of true hemp experts, including a biological and agricultural engineer that has worked for the Hemp Research Foundation and the Hemp Industries Association.
							</p>
						</div>
					</div>

				</div>

			</div>

		</div>

	</div>
</section>

<?php include('components/footer.php'); ?>