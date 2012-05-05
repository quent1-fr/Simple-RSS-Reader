<?php 
session_start();
header('Content-type: text/xml');
header('Content-Disposition: attachment; filename="feeds_opml.xml"');

/* SimplePie Init & Config */
include '../include/simplepie.inc';
$simplePie = new SimplePie();
$simplePie->set_useragent('Mozilla/4.0 '.SIMPLEPIE_USERAGENT.' (with Simple RSS Reader)');
$simplePie->enable_cache(false);

/* SQLite3 */
$sqlite = new PDO('sqlite:../include/data.db');
$query = $sqlite->query('SELECT id,url,title FROM feeds WHERE user_id="' . $_SESSION['id'] . '"');

/* OPML Header & Footer */
$head = <<<OPML
<?xml version="1.0" encoding="UTF-8"?>
<opml version="1.0">
	<head>
		<title>Mes flux</title>
	</head>
	<body>
OPML;
$foot = '</body></opml>';

// TODO :
// Stocker les feeds_urls dans la bdd, car si il y a énormément de flux, le process peut être très long
/* Fetch feeds */
$feeds = '';
while($feed = $query->fetch()){
	//print_r($feed);
	$simplePie->set_feed_url($feed['url']);
	$simplePie->init();
	$simplePie->handle_content_type();
	$feeds .= '		<outline text="'.$feed['title'].'" title="'.$feed['title'].'" type="rss" xmlUrl="'.$simplePie->subscribe_url().'" htmlUrl="'.$feed['url'].'"/>';
	$feeds .= '
';
}

echo $head;
echo $feeds;
echo $foot;
?>