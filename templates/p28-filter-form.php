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
                    <select class="p28f-select" name="<?php echo $caracteristic->name; ?>" id="<?php echo $caracteristic->name; ?>">
                        <option disabled selected>Sélectionnez</option>
                        <?php
                        foreach (get_terms($caracteristic->name) as $term) :  ?>
                            <option id="<?php echo $term->slug; ?>" value=" <?php echo $term->slug; ?>"><?php echo $term->name; ?></option>
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
                            <option id="<?php echo $key; ?>" value=" <?php echo $key; ?>"><?php echo $choice; ?></option>
                        <?php endforeach; ?>
                    </select>

                </div>
            <?php endforeach; ?>
        <?php endif; ?>

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

        <input type="submit" value="Filtrer" />
    </div>
</form>