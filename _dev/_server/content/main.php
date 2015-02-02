<?php
ob_start();
?>
    <!--[if lt IE 7]>
    <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    <![endif]-->
    <div class="container-wrapper clearfix">
        <div class="main-container">
            <!-- ===================================== HEADER =====================================-->
            <div class="header">
                <h1 class="title">Контакты</h1>
            </div>
        </div>
        <div class="wrapper">
            <div ng-controller="MainController" class="content">
                <!-- ======================================= NAV =======================================-->
                <nav class="navigate clearfix">
                    <div class="navigate__left"><a href="#/" ng-if="!nav.btnAdd" class="navigate__back"><span aria-hidden="true" class="icon glyphicon glyphicon-menu-left"></span></a><a href="#/contact/add" ng-if="nav.btnAdd" class="navigate__btn">
                            <div class="btn btn-default">Добавить</div></a></div>
                    <div ng-if="nav.btnAdd" class="navigate__right">
                        <div ng-click="nav.clickList()" class="navigate__view"><span aria-hidden="true" class="icon glyphicon glyphicon-list"></span></div>
                        <div ng-click="nav.clickGrid()" class="navigate__view"><span aria-hidden="true" class="icon glyphicon glyphicon-list"></span></div>
                    </div>
                </nav>
                <!-- ===================================== CONTAINER =====================================-->
                <div ng-view class="wrapper pt-page">
                    <!--include ../_views/contact-edit-->
                    <!--include ../_views/contacts-->
                </div>
            </div>
        </div>
    </div>
<?php
$content = ob_get_clean();