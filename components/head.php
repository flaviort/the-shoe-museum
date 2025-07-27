<?php include('components/globals.php') ?>

<!DOCTYPE html>
	<html lang='en-US'>

		<head>

			<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
			<meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
			<meta name='format-detection' content='telephone=no'>
			<link rel='shortcut icon' href='<?php echo($site_url); ?>/assets/img/logo.png' />

			<meta name='author' content='<?php echo($site_title); ?>'>

			<title>
				<?php
					echo (
						isset($post_title) ? 
						htmlspecialchars($post_title) : 
						htmlspecialchars($page)
					) . ' ' . $site_title;
				?>
			</title>

			<!-- google -->
			<meta name='description' content='<?php echo($site_desc); ?>' />
			<link rel='canonical' href='<?php echo($site_url); ?>' />
				
			<!-- facebook -->
			<meta property='og:locale' content='en_US' />
			<meta property='og:type' content='website' />
			<meta property='og:title' content='<?php echo($site_title); ?>' />
			<meta property='og:description' content='<?php echo($site_desc); ?>' />
			<meta property='og:url' content='<?php echo($site_url); ?>/' />
			<meta property='og:site_name' content='<?php echo($site_title); ?>' />
			<meta property='og:image' content='<?php echo($site_url); ?>/assets/img/og-image.jpg' />
			<meta property='og:image:secure_url' content='<?php echo($site_url); ?>/assets/img/og-image.jpg' />
			<meta property='og:image:width' content='1200' />
			<meta property='og:image:height' content='630' />

			<!-- css -->
			<link rel='stylesheet' type='text/css' href='assets/css/vendor/normalize.min.css' />
			<link rel='stylesheet' href='https://unpkg.com/lenis@1.3.4/dist/lenis.css' />
			<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css' />
			<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/@fancyapps/ui@6.0/dist/fancybox/fancybox.css' />
			<link rel='stylesheet' type='text/css' href='assets/css/vendor/bootstrap-grid.min.css' />
			<link rel='stylesheet' type='text/css' href='assets/css/main.min.css' />
			
		</head>

		<body>

			<!-- enable these only in dev mode -->
			<?php include('components/dev-mode.php');?>

			<header>
				<?php include('components/fs-menu.php');?>
			</header>

			<main id='main-content' class='<?php echo($current_page); ?>'>
				<div class='main-wrap'>

					<?php include('components/top-menu.php');?>