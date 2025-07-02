<section id='cart-menu' style='display: none' data-lenis-prevent>

    <?= file_get_contents('assets/svg/other/rainbow-footer.svg'); ?>

    <div class='wrapper relative z2'>

        <div class='top'>

            <h2 class='font-title text-medium-big medium'>
                Cart
            </h2>

            <button class='close-cart'>
                <?= file_get_contents('assets/svg/ux/close.svg'); ?>
            </button>

        </div>

        <div class='middle'>

            <div class='cart-product-block'>
                <div class="inner-wrapper">

                    <a href='<?= $product; ?>' class='image'>
                        <img src='assets/img/products/product-01.png' alt='100% USDA Organic Broad Spectrum' class='cover'>
                    </a>

                    <div class='infos'>

                        <a href='<?= $product; ?>' class='product-name bold'>
                            100% USDA Organic Broad Spectrum
                        </a>

                        <p class='text-smaller product-detail'>
                            CBD + MCT + BCP
                        </p>

                        <p class='bold text-medium-small product-price'>
                            <span class='current'>
                                $45.00
                            </span>
                        </p>

                        <div class='quantity'>
                            <div class='form-line'>
                                <div class='line-wrapper'>

                                    <input class='input' type='number' value='1' min='1' max='8' />

                                    <button class='increase bold'>
                                        +
                                    </button>

                                    <button class='decrease bold'>
                                        -
                                    </button>

                                </div>
                            </div>
                        </div>

                    </div>

                    <button class='remove-product'>
                        <?= file_get_contents('assets/svg/ux/trash.svg'); ?>
                    </button>

                </div>
            </div>

            <div class='cart-product-block'>
                <div class="inner-wrapper">

                    <a href='<?= $product; ?>' class='image'>
                        <img src='assets/img/products/product-03.png' alt='Sleep Adaptogen 1800mg' class='cover'>
                    </a>

                    <div class='infos'>

                        <a href='<?= $product; ?>' class='product-name bold'>
                            Sleep Adaptogen 1800mg
                        </a>

                        <p class='text-smaller product-detail'>
                            CBD + CBN Capsules
                        </p>

                        <p class='bold text-medium-small product-price'>

                            <span class='old'>
                                $59.99
                            </span>

                            <span class='current'>
                                $52.95
                            </span>

                        </p>

                        <div class='quantity'>

                            <div class='form-line'>
                                <div class='line-wrapper'>

                                    <input class='input' type='number' value='1' min='1' max='8' />

                                    <button class='increase bold'>
                                        +
                                    </button>

                                    <button class='decrease bold'>
                                        -
                                    </button>

                                </div>
                            </div>

                            <div class='subscription'>
                                Monthly Subscription
                            </div>
                            
                        </div>

                    </div>

                    <button class='remove-product'>
                        <?= file_get_contents('assets/svg/ux/trash.svg'); ?>
                    </button>

                </div>
            </div>

            <div class='package-protection'>

                <div class='package-protection-left'>

                    <p class='package-protection-title'>
                        <b>
                            Package Protection
                        </b>
                    </p>

                    <p class='text-small package-protection-desc'>
                        Against loss, theft, or damage in transit and instant resolution. <a href='#popup-package-protection' data-fancybox><?= file_get_contents('assets/svg/ux/info.svg'); ?></a>
                    </p>

                    <?php include('components/popups/package-protection.php'); ?>
                    
                </div>

                <div class='package-protection-right'>

                    <div class='package-protection-checkbox'>
                        <div class='package-protection-checkbox-circle'></div>
                        <span class='on'>On</span>
                        <span class='off'>Off</span>
                    </div>

                    <p class='text-small package-protection-price'>
                        $1.99
                    </p>

                </div>
            </div>

        </div>

        <div class='subtotal font-title text-medium-small medium'>

            <p>
                Subtotal
            </p>

            <p>
                $99.80
            </p>

        </div>

        <div class='shipping'>

            <p class='text-small'>
                Shipping and taxes are calculated at checkout.
            </p>

        </div>

        <a href='#' class='button button--gradient checkout'>
            Proceed to checkout
        </a>

        <div class='cards'>

            <p class='text-small'>
                We accept
            </p>

            <?= file_get_contents('assets/svg/ux/cards.svg'); ?>

        </div>

    </div>
</section>