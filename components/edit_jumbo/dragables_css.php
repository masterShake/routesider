<?php

/*-----------------------------------------------

	dragables css

-----------------------------------------------*/
?>
/* rule 0 - bg image container */
#cropCanvas>div{
    transform: rotate3d(0,0,1,<?= $jumbo["bg"]["layout"]["mobile"]["a"]; ?>deg) 
               scale(<?= $jumbo["bg"]["layout"]["mobile"]["s"]; ?>,<?= $jumbo["bg"]["layout"]["mobile"]["s"]; ?>);
    left: <?= $jumbo["bg"]["layout"]["mobile"]["x"]; ?>%;
    top: <?= $jumbo["bg"]["layout"]["mobile"]["y"]; ?>%;
}

<?php $i=1; foreach($jumbo["tbs"] as $textbox){  ?>

#dragCanvas>div:nth-child(<?= $i; ?>){
    transform: rotate3d(0,0,1,<?= $textbox["layout"]["mobile"]["a"]; ?>deg) 
               scale(<?= $textbox["layout"]["mobile"]["s"]; ?>,<?= $textbox["layout"]["mobile"]["s"]; ?>);
    left: <?= $textbox["layout"]["mobile"]["x"]; ?>%;
    top: <?= $textbox["layout"]["mobile"]["y"]; ?>%;
    display: <?= ($textbox["layout"]["mobile"]["v"]) ? "block" : "none"; ?>;
    z-index: <?= $textbox["z"]; ?>;
}

<?php $i++; } ?>

/* Small devices (tablets, 768px and up) */
@media (min-width: 768px) {

    #cropCanvas>div{
    transform: rotate3d(0,0,1,<?= $jumbo["bg"]["layout"]["tablet"]["a"]; ?>deg) 
               scale(<?= $jumbo["bg"]["layout"]["tablet"]["s"]; ?>,<?= $jumbo["bg"]["layout"]["tablet"]["s"]; ?>);
    left: <?= $jumbo["bg"]["layout"]["tablet"]["x"]; ?>%;
    top: <?= $jumbo["bg"]["layout"]["tablet"]["y"]; ?>%;
    }

    <?php $i=1; foreach($jumbo["tbs"] as $textbox){  ?>

    #dragCanvas>div:nth-child(<?= $i; ?>){
        transform: rotate3d(0,0,1,<?= $textbox["layout"]["tablet"]["a"]; ?>deg) 
                   scale(<?= $textbox["layout"]["tablet"]["s"]; ?>,<?= $textbox["layout"]["tablet"]["s"]; ?>);
        left: <?= $textbox["layout"]["tablet"]["x"]; ?>%;
        top: <?= $textbox["layout"]["tablet"]["y"]; ?>%;
        display: <?= ($textbox["layout"]["tablet"]["v"]) ? "block" : "none"; ?>;
        z-index: <?= $textbox["z"]; ?>;
    }

    <?php $i++; } ?>
}

/* Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {

    #cropCanvas>div{
    transform: rotate3d(0,0,1,<?= $jumbo["bg"]["layout"]["desktop"]["a"]; ?>deg) 
               scale(<?= $jumbo["bg"]["layout"]["desktop"]["s"]; ?>,<?= $jumbo["bg"]["layout"]["desktop"]["s"]; ?>);
    left: <?= $jumbo["bg"]["layout"]["desktop"]["x"]; ?>%;
    top: <?= $jumbo["bg"]["layout"]["desktop"]["y"]; ?>%;
    }

    <?php $i=1; foreach($jumbo["tbs"] as $textbox){  ?>

    #dragCanvas>div:nth-child(<?= $i; ?>){
        transform: rotate3d(0,0,1,<?= $textbox["layout"]["desktop"]["a"]; ?>deg) 
                   scale(<?= $textbox["layout"]["desktop"]["s"]; ?>,<?= $textbox["layout"]["desktop"]["s"]; ?>);
        left: <?= $textbox["layout"]["desktop"]["x"]; ?>%;
        top: <?= $textbox["layout"]["desktop"]["y"]; ?>%;
        display: <?= ($textbox["layout"]["desktop"]["v"]) ? "block" : "none"; ?>;
        z-index: <?= $textbox["z"]; ?>;
    }

    <?php $i++; } ?>
}

<?php









