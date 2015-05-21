<?php
$listID = '1427439857';

// require the autoloader
require_once 'application/Ctct/autoload.php';
use Ctct\ConstantContact;
use Ctct\Components\Contacts\Contact;
use Ctct\Components\Contacts\ContactList;
use Ctct\Components\Contacts\EmailAddress;
use Ctct\Exceptions\CtctException;
// Enter your Constant Contact APIKEY and ACCESS_TOKEN
define("APIKEY", "73pk5jdyzex68rfwg322psab");
define("ACCESS_TOKEN", "7376509f-91ff-4769-953b-6ee876733ecc");
$cc = new ConstantContact(APIKEY);
// attempt to fetch lists in the account, catching any exceptions and printing the errors to screen
try {
    $lists = $cc->getLists(ACCESS_TOKEN);
} catch (CtctException $ex) {
    foreach ($ex->getErrors() as $error) {
        echo '<!-- ';
        print_r($error);
        echo ' -->';
    }
}
// check if the form was submitted
if (isset($_POST['lumberjuice_email']) && strlen($_POST['lumberjuice_email']) > 1) {

    $action = "Getting Contact By Email Address";
    try {
        // check to see if a contact with the email addess already exists in the account
        $response = $cc->getContactByEmail(ACCESS_TOKEN, $_POST['lumberjuice_email']);
        // create a new contact if one does not exist
        if (empty($response->results)) {
            $action = "Creating Contact";
            $contact = new Contact();
            $contact->addEmail($_POST['lumberjuice_email']);
            $contact->addList($listID);
            /*
             * The third parameter of addContact defaults to false, but if this were set to true it would tell Constant
             * Contact that this action is being performed by the contact themselves, and gives the ability to
             * opt contacts back in and trigger Welcome/Change-of-interest emails.
             *
             * See: http://developer.constantcontact.com/docs/contacts-api/contacts-index.html#opt_in
             */
            $returnContact = $cc->addContact(ACCESS_TOKEN, $contact, true);
            // update the existing contact if address already existed
        } else {
            $action = "Updating Contact";
            $contact = $response->results[0];
            $contact->addList($listID);
            /*
             * The third parameter of updateContact defaults to false, but if this were set to true it would tell
             * Constant Contact that this action is being performed by the contact themselves, and gives the ability to
             * opt contacts back in and trigger Welcome/Change-of-interest emails.
             *
             * See: http://developer.constantcontact.com/docs/contacts-api/contacts-index.html#opt_in
             */
            $returnContact = $cc->updateContact(ACCESS_TOKEN, $contact, true);
        }
        // catch any exceptions thrown during the process and print the errors to screen
    } catch (CtctException $ex) {
        echo '<span class="label label-important">Error ' . $action . '</span>';
        echo '<div class="container alert-error"><pre class="failure-pre">';
        print_r($ex->getErrors());
        echo '</pre></div>';
        die();
    }
}
?>
<!doctype html>
<html class="no-js" lang="EN">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Lumberjuice: is coming soon&hellip;</title>
        <meta name="description" content="We care a lot about great ways to equip yourself through your own expression of freedom. There is a sense of adventure in all of us, from the urban day tripper to alpine trekkers and everyone in-between.">
        <link rel="stylesheet" href="assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="assets/css/main.min.css">
        <link rel="stylesheet" href="assets/css/fontello/fontello.min.css">
        <link rel="stylesheet" href="assets/css/fontello/animation.min.css">
        <link href='http://fonts.googleapis.com/css?family=Merriweather:400,400italic,700|Montserrat' rel='stylesheet' type='text/css'>
        
        <!--[if IE 7]><link rel="stylesheet" href="assets/css/fontello/fontello-ie7.min.css"><![endif]-->
        <!--[if lt IE 9]>
        <script src="/concrete/js/ie/html5-shiv.js"></script>
        <script src="/concrete/js/ie/respond.js"></script>
        <![endif]-->
        <script>
            if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                var msViewportStyle = document.createElement('style')
                msViewportStyle.appendChild(
                        document.createTextNode(
                                '@-ms-viewport{width:auto!important}'
                                )
                        )
                document.querySelector('head').appendChild(msViewportStyle)
            }
        </script>
    </head>
    <body>
        <div id="wrapper">
        <div class="container">
        <section id="main">
            <header>
                <img src="assets/img/lumberjuice_logo.png" alt="Lumberjuice" width="315" height="181"> is&nbsp;coming&nbsp;soon&hellip;
            </header>
            <p>We care a lot about great ways to equip yourself through your own expression of freedom. There is a sense of adventure in all of us, from the urban day tripper to alpine trekkers and everyone in-between. Hikers, travellers, festival-goers, bikers, skateboarders, ramblers, cyclists, parents, kids, surfers, road trippers, free runners and campers. It’s all about having fun in the great outdoors and at Lumberjuice we strive to bring you all the best gear to help you on your way. From the style conscious to the practical, there will be a rucksack, rolltop, backpack, messenger bag, daypack or duffle to set you apart from the rest.</p>
            <footer>
                <p>For more information enter your email address below</p>
                <form action="index.php" id="signupform">
                    <div class="input-group">
      <input type="email" id="email" class="form-control" required placeholder="Enter your email address">
      <span class="input-group-btn">
        <button class="btn btn-default" type="submit">Submit</button>
      </span>
    </div>
                </form>
                <div>
                <h2><span></span>Our Brands<span></span></h2>
                <div></div>
                <ul>
                    <li>SANDQVIST</li>
                    <li>BRIXTON</li>
                    <li>HERSCHEL SUPPLY CO</li>
                    <li>TOPO DESIGNS</li>
                    <li>IRON & RESIN</li>
                    <li>BELLROY</li>
                    <li>DEUS EX MACHINA</li>
                    <li>POLER STUFF</li>
                </ul>
                </div>
            </footer>
        </section>
        </div>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="/assets/js/vendor/jquery.min.js"><\/script>')</script>
        <script src="/assets/js/main.min.js"></script>
        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <!--        <script>
                    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
                    function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
                    e=o.createElement(i);r=o.getElementsByTagName(i)[0];
                    e.src='https://www.google-analytics.com/analytics.js';
                    r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
                    ga('create','UA-XXXXX-X','auto');ga('send','pageview');
                </script>-->
        <script src="//localhost:35729/livereload.js"></script>
    </body>
</html>