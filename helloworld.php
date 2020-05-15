<?php
// using Lumen microframework for PHP
$app->get('/', function() {
	return "Hello world!"
});

$router->get('hello/{name}', function ($name) {
	return 'Hello '.$name.'!';
});