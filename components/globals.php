<?php

	// page title
	if (empty($page_title)) {
	    $page = '';
	} else {
	    $page = $page_title . ' |';
	}

	// seo vars
	$site_url = '';
	$site_title = 'The Shoe Museum, Inc.';
	$site_desc = 'The Shoe Museum - Where Passion fuels Creation, Stories add Meaning, and Wearing becomes Expression.';

	// pages
	$home = './';
	$exhibits = 'exhibits.php';
	$exhibit = 'exhibit.php';
	$store = 'store.php';
	$product = 'product.php';
	$blogs = 'blog.php';
	$blog = 'blog-inner.php';
	$about = 'about.php';
	$contact = 'contact.php';

	$login = 'login.php';
	$register = 'register.php';
	$lost_password = 'lost-password.php';
	$dashboard = 'dashboard.php';

	$privacy = 'privacy-policy.php';
	$terms = 'terms-of-service.php';

	// social
	$instagram = 'http://instagram.com/';
	$facebook = 'https://www.facebook.com/';
	$twitter = 'https://x.com/';
	$youtube = 'https://www.youtube.com/';
	$linkedin = 'https://www.linkedin.com/company/';
	$tiktok = 'https://www.tiktok.com/';

	// email, phone and stuff
	$email = 'info@theshoemuseum.com';
	$phone = '';

	// production mode (set to true for builds)
	$is_production = false;
	
?>