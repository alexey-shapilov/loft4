<?php
ob_start();
?>
    <!--[if lt IE 7]>
    <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
        your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a>
        to improve your experience.</p>
    <![endif]-->
    <div ng-controller="MainController" class="container-wrapper clearfix">
        <div class="main-container">
            <!-- ===================================== HEADER =====================================-->
            <div class="header">
                <h1 class="title">{{header.title}}</h1>
            </div>
        </div>
        <div class="wrapper">
            <div class="content">
                <!-- ======================================= NAV =======================================-->
                <nav class="navigate clearfix">
                    <div class="navigate__left">
                        <a href="#/" ng-if="!nav.btnAdd" class="navigate__back">
                            <span aria-hidden="true" class="icon navigate_icon fa fa-angle-left"></span>
                        </a>
                        <div ng-if="nav.btnAdd" class="clearfix">
                            <a href="#/contact/add" class="navigate__btn pull-left">
                                <div class="btn btn-default">Добавить</div>
                            </a>

                            <div class="search form-inline pull-left">
                                <div class="form-group">
                                    <label for="lastname">Поиск по фамилии</label>
                                    <input type="text" placeholder="Фамилия контакта" ng-model="search.lastname" class="form-control"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="navigate__left">
                    </div>
                    <div ng-if="nav.btnAdd" class="navigate__right">
                        <div ng-click="nav.clickList()" class="navigate__view">
                            <span aria-hidden="true" class="icon fa fa-list" ng-class="{icon_active:nav.contactsList}"></span>
                        </div>
                        <div ng-click="nav.clickGrid()" class="navigate__view">
                            <span aria-hidden="true" class="icon fa fa-th-large" ng-class="{icon_active:!nav.contactsList}"></span>
                        </div>
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