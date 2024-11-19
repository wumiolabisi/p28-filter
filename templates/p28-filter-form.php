<?php

$get_caracteristics = P28_Filter::get_instance()->p28_get_caracteristics();
?>
<form id="searchForm">
    <?php foreach ($get_caracteristics as $caracteristic) : ?>
        <div class="p28f-form-item">
            <label for="<?php echo $caracteristic->name; ?>"><?php echo $caracteristic->label; ?></label>
            <select id="<?php echo $caracteristic->name; ?>" name="<?php echo $caracteristic->name; ?>" id="<?php echo $caracteristic->name; ?>">
                <option disabled selected>Sélectionnez</option>
                <?php
                foreach (get_terms($caracteristic->name) as $term) :  ?>
                    <option id="<?php echo $term->slug; ?>" value=" <?php echo $term->slug; ?>"><?php echo $term->name; ?></option>
                <?php endforeach; ?>
            </select>
        </div>
    <?php endforeach; ?>

    <input type="submit" value="Filtrer" />
</form>