<?php
// Router for PHP built-in development server
// This simulates .htaccess rewrite rules for clean URLs

$requestUri = $_SERVER['REQUEST_URI'];
$requestPath = parse_url($requestUri, PHP_URL_PATH);

// Remove leading slash
$requestPath = ltrim($requestPath, '/');

// If it's an empty path, serve index.php
if (empty($requestPath) || $requestPath === '/') {
	if (file_exists(__DIR__ . '/index.php')) {
		require __DIR__ . '/index.php';
		return true;
	}
}

// Check if the requested file exists (for assets like CSS, JS, images)
if (file_exists(__DIR__ . '/' . $requestPath)) {
	return false; // Let PHP built-in server serve the file as-is
}

// Try adding .php extension (simulates .htaccess rewrite)
$phpPath = __DIR__ . '/' . $requestPath . '.php';
if (file_exists($phpPath)) {
	require $phpPath;
	return true; // We handled it
}

// If nothing matches, return 404
http_response_code(404);
echo "404 - File not found";
return true;

