<section class='top-menu py-1'>
    <div class='container container--big'>
        <div class='flex'>

            <a href='<?= $home; ?>' class='logo'>
                <img
                    src='assets/img/logo.png'
                    alt='The Shoe Museum, Inc.'
                    width='72'
                    height='93'
                    loading='lazy'
                >
            </a>

            <ul class='menu'>

                <li>
                    <a href='<?= $home; ?>' class='active'>
                        Home
                    </a>
                </li>
                
                <li>
                    <a href='<?= $exhibits; ?>'>
                        Exhibits
                    </a>
                </li>

                <li>
                    <a href='<?= $products; ?>'>
                        Store
                    </a>
                </li>

                <li>
                    <a href='<?= $blogs; ?>'>
                        Blog
                    </a>
                </li>

                <li>
                    <a href='<?= $about; ?>'>
                        About
                    </a>
                </li>

                <li>
                    <a href='<?= $contact; ?>'>
                        Contact
                    </a>
                </li>

            </ul>

            <div class='right'>
                <div class='side-icons'>

                    <button class='open-cart' aria-label='View Cart'>
                        <i data-lucide='shopping-cart'></i>
                        <div class='has-items'></div>
                    </button>

                    <a href='<?= $login; ?>' class='login' aria-label='Login'>
                        <i data-lucide='user'></i>
                    </a>

                    <button class='open-fs' aria-label='Open Menu'>
                        <i data-lucide='menu'></i>
                    </button>

                </div>
            </div>

        </div>
    </div>
</section>