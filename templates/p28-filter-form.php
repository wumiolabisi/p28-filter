<?php

$get_taxo = P28_Filter::get_instance()->p28_get_caracteristics();
$get_acf = P28_Filter::get_instance()->p28_get_ACF();

?>
<form id="p28f-searchForm">
    <div class="p28f-search-form">
        <?php
        if (isset($get_taxo)) : ?>

            <?php foreach ($get_taxo as $caracteristic) : ?>
                <div class="p28f-form-item">

                    <label for="<?php echo $caracteristic->name; ?>"><?php echo $caracteristic->label; ?></label>
                    <select class="p28f-select" name="<?php echo $caracteristic->name; ?>" id="<?php echo strval(array_search($caracteristic->label, wp_list_pluck(get_taxonomies([], 'objects'), 'label'))); ?>">
                        <option disabled selected>Sélectionnez</option>
                        <?php
                        foreach (get_terms($caracteristic->name) as $term) :  ?>
                            <option id="<?php echo $term->slug; ?>" value="<?php echo $term->term_id; ?>"><?php echo $term->name; ?></option>
                        <?php endforeach; ?>
                    </select>

                </div>
            <?php endforeach; ?>
            <?php endif;

        if (isset($get_acf)) :
            foreach ($get_acf as $caracteristic) : ?>
                <div class="p28f-form-item">
                    <label for="<?php echo $caracteristic['name']; ?>"><?php echo $caracteristic['label']; ?></label>
                    <select class="p28f-select" name="<?php echo $caracteristic['name']; ?>" id="<?php echo $caracteristic['name']; ?>">
                        <option disabled selected>Sélectionnez</option>
                        <?php foreach ($caracteristic['choices'] as $key => $choice) :  ?>
                            <option id="<?php echo $key; ?>" value="<?php echo $key; ?>"><?php echo $choice; ?></option>
                        <?php endforeach; ?>
                    </select>

                </div>
            <?php endforeach; ?>
        <?php endif; ?>

        <?php if (is_post_type_archive('oeuvre')) : ?>
            <div class="p28f-form-item">
                <label for="duree">Durée</label>
                <select class="p28f-select" name="duree" id="duree">
                    <option disabled selected>Sélectionnez</option>
                    <option id="a" value="1">Moins d'une heure</option>
                    <option id="b" value="2">Environ 1H30</option>
                    <option id="c" value="3">Entre 1H30 et 2H</option>
                    <option id="d" value="4">Plus de 2H</option>
                </select>

            </div>
        <?php endif; ?>
        <div class="p28f-btn" id="p28f-filter-mobile-only">Filtrer</div>
        <div class="p28f-form-item">
            <span id="p28f-reset-filters" onclick="window.location.reload();">Réinitialiser tous les filtres</span>
        </div>
    </div>
</form>
<div class="p28f-btn" id="p28f-trigger-mobile-only">Filtrer</div>