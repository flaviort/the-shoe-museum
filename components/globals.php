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
	
	// production mode (set to true for builds)
	$is_production = true;

	// pages
	$home = './';
	$exhibits = 'exhibits';
	$exhibit = 'exhibit';
	$store = 'store';
	$product = 'product';
	$blogs = 'blog';
	$blog = 'blog-inner';
	$about = 'about';
	$contact = 'contact';

	$login = 'login';
	$register = 'register';
	$lost_password = 'lost-password';
	$dashboard = 'dashboard';

	$privacy = 'privacy-policy';
	$terms = 'terms-of-service';

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
	
?>