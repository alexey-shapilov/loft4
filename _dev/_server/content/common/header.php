<?php
if (!defined('INIT')) exit('No direct script access allowed');
?>
<!DOCTYPE html><!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <![endif]-->
<html ng-app="contactsApp">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Contacts</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/ico" href="/favicon.ico">
    <link rel="SHORTCUT ICON" type="image/x-icon" href="/favicon.ico">

    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    <!-- build:css(_dev/_server/content/common) css/vendor.css-->
    <!-- bower:css-->
    <!-- endbower-->
    <!-- endbuild-->

    <!-- build:css(_dev/_server/content/common) css/style.css-->
    <link rel="stylesheet" href="../../../_sass/style.css" type="text/css" media="screen">
    <!-- endbuild-->

    <!-- build:js(_dev/_server/content/common) js/vendor.js-->
    <!-- bower:js-->
    <!-- endbower-->
    <!-- endbuild-->

    <script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>

    <script src="https://cdn.firebase.com/js/client/2.1.0/firebase.js"></script>
    <script src="https://cdn.firebase.com/libs/angularfire/0.9.1/angularfire.min.js"></script>
    <!--build:js(_dev/_server/content/common) js/script.js-->
    <script src="../../../_js/app.js"></script>
    <script src="../../../_js/controllers.js"></script>
    <script src="../../../_js/services.js"></script>
    <!-- endbuild-->
</head>
<body>