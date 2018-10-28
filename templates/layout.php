<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="assets/css/app.css" media="screen">
        <!--
        <link rel="icon" type="image/png" href="assets/img/favicon.png">
        <link rel="shortcut icon" href="favicon.ico">
        <link rel="apple-touch-icon" href="assets/img/touch-icon-iphone.png">
        <link rel="apple-touch-icon" sizes="72x72" href="assets/img/touch-icon-ipad.png">
        <link rel="apple-touch-icon" sizes="114x114" href="assets/img/touch-icon-iphone-retina.png">
        <link rel="apple-touch-icon" sizes="144x144" href="assets/img/touch-icon-ipad-retina.png">
        -->
        <title><?= isset($title) ? Helper\escape($title) : 'Kanboard' ?></title>
    </head>
    <body>
    <?php if (isset($no_layout)): ?>
        <?= $content_for_layout ?>
    <?php else: ?>
        <header>
            <nav>
                <a class="logo" href="?">kan<span>board</span></a>
                <ul>
                    <li <?= isset($menu) && $menu === 'boards' ? 'class="active"' : '' ?>>
                        <a href="?controller=board"><?= t('boards') ?></a>
                    </li>
                    <li <?= isset($menu) && $menu === 'projects' ? 'class="active"' : '' ?>>
                        <a href="?controller=project"><?= t('projects') ?></a>
                    </li>
                    <li <?= isset($menu) && $menu === 'users' ? 'class="active"' : '' ?>>
                        <a href="?controller=user"><?= t('users') ?></a>
                    </li>
                    <li <?= isset($menu) && $menu === 'config' ? 'class="active"' : '' ?>>
                        <a href="?controller=config"><?= t('settings') ?></a>
                    </li>
                    <li>
                        <a href="?controller=user&amp;action=logout"><?= t('logout') ?></a>
                        (<?= Helper\escape($_SESSION['user']['username']) ?>)
                    </li>
                </ul>
            </nav>
        </header>
        <section class="page">
            <?= Helper\flash('<div class="alert alert-success">%s</div>') ?>
            <?= Helper\flash_error('<div class="alert alert-error">%s</div>') ?>
            <?= $content_for_layout ?>
         </section>
     <?php endif ?>
    </body>
</html>