<section class='top-menu py-half py-lg-1'>
    <div class='container'>
        <div class='flex'>

            <a href='<?= $home; ?>' class='logo'>
                <img
                    src='assets/img/logo.png'
                    alt='The Shoe Museum, Inc.'
                    width='72'
                    height='93'
                >
            </a>

            <ul class='menu'>
                
                <li>
                    <a href='<?= $exhibits; ?>' class='hover-underline'>
                        Exhibits
                    </a>
                </li>

                <li>
                    <a href='<?= $products; ?>' class='hover-underline'>
                        Store
                    </a>
                </li>

                <li>
                    <a href='<?= $blogs; ?>' class='hover-underline'>
                        Blog
                    </a>
                </li>

                <li>
                    <a href='<?= $about; ?>' class='hover-underline'>
                        About
                    </a>
                </li>

                <li>
                    <a href='<?= $contact; ?>' class='hover-underline'>
                        Contact
                    </a>
                </li>

            </ul>

            <div class='right'>
                <div class='side-icons'>

                    <a href='<?= $search; ?>' class='search' aria-label='Search'>
                        <i data-lucide='search'></i>
                    </a>

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