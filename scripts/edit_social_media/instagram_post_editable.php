<!-- temp image to iframe -->
<div class="thumbnail social-media-post" id='<?= $post->getProperty("net_id"); ?>' data-loading="0">
    <div class="glyphicon glyphicon-remove-circle" aria-label="remove social media post" data-network='<?= $post->getProperty("network"); ?>' data-id='<?= $post->getProperty("net_id"); ?>'></div>
    <?php // if the post has at least 1 media object
          if( count($media) ){

            // if the post has a video
            if( $media[0]->getProperty("type") == "video" ){ ?>

                                    
    <div class="top-img" data-url='<?= $media[0]->getProperty("embed_code"); ?>'>
        <img src='<?= $media[0]->getProperty("url"); ?>' alt="social media post">
        <h1><span class="glyphicon glyphicon-play-circle"></span></h1>
    </div>
    
            <?php // if the post has more than 1 image
            }else if( count($media) > 1 ){  ?>

    <!-- gallery -->

            <?php // if there is only 1 image
            }else{ ?>

    <!-- single image -->
    <img src='<?= $media[0]->getProperty("url"); ?>' alt="social media post">
    
    <?php } } ?>

    <div class="caption">
        <table>
            <tr>
                <td>
                    <img src='img/business/<?= $profile->data("avatar"); ?>' class='avatar <?= $profile->data("avatar_shape"); ?>' alt='business avatar/logo'>
                </td>
                <td>
                    <p>
                        <a href='https://instagram.com/<?= $post->getProperty("username"); ?>'>
                            <span>&#64;<?= $post->getProperty("username"); ?></span>
                        </a>
                        <?= ($post->hasProperty("text")) ? $post->getProperty("text") : ""; ?>
                    </p>
                </td>
            </tr>
        </table>
    </div>
    <div class="social-post-link"><a href='<?= $post->getProperty("permalink"); ?>'><span class='icon-<?= $post->getProperty("network"); ?>'></span></a></div>
    <div class="likes">
        <div class="glyphicon glyphicon-heart"></div><div style="font-size:10px">&nbsp;&nbsp;<?= $post->getProperty("likes"); ?></div>
    </div>
</div>