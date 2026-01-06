<section id='cart-menu' style='display: none' data-lenis-prevent>
    <div class='wrapper'>

        <div class='top'>

            <h2 class='h3'>
                Your Cart
            </h2>

            <button class='close-cart'>
                <i data-lucide='x'></i>
            </button>

        </div>

        <div class='middle'>

            <div class='cart-product-block'>

                <a href='<?= $product; ?>' class='image'>
                    <img src='assets/img/thumbnail.jpg' alt='Orbix'>
                </a>

                <div class='infos'>

                    <a href='<?= $product; ?>' class='text-32 product-name'>
                        Orbix
                    </a>

                    <p class='text-16 medium bold green product-price'>
                        <span class='current'>
                            $1,300.00
                        </span>
                    </p>

                    <div class='quantity'>
                        <div class='form-line'>
                            <div class='line-wrapper'>

                                <input class='input' type='number' value='1' min='1' max='8' />

                                <div class='buttons'>

                                    <button class='increase'>
                                        <i data-lucide='chevron-up'></i>
                                    </button>

                                    <button class='decrease'>
                                        <i data-lucide='chevron-down'></i>
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                <button class='remove-product'>
                    <i data-lucide='trash'></i>
                </button>

            </div>

        </div>

        <div class='subtotal'>

            <p class='h4'>
                Subtotal
            </p>

            <p class='h4'>
                $1,300.00
            </p>

        </div>

        <div class='shipping'>

            <p class='text-14'>
                Shipping and taxes are calculated at checkout.
            </p>

        </div>

        <a href='#' class='button button--green checkout uppercase'>

            <span class='text'>
                Checkout
            </span>

            <span class='icon'>
				<i data-lucide='arrow-right'></i>
			</span>

        </a>

        <div class='cards'>

            <p class='text-14'>
                We accept
            </p>

            <?= file_get_contents('assets/svg/ux/cards.svg'); ?>

        </div>

    </div>
</section>