<?php
// temp disable cors
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

$type = $_GET['type'] ?? '';
switch ($type) {
    case 'price':
        $url = 'https://api.coingecko.com/api/v3/simple/price?ids=zam-io&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true';
        $file = 'coingeco_price';
        break;
    case 'market':
        $url = 'https://api.coingecko.com/api/v3/coins/zam-io/market_chart?vs_currency=usd&days=max&interval=daily';
        $file = 'coingeco_market';
        break;
    default:
        exit('Type is not defined');
}
$lifetime = 60; // seconds

if (file_exists($file)) {
    if (filemtime($file) + $lifetime > time()) {
        exit(file_get_contents($file));
    }
}

$newContent = file_get_contents($url);
if($newContent === false) {
    exit(file_get_contents($file));
}

ob_start();
echo $newContent;
file_put_contents($file, ob_get_contents());
ob_end_flush();
