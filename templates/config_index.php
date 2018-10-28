<section id="main">

    <?php if ($user['is_admin']): ?>
        <div class="page-header">
            <h2><?= t('Application Settings') ?></h2>
        </div>
        <section>
        <form method="post" action="?controller=config&amp;action=save" autocomplete="off">

            <?= Helper\form_label(t('Language'), 'language') ?>
            <?= Helper\form_select('language', $languages, $values, $errors) ?><br/>

            <?= Helper\form_label(t('Webhooks token'), 'webhooks_token') ?>
            <?= Helper\form_text('webhooks_token', $values, $errors, array('readonly')) ?><br/>

            <div class="form-actions">
                <input type="submit" value="<?= t('Save') ?>" class="btn btn-blue"/>
            </div>
        </form>
        </section>
        <div class="page-header">
            <h2><?= t('More information') ?></h2>
        </div>
        <section class="settings">
            <ul>
                <li><?= t('Database size:') ?> <strong><?= Helper\format_bytes($db_size) ?></strong></li>
                <li>
                    <a href="?controller=config&amp;action=downloadDb"><?= t('Download the database') ?></a>
                    <?= t('(Gzip compressed Sqlite file)') ?>
                </li>
                <li>
                    <a href="?controller=config&amp;action=optimizeDb"><?= t('Optimize the database') ?></a>
                     <?= t('(VACUUM command)') ?>
                </li>
                <li>
                    <?= t('Official website:') ?>
                    <a href="http://kanboard.net/" target="_blank">http://kanboard.net/</a>
                </li>
            </ul>
        </section>
    <?php endif ?>

    <div class="page-header">
        <h2><?= t('User Settings') ?></h2>
    </div>
    <section class="settings">
        <ul>
            <li>
                <strong><?= t('My default project:') ?> </strong>
                <?= isset($user['default_project_id']) ? $projects[$user['default_project_id']] : t('None') ?>,
                <a href="?controller=user&amp;action=edit&amp;user_id=<?= $user['id'] ?>"><?= t('edit') ?></a>
            </li>
        </ul>
    </section>
</section>